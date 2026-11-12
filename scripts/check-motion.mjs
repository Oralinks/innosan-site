// Checks the scroll motion: hero reveals on load, below-the-fold elements stay hidden until
// scrolled to, everything ends visible, and reduced motion shows everything at once.
// Usage: node scripts/check-motion.mjs [width] [url] [shotDir]
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const width = Number(process.argv[2] ?? 1280);
const url = process.argv[3] ?? "http://localhost:3000/";
const shotDir = process.argv[4];
const executablePath = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find((p) => p && existsSync(p));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
await page.setViewport({ width, height: 900 });
await page.goto(url, { waitUntil: "load" });
await wait(300);

const state = () =>
  page.evaluate(() => {
    const all = [...document.querySelectorAll("[data-reveal]")];
    return {
      total: all.length,
      shown: all.filter((e) => e.hasAttribute("data-shown")).length,
      heroShown: [...document.querySelectorAll("#top [data-reveal], header [data-reveal]")].every((e) => e.hasAttribute("data-shown")),
      galleryShown: document.querySelector("#journal").hasAttribute("data-shown"),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

const r = { width };
r.onLoad = await state();
if (shotDir) await page.screenshot({ path: `${shotDir}/motion-${width}-load-early.png` });
await wait(2500);
if (shotDir) await page.screenshot({ path: `${shotDir}/motion-${width}-load-settled.png` });

// Scroll down in steps, like a reader would
const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < height; y += 400) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await wait(120);
}
await wait(400);
if (shotDir) {
  await page.evaluate(() => document.querySelector("#journal").scrollIntoView());
  await wait(150);
  await page.screenshot({ path: `${shotDir}/motion-${width}-gallery-mid.png` });
}
await wait(2500);
r.afterScroll = await state();

// Every revealed element should end fully visible (no element stuck at opacity 0)
r.stuckHidden = await page.evaluate(() =>
  [...document.querySelectorAll("[data-reveal], .rv-card")]
    .filter((e) => {
      if (!e.classList.contains("rv-card") && !["up", "down", "left", "right", "fade", "scale", "clip", "line"].includes(e.dataset.reveal)) return false;
      return parseFloat(getComputedStyle(e).opacity) < 0.99 && !e.closest("[class*='opacity-']");
    })
    .map((e) => e.tagName + "." + String(e.className).slice(0, 50)),
);

// Reduced motion: nothing hidden, no data-motion
const rm = await browser.newPage();
await rm.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await rm.setViewport({ width, height: 900 });
await rm.goto(url, { waitUntil: "load" });
r.reducedMotion = await rm.evaluate(() => ({
  motionAttr: document.documentElement.hasAttribute("data-motion"),
  galleryOpacity: getComputedStyle(document.querySelector("#journal")).opacity,
}));

console.log(JSON.stringify(r, null, 2));
await browser.close();
