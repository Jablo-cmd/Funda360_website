import { ForwardPage, forwardMetadata } from '@/components/ui/ForwardPage';

// Alias: /features forwards to /platform (see ForwardPage).
export const metadata = forwardMetadata('/platform', 'Funda360 features');

export default function Page() {
  return <ForwardPage target="/platform" label="Funda360 features" />;
}
