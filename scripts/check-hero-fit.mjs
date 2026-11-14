// Checks that every hero element sits inside the first screen at common window sizes,
// and saves a first-screen screenshot for each size.
// Usage: node scripts/check-hero-fit.mjs [url] [shotDir]
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000/";
const shotDir = process.argv[3];
const sizes = [
  [1350, 637], // laptop with browser chrome and a short window
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1536, 864],
  [1920, 1080],
  [2560, 1300],
  [1024, 768],
  [768, 1024],
  [360, 740],
  [375, 812],
  [390, 844],
  [430, 932],
  [375, 667], // iPhone SE: too short for the full stack; the circle bottoms out at 0.5x
];
const executablePath = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find((p) => p && existsSync(p));

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
const results = [];
for (const [width, height] of sizes) {
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: "load" });
  await new Promise((r) => setTimeout(r, 2800)); // let the entrance animations finish
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const header = document.querySelector("header").getBoundingClientRect();
    const items = {
      headline: "#top h1",
      cta: "#top a[href='#stays']",
      blurb: "#top p",
      orbit: "#top [data-reveal='scale']",
      tags: "#top [data-reveal='right']",
    };
    const out = {};
    let fits = true;
    for (const [k, sel] of Object.entries(items)) {
      const b = document.querySelector(sel).getBoundingClientRect();
      const inside = b.left >= 0 && b.right <= vw + 0.5 && b.top >= header.bottom - 0.5 && b.bottom <= vh + 0.5;
      if (!inside) fits = false;
      out[k] = `${Math.round(b.left)},${Math.round(b.top)} → ${Math.round(b.right)},${Math.round(b.bottom)}${inside ? "" : "  ✗"}`;
    }
    return {
      fits,
      heroHeight: Math.round(document.getElementById("top").getBoundingClientRect().height),
      zoom: getComputedStyle(document.documentElement).getPropertyValue("--hero-zoom"),
      overflowX: document.documentElement.scrollWidth - vw,
      ...out,
    };
  });
  results.push({ size: `${width}x${height}`, ...r });
  if (shotDir) await page.screenshot({ path: `${shotDir}/hero-${width}x${height}.png` });
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
