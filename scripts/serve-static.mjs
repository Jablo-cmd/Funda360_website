#!/usr/bin/env node
/**
 * Minimal static file server for the exported site (./out), used by CI to run
 * the browser QA against the exact files that will be deployed.
 *
 *   node scripts/serve-static.mjs [dir] [port]
 *
 * Mirrors GitHub Pages: directory URLs serve index.html, unknown paths serve 404.html with a 404.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] || 'out');
const port = Number(process.argv[3] || 3100);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

async function resolveFile(pathname) {
  const target = resolve(join(root, normalize(decodeURIComponent(pathname))));
  if (target !== root && !target.startsWith(root + sep)) return null;
  const info = await stat(target).catch(() => null);
  if (info?.isFile()) return target;
  if (info?.isDirectory()) {
    const index = join(target, 'index.html');
    if (await stat(index).catch(() => null)) return index;
  }
  return null;
}

createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    let file = await resolveFile(pathname);
    let status = 200;
    if (!file) {
      file = await resolveFile('/404.html');
      status = 404;
    }
    if (!file) {
      res.writeHead(404).end('Not found');
      return;
    }
    const body = await readFile(file);
    res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Content-Length': body.length });
    res.end(body);
  } catch {
    res.writeHead(400).end('Bad request');
  }
}).listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`));
