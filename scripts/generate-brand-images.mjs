import sharp from "sharp";
import { readFile, mkdir, writeFile } from "node:fs/promises";

// Re-render the outlined source artwork; no fonts or network requests required.
await mkdir("public/icons", { recursive: true });
for (const name of ["eco-clean-share", "eco-clean-catalog-share"]) {
  await sharp(`public/social/${name}.svg`).jpeg({ quality: 92, mozjpeg: true }).toFile(`public/social/${name}.jpg`);
}
const icon = await readFile("src/app/icon.svg");
for (const [name, size] of [["icon-96", 96], ["apple-touch-icon", 180], ["eco-clean-logo", 512]]) {
  await sharp(icon).resize(size, size).png().toFile(`public/icons/${name}.png`);
}

// ICO supports PNG-encoded frames, keeping the small and large icons crisp.
const frames = await Promise.all([16, 32, 48, 64].map(size => sharp(icon).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
for (const [i, frame] of frames.entries()) {
  const p = 6 + i * 16;
  header[p] = [16, 32, 48, 64][i]; header[p + 1] = header[p];
  header.writeUInt16LE(1, p + 4); header.writeUInt16LE(32, p + 6);
  header.writeUInt32LE(frame.length, p + 8); header.writeUInt32LE(offset, p + 12);
  offset += frame.length;
}
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...frames]));
console.log("Generated two 1200 × 630 social cards, browser icons and Apple touch icon.");
