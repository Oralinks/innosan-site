// Full-page screenshots of the running site with the locally installed Edge/Chrome.
// Usage: node scripts/screenshot.mjs [url] [width] [out.png]
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3000/";
const width = Number(process.argv[3] ?? 1440);
const out = process.argv[4] ?? `design-compare/site-${width}.png`;
const executablePath = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find((p) => p && existsSync(p));

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "load", timeout: 60000 });
// scroll through so lazy images load, then wait for every image to decode
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo({ top: 0, behavior: "instant" });
  const settle = Promise.all(
    [...document.images].map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => { i.onload = i.onerror = r; }))),
  );
  await Promise.race([settle, new Promise((r) => setTimeout(r, 10000))]);
});
console.log("images settled");
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("saved", out);

