import { createServer } from 'node:http';
import { handleDemoRequest, type DemoEndpointEnv } from './handler.ts';

/**
 * Node adapter for the Request a Demo endpoint (self-hosting or local testing).
 *   PORT=8787 ALLOWED_ORIGINS=http://localhost:3000 DEMO_REQUEST_WEBHOOK_URL=... node server/demo-request/node-server.ts
 * Requires Node 22.18+ (runs TypeScript directly). Put it behind HTTPS in production.
 */
const env = process.env as DemoEndpointEnv;
const port = Number(process.env.PORT ?? 8787);

createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    // Stop reading early; the handler rejects oversized bodies with 413.
    if (size > 64 * 1024) break;
    chunks.push(chunk as Buffer);
  }
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) if (typeof value === 'string') headers.set(key, value);
  if (!headers.has('cf-connecting-ip') && req.socket.remoteAddress) headers.set('x-forwarded-for', headers.get('x-forwarded-for') ?? req.socket.remoteAddress);
  const method = req.method ?? 'GET';
  const request = new Request(`http://localhost${req.url ?? '/'}`, { method, headers, body: method === 'GET' || method === 'HEAD' ? undefined : Buffer.concat(chunks) });
  const response = await handleDemoRequest(request, env);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, () => console.log(`Demo request endpoint listening on http://localhost:${port}`));
