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
      pages[`c${cycle}`] = await page.evaluate(({cycle,replacements,siteURL,legacyHTML}) => {
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
          const a=source.cloneNode(true); a.href=route+source.hash.slice(1);nav.append(a);
        }
        contents.append(nav);main.querySelector('.intro').after(contents);
        const search=[...main.querySelectorAll('article.template-review')].map(n=>({title:n.querySelector('h2').textContent,url:route+n.id,html:n.innerHTML}));
        return {title:main.querySelector('h1').textContent, html:'<div class="revised-cycle">'+main.innerHTML+'</div>',search,anchors:[...main.querySelectorAll('[id]')].map(n=>n.id),aliases};
      }, {cycle,replacements,siteURL:pathToFileURL(site+path.sep).href,legacyHTML});
    }
    fs.writeFileSync(path.join(site,'revised-cycle-pages.js'),'window.REVISED_CYCLES = '+JSON.stringify(pages)+';\n');
    console.log(JSON.stringify({cycles:Object.keys(pages),questions:Object.values(pages).map(p=>p.search.length)}));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
