import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.STORYBOOK_URL || 'http://127.0.0.1:6006';
const outputDir = path.resolve('visual-qa');
const screenshotDir = path.join(outputDir, 'screenshots');
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(screenshotDir, { recursive: true });

const index = JSON.parse(fs.readFileSync('storybook-static/index.json', 'utf8'));
const entries = Object.entries(index.entries || {})
  .map(([id, entry]) => ({ id, ...entry }))
  .filter(entry => entry.type === 'story')
  .sort((a, b) => `${a.title}/${a.name}`.localeCompare(`${b.title}/${b.name}`));

const screenWidths = [320, 375, 414, 768, 1280, 1440];
const componentWidths = [375, 1280];
const docsWidths = [1280];

const screenPresets = {
  Home: ['default', 'focus', 'all-looks', 'city-modal'],
  Catalog: ['default', 'filters-open', 'saved'],
  Master: ['default', 'saved'],
  Work: ['default'],
  Photo: ['default', 'analyzed', 'analyzed-no-tags'],
  Favourites: ['default', 'saved'],
};

const safeName = value => value.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

const casesForStory = story => {
  if (story.title === 'Screens') {
    return (screenPresets[story.name] || ['default']).map(preset => ({ name: preset, args: `preset:${preset}` }));
  }
  return [{ name: 'default', args: null }];
};

const widthsForStory = story => {
  if (story.title === 'Screens') return screenWidths;
  if (story.title === 'Components' || story.title === 'Patterns' || story.title === 'Foundations') return componentWidths;
  return docsWidths;
};

const browser = await chromium.launch({ headless: true });
const report = {
  generatedAt: new Date().toISOString(),
  source: baseUrl,
  stories: entries.length,
  checks: 0,
  issues: [],
  results: [],
};

for (const story of entries) {
  const widths = widthsForStory(story);
  const cases = casesForStory(story);

  for (const storyCase of cases) {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: width <= 414 ? 900 : 1100 }, deviceScaleFactor: 1 });
      const args = storyCase.args ? `&args=${storyCase.args}` : '';
      const url = `${baseUrl}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story${args}`;
      const consoleErrors = [];
      const resourceErrors = [];

      page.on('console', msg => {
        if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource:')) consoleErrors.push(msg.text());
      });
      page.on('pageerror', error => consoleErrors.push(error.message));
      page.on('response', response => {
        if (response.status() >= 400) resourceErrors.push(`${response.status()} ${response.url()}`);
      });

      let loadError = null;
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 15000 });
        await page.waitForTimeout(180);
      } catch (error) {
        loadError = error instanceof Error ? error.message : String(error);
      }

      const audit = loadError ? null : await page.evaluate(() => {
        const isVisible = el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
        };
        const selector = el => {
          if (el.id) return `#${el.id}`;
          const classes = [...el.classList].slice(0, 3).join('.');
          return `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ''}`;
        };
        const ignore = el => !!el.closest('.preview-nav, .preview-media, .cosmos-collage, [data-qa-ignore]');
        const viewportWidth = window.innerWidth;
        const all = [...document.body.querySelectorAll('*')];
        const offscreen = [];
        const clipped = [];
        const wrappedControls = [];

        for (const el of all) {
          if (!isVisible(el) || ignore(el)) continue;
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          const meaningful = el.matches('button,a,input,label,h1,h2,h3,p,span,strong,nav,header,aside,section,article');
          if (meaningful && (rect.left < -2 || rect.right > viewportWidth + 2)) {
            offscreen.push({ selector: selector(el), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) });
          }
          if (meaningful && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2 && ['hidden', 'clip'].includes(style.overflowX)) {
            clipped.push({ selector: selector(el), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth });
          }
        }

        for (const el of document.querySelectorAll('button,a,[role="button"]')) {
          if (!isVisible(el) || ignore(el) || !el.textContent?.trim()) continue;
          if (el.matches('.srez-master-card__name') || el.querySelector('.srez-fav-count')) continue;
          const ys = new Set();
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            if (!node.textContent?.trim()) continue;
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) ys.add(Math.round(rect.top));
          }
          if (ys.size > 1) wrappedControls.push({ selector: selector(el), text: el.textContent.trim().slice(0, 100), lines: ys.size });
        }

        return {
          documentScrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          viewportWidth,
          horizontalOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > viewportWidth + 2,
          offscreen: offscreen.slice(0, 30),
          clipped: clipped.slice(0, 30),
          wrappedControls: wrappedControls.slice(0, 30),
        };
      });

      const storyLabel = `${story.title} / ${story.name} / ${storyCase.name}`;
      const slug = `${safeName(story.title)}--${safeName(story.name)}--${safeName(storyCase.name)}--${width}`;
      const screenshot = path.join(screenshotDir, `${slug}.png`);
      if (!loadError) await page.screenshot({ path: screenshot, fullPage: true });

      const issues = [];
      if (loadError) issues.push({ type: 'load-error', detail: loadError });
      if (audit?.horizontalOverflow) issues.push({ type: 'horizontal-overflow', detail: `${audit.documentScrollWidth}px document / ${audit.viewportWidth}px viewport` });
      if (audit?.offscreen.length) issues.push({ type: 'offscreen-elements', detail: audit.offscreen });
      if (audit?.clipped.length) issues.push({ type: 'clipped-elements', detail: audit.clipped });
      if (audit?.wrappedControls.length) issues.push({ type: 'wrapped-controls', detail: audit.wrappedControls });
      if (resourceErrors.length) issues.push({ type: 'resource-errors', detail: resourceErrors.slice(0, 10) });
      if (consoleErrors.length) issues.push({ type: 'console-errors', detail: consoleErrors.slice(0, 10) });

      report.checks += 1;
      report.results.push({
        story: storyLabel,
        storyId: story.id,
        case: storyCase.name,
        width,
        issues,
        screenshot: loadError ? null : `screenshots/${path.basename(screenshot)}`,
      });
      for (const issue of issues) report.issues.push({ story: storyLabel, storyId: story.id, case: storyCase.name, width, ...issue });
      await page.close();
    }
  }
}

await browser.close();
fs.writeFileSync(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));

const grouped = report.issues.reduce((acc, issue) => {
  acc[issue.type] = (acc[issue.type] || 0) + 1;
  return acc;
}, {});

console.log('\n=== SREZ Storybook visual audit ===');
console.log(`Visible stories: ${report.stories}`);
console.log(`Rendered checks: ${report.checks}`);
console.log(`Issue records: ${report.issues.length}`);
console.log('Issue types:', grouped);

for (const issue of report.issues.slice(0, 80)) {
  const detail = typeof issue.detail === 'string' ? issue.detail : JSON.stringify(issue.detail);
  console.log(`QA_ISSUE | ${issue.type} | ${issue.width}px | ${issue.story} | ${detail.slice(0, 900)}`);
}
if (report.issues.length > 80) console.log(`... ${report.issues.length - 80} more issue records in visual-qa/report.json`);
