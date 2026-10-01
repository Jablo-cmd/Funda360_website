import type { Availability } from '@/content/types';

const LABELS: Record<Availability, string> = {
  available: 'Available today',
  roadmap: 'Roadmap',
  confirm: 'To be confirmed',
};

type Props = {
  availability?: Availability;
  /** "available" is implicit everywhere except where the contrast matters (AI page). */
  showAvailable?: boolean;
};

/**
 * Text label that keeps current capability and roadmap concepts visibly
 * separate. Never remove it from roadmap or unconfirmed items.
 */
export function AvailabilityBadge({ availability, showAvailable = false }: Props) {
  if (!availability || (availability === 'available' && !showAvailable)) return null;
  return (
    <span className="badge" data-availability={availability}>
      {LABELS[availability]}
    </span>
  );
}
