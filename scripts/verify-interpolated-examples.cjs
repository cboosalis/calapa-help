const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('../../tools/perplexity/node_modules/playwright');
const site = path.resolve(__dirname, '..');
const root = path.dirname(site);
const count = text => text.trim().split(/\s+/).filter(Boolean).length;
const base = process.env.CALAPA_PREVIEW_URL || 'http://127.0.0.1:8790/index.html';

(async () => {
  const browser = await chromium.launch({headless: true});
  const audit = [];
  const errors = [];
  const exportLines = ['# Interpolated Examples', '', 'Full-length local rewrites, grouped by their location in the app.', ''];
  try {
    const page = await browser.newPage();
    page.on('pageerror', e => errors.push(e.message));
    for (const cycle of [1, 2, 3]) {
      await page.goto(pathToFileURL(path.join(root, `outputs/cycle${cycle}-complete-analysis/index.html`)).href);
      const originals = await page.locator('article.template-review').evaluateAll(nodes => nodes.map(n => ({
        id: n.id, text: n.querySelector('.example-response').innerText.replace(/^CTC example\s*/, '')
      })));
      await page.goto(`${base}#cycle/c${cycle}`);
      await page.locator('.revised-cycle').waitFor();
      const actual = await page.locator('article.template-review').evaluateAll(nodes => nodes.map(n => ({
        id: n.id, title: n.querySelector('h2').innerText,
        heading: n.querySelector('.example-response h3').innerText,
        text: n.querySelector('.interpolated-example').innerText,
        html: n.querySelector('.interpolated-example').innerHTML
      })));
      assert.equal(actual.length, originals.length);
      for (const original of originals) {
        const current = actual.find(n => n.id === original.id);
        assert.ok(current, `Missing c${cycle}/${original.id}`);
        assert.equal(current.heading, 'Interpolated Example');
        const originalWords = count(original.text), rewrittenWords = count(current.text);
        const tolerance = Math.max(3, Math.ceil(originalWords * 0.05));
        const withinLength = Math.abs(rewrittenWords - originalWords) <= tolerance;
        audit.push({cycle, id: current.id, title: current.title, originalWords, rewrittenWords, withinLength});
        exportLines.push(`## Cycle ${cycle}: ${current.title}`, '', `App location: ${base}#cycle/c${cycle}/${current.id}`, '', `Original: ${originalWords} words. Rewritten: ${rewrittenWords} words.`, '', ...current.text.split('\n').map(line => `> ${line}`), '');
      }
      const body = await page.locator('main').innerText();
      assert.doesNotMatch(body, /CTC example|High School P|Cruz[’']s Math Crew|Canyon View|Meadow Park|Its response wording is retained|The highlight shows this review's estimate/);
      assert.equal(await page.locator('.level.estimated').count(), 0);
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({width, height: 1000});
        for (const theme of ['light', 'dark']) {
          await page.evaluate(theme => {window.setMentorTheme(theme);document.documentElement.style.setProperty('--text-size', '21px');}, theme);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Page overflow c${cycle} ${width} ${theme}`);
          assert.ok(await page.locator('.interpolated-example').evaluateAll(ns => ns.every(n => n.scrollWidth <= n.clientWidth + 1)), `Example overflow c${cycle} ${width} ${theme}`);
        }
      }
      await page.setViewportSize({width: 1440, height: 1000});
      await page.evaluate(() => {window.setMentorTheme('dark');document.documentElement.style.setProperty('--text-size', '18px');});
      const target = cycle === 1 ? 'A-mission' : cycle === 2 ? 'F1' : 'F';
      await page.locator(`#${target} .example-response`).scrollIntoViewIfNeeded();
      await page.screenshot({path: path.join(root, `review/interpolated-c${cycle}-full-length-desktop.png`)});
      await page.setViewportSize({width: 390, height: 844});
      await page.locator(`#${target} .example-response`).evaluate(n => n.scrollIntoView({block: 'start'}));
      await page.screenshot({path: path.join(root, `review/interpolated-c${cycle}-full-length-mobile.png`)});
      if (cycle === 1) {
        const originalData = originals.find(n => n.id === 'A-data').text;
        const revisedData = actual.find(n => n.id === 'A-data').text;
        for (const value of originalData.match(/\d+(?:\.\d+)?%/g)) assert.ok(revisedData.includes(value), `Missing data value ${value}`);
        assert.equal(await page.locator('#A-data .interpolated-example table').count(), 4);
        assert.equal(await page.locator('#A-qualitative .interpolated-example tbody tr').count(), 4);
      }
    }
    const failed = audit.filter(r => !r.withinLength);
    const report = {passed: failed.length === 0 && errors.length === 0, examples: audit.length,
      originalWords: audit.reduce((s,r) => s + r.originalWords, 0),
      rewrittenWords: audit.reduce((s,r) => s + r.rewrittenWords, 0), errors, rows: audit};
    fs.writeFileSync(path.join(root, 'review/interpolated-example-length-audit.json'), JSON.stringify(report, null, 2));
    const markdown = exportLines.join('\n');
    for (const name of ['interpolated-example-text-extract-20261010.md', 'ctc-example-text-extract-20261010.md', 'ctc-example-text-extract-offset-20261010.md']) {
      fs.writeFileSync(path.join(root, 'outputs', name), markdown);
    }
    console.log(JSON.stringify({passed: report.passed, examples: report.examples, originalWords: report.originalWords, rewrittenWords: report.rewrittenWords, failed, errors}, null, 2));
    assert.equal(failed.length, 0, 'Examples must stay within 5% of original length (three-word allowance for tiny labels).');
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(e => {console.error(e);process.exitCode = 1;});
