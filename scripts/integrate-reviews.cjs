// Generate site pages from the locally reviewed standalone analyses.
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL, fileURLToPath} = require('node:url');
const vm = require('node:vm');
let chromium;
try { ({chromium} = require('playwright')); }
catch { ({chromium} = require('../../tools/perplexity/node_modules/playwright')); }
const site = path.resolve(__dirname, '..');
const root = path.dirname(site);

const interpolatedExamples = require('./interpolated-examples.cjs');

(async () => {
  const browser = await chromium.launch({headless:true});
  const pages = {};
  try {
    const page = await browser.newPage();
    for (const cycle of [1,2,3]) {
      const source = path.join(root, `outputs/cycle${cycle}-complete-analysis/index.html`);
      await page.goto(pathToFileURL(source).href);
      const assets = await page.locator('main img[src]').evaluateAll(ns => ns.map(n => n.src));
      const replacements = {};
      for (const url of assets) {
        const file = fileURLToPath(url);
        const rel = path.relative(site, file);
        if (!rel.startsWith('..') && !path.isAbsolute(rel)) {
          replacements[url] = rel.split(path.sep).join('/');
        } else {
          const target = `assets/reviews/cycle${cycle}/${path.basename(file)}`;
          fs.mkdirSync(path.dirname(path.join(site,target)), {recursive:true});
          fs.copyFileSync(file,path.join(site,target));
          replacements[url] = target;
        }
      }
      const context={window:{}};
      vm.runInNewContext(fs.readFileSync(path.join(site,`cycle${cycle}-page.js`),'utf8'),context);
      const legacyHTML=context.window[`CYCLE${cycle}_PAGE`].html;
      pages[`c${cycle}`] = await page.evaluate(({cycle,replacements,siteURL,legacyHTML,examples}) => {
        const main = document.querySelector('main');
        const route = `#cycle/c${cycle}/`;
        const aliases = {};
        function alias(id,target) {
          if (main.querySelector(`[id="${id}"]`)) return;
          const node = main.querySelector(`[id="${target}"]`);
          if (!node) throw Error(`Missing alias destination ${target}`);
          const span = document.createElement('span');
          span.id=id; span.className='anchor-alias'; node.prepend(span);
          aliases[id]=target;
        }
        for (const part of [...new Set([...main.querySelectorAll('article[data-part]')].map(n=>n.dataset.part))]) {
          const articles = [...main.querySelectorAll(`article[data-part="${part}"]`)];
          alias(`part-${part.toLowerCase()}`,articles[0].id);
          const targets = cycle===1 && part==='A' ? ['A-data','A-mission','A1','A2','A3','A4','A5'] : articles.map(n=>n.id);
          targets.forEach((id,i)=>alias(`${part.toLowerCase()}-q${i+1}`,id));
          if(cycle===2 && ['B','C'].includes(part)) for(let n=2;n<=6;n++) alias(`${part.toLowerCase()}-q${n}`,part);
        }
        alias('foundation','preparation'); alias('rubric-map',cycle===1?'score-summary':'scores');
        alias('final-check',cycle===1?'score-summary':'scores');
        if(cycle===1) {
          const legacy=document.createElement('div');legacy.innerHTML=legacyHTML;
          const limits=legacy.querySelector('#limits');limits.className='major-section';
          main.querySelector('#source-record').before(limits);
          alias('strategy-map','C1');
          alias('qualitative-analysis','A-qualitative');
        }
        main.querySelector('.intro').classList.add('guide-heading');
        main.querySelector('.intro').innerHTML = main.querySelector('.intro').innerHTML
          .replace(/CTC example/g, 'interpolated example')
          .replace(/example response/g, 'interpolated response');
        for (const article of main.querySelectorAll('article.template-review')) {
          const example = article.querySelector('.example-response');
          if (example) {
            if (!Object.hasOwn(examples, article.id)) throw Error(`Missing rewrite c${cycle}/${article.id}`);
            example.innerHTML = `<h3>Interpolated Example</h3><div class="interpolated-example">${examples[article.id]}</div>`;
          }
          const critique = article.querySelector('.critique');
          if (critique) {
            const improvements = critique.querySelector('.improvements')?.outerHTML || '';
            const tables = [...critique.querySelectorAll('.evidence-table-wrap')].map(n => n.outerHTML).join('');
            critique.innerHTML = `<h3>Reading the Interpolated Example</h3>${tables}<h4>Questions for review</h4>${improvements}<section class="score-judgment"><h4>Instructional status</h4><p>This rewritten teaching example preserves the scenario and its evidence for discussion. It is not an official exemplar, candidate submission, or scored response.</p></section>`;
          }
        }
        const statusSection = main.querySelector('#score-summary, #scores');
        for (const level of main.querySelectorAll('.level.estimated')) level.classList.remove('estimated');
        if (statusSection) {
          statusSection.innerHTML = `
            <h2>Interpolated Example Status</h2>
            <p>The examples on this page are newly worded instructional parallels. They are not official exemplars, not candidate submissions, and not scored responses.</p>
            <p>Use them to study the kind of evidence and reasoning each prompt calls for, then replace the details with your own school context, records, meetings, and reflections.</p>
          `;
        }
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);
        for (const node of textNodes) {
          node.nodeValue = node.nodeValue
            .replace(/CTC example/g, 'interpolated example')
            .replace(/CTC examples/g, 'interpolated examples')
            .replace(/ctc example/g, 'interpolated example')
            .replace(/Score profile/g, 'Example status')
            .replace(/Rubric estimates consider all relevant responses in the interpolated example and are instructional judgments, not official scores\. Interpolated text is labeled and excluded from the estimates\./g, 'The interpolated examples are newly worded teaching parallels. They are not official scores, candidate submissions, or templates to copy.')
            .replace(/High School P/g, 'Riverview High')
            .replace(/Cruz[’']s Math Crew/g, 'Math Crew')
            .replace(/The interpolated example was supplied for this local teaching review\. Its response wording is retained\. The group-selection interpolation and qualitative-table reconstruction are labeled\./g, 'The examples are full-length rewrites of material supplied for local teaching review. The scenarios, numerical evidence, and sequence inform the newly drafted prose. The qualitative findings table is a teaching reconstruction.')
            .replace(/The highlight shows this review's estimate\./g, 'No score is assigned to the rewritten example.')
            .replace(/These are interpolated examples of possible supporting evidence/g, 'These are categories of possible supporting evidence from the guide')
            .replace(/Category and interpolated examples/g, 'Category and supporting evidence')
            .replace(/The example is evidence to examine, not a model to copy\./g, 'The interpolated examples are teaching parallels to examine, not models to copy.')
            .replace(/Original response wording and document images from the supplied interpolated example are retained; formatting and placement are adapted\./g, 'Interpolated example wording is newly drafted for instruction; original source wording is not retained in these app examples.');
        }
        for(const image of main.querySelectorAll('img[src]')) image.setAttribute('src',replacements[image.src]);
        for(const button of main.querySelectorAll('[data-image]')) {
          button.removeAttribute('data-image'); button.setAttribute('data-figure-expand','');
          button.dataset.imageTitle=`Cycle ${cycle}: ${button.querySelector('img').alt}`;
        }
        for(const a of main.querySelectorAll('a[href]')) {
          const raw=a.getAttribute('href');
          if(raw.startsWith('#cycle/')||raw.startsWith('#home')||raw.startsWith('sources/')) continue;
          if(raw.startsWith('#')) a.setAttribute('href',route+raw.slice(1));
          else if(a.href.startsWith(siteURL)) a.setAttribute('href',decodeURI(a.href.slice(siteURL.length)));
          else if(a.href.startsWith('file:')) {
            const match=a.href.match(/cycle([123])-complete-analysis\/index.html(?:#(.*))?$/);
            if(!match) throw Error(`Unpublishable local link: ${a.href}`);
            a.setAttribute('href',`#cycle/c${match[1]}`+(match[2]?'/'+match[2]:''));
          }
        }
        const contents=document.createElement('details'); contents.className='contents-index';
        const label=document.createElement('summary'); label.textContent='Questions and reference'; contents.append(label);
        const nav=document.createElement('nav');nav.setAttribute('aria-label',`Cycle ${cycle} questions`);
        for(const source of document.querySelectorAll('#sidebar a[href^="#"]')) {
          const a=source.cloneNode(true);
          if (a.textContent.trim() === 'Score profile') a.textContent = 'Example status';
          a.href=route+source.hash.slice(1);nav.append(a);
        }
        contents.append(nav);main.querySelector('.intro').after(contents);
        const search=[...main.querySelectorAll('article.template-review')].map(n=>({title:n.querySelector('h2').textContent,url:route+n.id,html:n.innerHTML}));
        return {title:main.querySelector('h1').textContent, html:'<div class="revised-cycle">'+main.innerHTML+'</div>',search,anchors:[...main.querySelectorAll('[id]')].map(n=>n.id),aliases};
      }, {
        cycle,
        replacements,
        siteURL:pathToFileURL(site+path.sep).href,
        legacyHTML,
        examples:interpolatedExamples[cycle]
      });
    }
    fs.writeFileSync(path.join(site,'revised-cycle-pages.js'),'window.REVISED_CYCLES = '+JSON.stringify(pages)+';\n');
    console.log(JSON.stringify({cycles:Object.keys(pages),questions:Object.values(pages).map(p=>p.search.length)}));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
