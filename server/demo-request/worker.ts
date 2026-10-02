import { handleDemoRequest, type DemoEndpointEnv } from './handler.ts';

/**
 * Cloudflare Workers entry point for the Request a Demo endpoint.
 * Deploy with Wrangler (see README.md and wrangler.toml.example).
 * Secrets are set with `wrangler secret put`, never committed.
 */
export default {
  fetch(request: Request, env: DemoEndpointEnv): Promise<Response> {
    return handleDemoRequest(request, env);
  },
};
