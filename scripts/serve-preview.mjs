import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const base = "/ecoclean-v2";
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".pdf": "application/pdf", ".ico": "image/x-icon", ".mp4": "video/mp4", ".woff2": "font/woff2", ".txt": "text/plain" };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname === "/" || pathname === base) { res.writeHead(302, { Location: `${base}/` }); res.end(); return; }
    if (!pathname.startsWith(`${base}/`)) { res.writeHead(404); res.end(); return; }
    let file = resolve(root, `.${pathname.slice(base.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) { res.writeHead(403); res.end(); return; }
    let info = await stat(file);
    if (info.isDirectory()) { file = resolve(file, "index.html"); info = await stat(file); }
    const headers = { "Content-Type": mime[extname(file)] || "application/octet-stream", "Accept-Ranges": "bytes" };
    let start = 0, end = info.size - 1, status = 200;
    if (req.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!range || (!range[1] && !range[2])) { res.writeHead(416, { "Content-Range": `bytes */${info.size}` }); res.end(); return; }
      start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
      end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
      if (start > end || start >= info.size) { res.writeHead(416, { "Content-Range": `bytes */${info.size}` }); res.end(); return; }
      headers["Content-Range"] = `bytes ${start}-${end}/${info.size}`;
      status = 206;
    }
    headers["Content-Length"] = end - start + 1;
    res.writeHead(status, headers);
    if (req.method === "HEAD") { res.end(); return; }
    const stream = createReadStream(file, { start, end });
    stream.on("error", () => res.destroy());
    res.on("close", () => stream.destroy());
    stream.pipe(res);
  } catch { res.writeHead(404); res.end("Not found. Run npm run build before previewing."); }
}).listen(4175, "127.0.0.1", () => console.log(`EcoClean preview: http://localhost:4175${base}/`));
