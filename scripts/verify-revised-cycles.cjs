const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL,fileURLToPath}=require('node:url');
let chromium;
try {({chromium}=require('playwright'));}
catch {({chromium}=require('../../tools/perplexity/node_modules/playwright'));}
const site=path.resolve(__dirname,'..');
const root=path.dirname(site);
const checks=[];
function check(name,value){assert.ok(value,name);checks.push(name);}
(async()=>{
  const browser=await chromium.launch({headless:true});
  const errors=[];
  try {
    const page=await browser.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    for(const c of [1,2,3]){
      await page.goto(pathToFileURL(path.join(root,`outputs/cycle${c}-complete-analysis/index.html`)).href);
      const original=await page.evaluate(()=>({
        prompts:[...document.querySelectorAll('article .question')].map(n=>n.textContent),
        responses:[...document.querySelectorAll('.original')].map(n=>n.textContent),
        rubrics:[...document.querySelectorAll('.rubric .level>p')].map(n=>n.textContent)
      }));
      const url=pathToFileURL(path.join(site,'index.html')).href+`#cycle/c${c}`;
      await page.goto(url);await page.locator('.revised-cycle h1').waitFor();
      check(`${c}: revised route`,(await page.locator('main h1').innerText()).includes('Understanding the Questions'));
      const actual=await page.evaluate(()=>({
        prompts:[...document.querySelectorAll('article .question')].map(n=>n.textContent),
        responses:[...document.querySelectorAll('.original')].map(n=>n.textContent),
        rubrics:[...document.querySelectorAll('.rubric .level>p')].map(n=>n.textContent)
      }));
      assert.deepEqual(actual,original);checks.push(`${c}: all prompts, original responses, and 110 rubric descriptors preserved`);
      check(`${c}: ordered analysis`,await page.locator('article.template-review').evaluateAll(ns=>ns.every(n=>[...n.children].filter(n=>n.tagName==='SECTION').map(n=>n.className).join(',')==='question,meaning,rubric-requirements,example-response,critique')));
      check(`${c}: added teaching support`,await page.locator('.teaching-support').count()===[0,3,2,3][c]);
      check(`${c}: no student entry fields`,await page.locator('.revised-cycle input,.revised-cycle textarea').count()===0);
      check(`${c}: unique IDs`,await page.locator('[id]').evaluateAll(ns=>new Set(ns.map(n=>n.id)).size===ns.length));
      check(`${c}: cycle anchors resolve`,await page.locator(`main a[href^="#cycle/c${c}/"]`).evaluateAll(ns=>ns.every(n=>document.getElementById(n.getAttribute('href').split('/')[2]))));
      const locals=await page.locator('main a[href]:not([href^="#"]),main img[src]').evaluateAll(ns=>ns.map(n=>n.href||n.src).filter(u=>u.startsWith('file:')));
      check(`${c}: public assets and documents exist`,locals.every(u=>{const url=new URL(u);url.hash='';return fs.existsSync(fileURLToPath(url))&&fileURLToPath(url).startsWith(site+path.sep)}));
      for(const img of await page.locator('main img').all())await img.evaluate(n=>{n.loading='eager';return n.decode()});
      check(`${c}: images load`,await page.locator('main img').evaluateAll(ns=>ns.every(n=>n.naturalWidth>0)));
      for(const width of [1440,1100,800,390,320]){
        await page.setViewportSize({width,height:1000});
        for(const theme of ['light','dark']){
          await page.evaluate(theme=>{window.setMentorTheme(theme);document.documentElement.style.setProperty('--text-size','21px');document.querySelectorAll('.teaching-support').forEach(n=>n.open=true)},theme);
          check(`${c}: ${width} ${theme} no page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
          check(`${c}: ${width} ${theme} text fits`,await page.locator('.question,.meaning,.rubric-requirements,.level,.teaching-support').evaluateAll(ns=>ns.every(n=>n.scrollWidth<=n.clientWidth+1)));
        }
      }
      await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>{window.setMentorTheme('light');document.documentElement.style.setProperty('--text-size','18px')});
      await page.locator('.teaching-support').first().scrollIntoViewIfNeeded();
      await page.screenshot({path:path.join(root,`review/integrated-cycle${c}-desktop.png`)});
      await page.locator('[data-figure-expand]').first().click();
      check(`${c}: example image enlarges`,await page.locator('#imageDialog').evaluate(n=>n.open));
      await page.locator('#mapZoom').click();
      check(`${c}: image zoom works`,await page.locator('#mapZoom').getAttribute('aria-pressed')==='true');
      await page.keyboard.press('Escape');
      check(`${c}: image closes`,await page.locator('#imageDialog').evaluate(n=>!n.open));
      await page.setViewportSize({width:390,height:844});
      await page.locator('.teaching-support').last().scrollIntoViewIfNeeded();
      await page.screenshot({path:path.join(root,`review/integrated-cycle${c}-mobile.png`)});
      await page.goto(url+'/part-b');
      check(`${c}: old part deep link uses revised page`,await page.locator('.revised-cycle #part-b').count()===1);
      await page.goto(url+'/a-q1');
      check(`${c}: old question deep link uses revised page`,await page.locator('.revised-cycle #a-q1').count()===1);
      await page.goto(url+`/writing-c${c}-${c===1?'data':'context'}`);
      check(`${c}: existing supplemental example link retained`,await page.locator('.writing-example').count()>0);
    }
    await page.goto(pathToFileURL(path.join(site,'index.html')).href+'#search/CTC%20example');
    check('search finds revised pages',await page.locator('main a[href^="#cycle/"]').count()>3);
    check('no browser errors',errors.length===0);
    fs.writeFileSync(path.join(root,'review/revised-cycles-integration-verification.json'),JSON.stringify({passed:true,checks,errors},null,2));
    console.log(JSON.stringify({passed:true,checks:checks.length}));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
