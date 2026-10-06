import { ForwardPage, forwardMetadata } from '@/components/ui/ForwardPage';

// Alias: /demo forwards to /request-demo (see ForwardPage).
export const metadata = forwardMetadata('/request-demo', 'Request a demo');

export default function Page() {
  return <ForwardPage target="/request-demo" label="Request a demo" />;
}
