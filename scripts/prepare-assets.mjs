// Prepares derived assets for the site:
//  1. Compresses the four videos in /public to < 3 MB (originals stay in the project root folders).
//  2. Crops the six guest avatars out of the headshot grid (charms image 5.jpg).
//  3. Generates the connected-pill outline SVGs (nav, CTA buttons, tag chain, scroll bite)
//     with the same geometry as the Figma components: union of capsules + necks, then a
//     morphological "closing" (offset +R, -R with round joins) to smooth the joins.
//
// Run: node scripts/prepare-assets.mjs [--skip-video]
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, statSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");
const ClipperLib = require("clipper-lib");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const run = (args) => execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
const mb = (f) => (statSync(f).size / 1024 / 1024).toFixed(2);

// ---------- 1. Videos ----------
const videos = [
  "hero image and video/hero video-desktop size.mp4",
  "hero image and video/hero video-mobile size.mp4",
  "interior/interior video-desktop.mp4",
  "interior/interior video-mobile.mp4",
];
if (!process.argv.includes("--skip-video")) {
  for (const rel of videos) {
    const src = path.join(pub, rel);
    if (statSync(src).size < 3 * 1024 * 1024 && !rel.startsWith("hero")) { console.log("ok", rel, mb(src), "MB"); continue; }
    const tmp = src.replace(/\.mp4$/, ".tmp.mp4");
    let crf = 26;
    for (;;) {
      run(["-i", src, "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-vf", "scale='min(1280,iw)':-2",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", tmp]);
      if (statSync(tmp).size < 2.9 * 1024 * 1024 || crf >= 34) break;
      crf += 2;
    }
    rmSync(src); renameSync(tmp, src);
    console.log("compressed", rel, "->", mb(src), "MB (crf", crf + ")");
  }
}

// ---------- 2. Avatars ----------
const avDir = path.join(pub, "avatars");
mkdirSync(avDir, { recursive: true });
const grid = path.join(pub, "charms/charms image 5.jpg");
const W = 1254, S = Math.round(0.319 * W);
const cells = [[0.0088, 0.0718], [0.3421, 0.0718], [0.6746, 0.0718], [0.0088, 0.5742], [0.3421, 0.5742], [0.6746, 0.5742]];
cells.forEach(([tx, ty], i) => {
  const out = path.join(avDir, `guest-${i + 1}.webp`);
  run(["-i", grid, "-vf", `crop=${S}:${S}:${Math.round(tx * W)}:${Math.round(ty * W)},scale=128:128`, "-quality", "85", out]);
});
console.log("avatars ->", avDir);

// ---------- 3. Connected-pill outline SVGs ----------
const K = 100; // clipper works in integers
function capsule({ x, y, w, h, cr, rot = 0 }) {
  const r = cr ?? Math.min(w, h) / 2;
  const pts = [];
  const arc = (cx, cy, a0) => { for (let i = 0; i <= 16; i++) { const a = a0 + (i / 16) * (Math.PI / 2); pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } };
  if (r === 0) pts.push([x, y], [x + w, y], [x + w, y + h], [x, y + h]);
  else { arc(x + w - r, y + r, -Math.PI / 2); arc(x + w - r, y + h - r, 0); arc(x + r, y + h - r, Math.PI / 2); arc(x + r, y + r, Math.PI); }
  // rotation is visual counter-clockwise (Figma convention), about the shape centre
  const cx = x + w / 2, cy = y + h / 2, c = Math.cos((rot * Math.PI) / 180), s = Math.sin((rot * Math.PI) / 180);
  return pts.map(([px, py]) => { const lx = px - cx, ly = py - cy; return { X: Math.round((cx + lx * c + ly * s) * K), Y: Math.round((cy - lx * s + ly * c) * K) }; });
}
function outline(parts, smooth) {
  const c = new ClipperLib.Clipper();
  c.AddPaths(parts.map(capsule), ClipperLib.PolyType.ptSubject, true);
  const u = new ClipperLib.Paths();
  c.Execute(ClipperLib.ClipType.ctUnion, u, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
  const off = (paths, d) => { const o = new ClipperLib.ClipperOffset(2, 0.05 * K); o.AddPaths(paths, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon); const out = new ClipperLib.Paths(); o.Execute(out, d * K); return out; };
  const closed = off(off(u, smooth), -smooth);
  return closed.map((p) => "M" + p.map((q) => `${(q.X / K).toFixed(2)} ${(q.Y / K).toFixed(2)}`).join("L") + "Z").join("");
}
const svgDir = path.join(pub, "svg");
mkdirSync(svgDir, { recursive: true });
const PAD = 2;
function writeOutline(name, w, h, parts, color, smooth) {
  const d = outline(parts, smooth);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w + PAD * 2}" height="${h + PAD * 2}" viewBox="${-PAD} ${-PAD} ${w + PAD * 2} ${h + PAD * 2}" fill="none"><path d="${d}" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
  writeFileSync(path.join(svgDir, name), svg);
  console.log("svg", name);
}
const navMain = [{ x: 0, y: 0, w: 150, h: 40 }, { x: 120, y: 18, w: 280, h: 4, cr: 0 }, { x: 372, y: 0, w: 92, h: 40 }, { x: 440, y: 12, w: 70, h: 16, cr: 0 }, { x: 488, y: 0, w: 264, h: 40 }];
const navRight = [{ x: 0, y: 0, w: 90, h: 40 }, { x: 70, y: 12, w: 64, h: 16, cr: 0 }, { x: 114, y: 0, w: 100, h: 40 }];
const cta = [{ x: 0, y: 0, w: 204, h: 46 }, { x: 180, y: 14, w: 70, h: 18, cr: 0 }, { x: 224, y: 0, w: 46, h: 46 }];
const tag = [{ x: 0, y: 84, w: 112, h: 40 }, { x: 92, y: 97, w: 40, h: 14, cr: 0 }, { x: 160 - 61, y: 58 - 18, w: 122, h: 36, rot: 45 }, { x: 132, y: 96, w: 70, h: 16, cr: 0 }, { x: 188, y: 84, w: 142, h: 40 }];
writeOutline("nav-main.svg", 752, 40, navMain, "#FFFFFF", 9);
writeOutline("nav-right.svg", 214, 40, navRight, "#FFFFFF", 9);
writeOutline("cta-light.svg", 270, 46, cta, "#FFFFFF", 8);
writeOutline("cta-earth.svg", 270, 46, cta, "#000000", 8);
writeOutline("tag-chain.svg", 330, 124, tag, "#FFFFFF", 8);
writeFileSync(path.join(svgDir, "scroll-bite.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none"><circle cx="56" cy="56" r="56" fill="#FFFFFF"/><circle cx="56" cy="56" r="40" stroke="#000000" stroke-width="1.5"/><g transform="translate(44 44)" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/></g></svg>`);
console.log("svg scroll-bite.svg");
if (!existsSync(path.join(svgDir, "nav-main.svg"))) process.exit(1);
