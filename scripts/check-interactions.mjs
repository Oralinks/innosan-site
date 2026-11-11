// Smoke-tests the page interactions at a given width with the local Edge/Chrome.
// Usage: node scripts/check-interactions.mjs [width]
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const width = Number(process.argv[2] ?? 1280);
const executablePath = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find((p) => p && existsSync(p));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "load" });
await wait(1500);

const r = {};
r.zoom = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--desk-zoom"));
r.horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

const track = () => page.$eval("#about .-ml-5", (t) => t.style.transform);
r.carouselBefore = await track();
await page.click('button[aria-label="Next highlight"]');
await wait(1200);
r.carouselAfterNext = await track();
await page.click('button[aria-label="Previous highlight"]');
await wait(1200);
r.carouselAfterPrev = await track();

r.counterStart = await page.$eval("#stays .text-counter", (e) => e.textContent);
await wait(6300);
r.counterAfter6s = await page.$eval("#stays .text-counter", (e) => e.textContent);
r.activeSegment = await page.$$eval("#stays [aria-hidden=true].mt-\\[18px\\] span", (s) => s.findIndex((x) => x.className.includes("opacity-100")) + 1);

await page.evaluate(() => [...document.querySelectorAll("#faqs button[aria-expanded]")].find((b) => b.textContent.includes("bedroom")).click());
await wait(300);
r.openRows = await page.$$eval("#faqs h3[id]", (h) => h.map((x) => x.textContent));
r.openImage = await page.$eval("#faqs h3[id]", (h) => h.closest(".border-t").querySelector("img").alt);

await page.click('#top button[aria-label^="Play video"]');
await wait(1000);
r.heroModal = await page.evaluate(() => {
  const d = [...document.querySelectorAll("dialog")].find((x) => x.open);
  const v = d?.querySelector("video");
  return d ? { open: true, src: v?.currentSrc?.split("/").pop(), muted: v?.muted, playing: v ? !v.paused : false } : { open: false };
});
await page.keyboard.press("Escape");
await wait(300);
r.modalClosedByEsc = await page.evaluate(() => ![...document.querySelectorAll("dialog")].some((d) => d.open));

r.heroVideo = await page.$eval("#top video", (v) => ({ src: v.currentSrc.split("/").pop(), muted: v.muted, loop: v.loop, playing: !v.paused, poster: !!v.poster }));

await page.click('a[aria-label="Scroll to the next section"]');
await wait(1500);
r.scrollAfterBite = await page.evaluate(() => Math.round(document.querySelector("#about").getBoundingClientRect().top));

console.log(JSON.stringify(r, null, 2));
await browser.close();
