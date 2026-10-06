import { ForwardPage, forwardMetadata } from '@/components/ui/ForwardPage';

// Alias: /product forwards to /platform (see ForwardPage).
export const metadata = forwardMetadata('/platform', 'The Funda360 platform');

export default function Page() {
  return <ForwardPage target="/platform" label="The Funda360 platform" />;
}
