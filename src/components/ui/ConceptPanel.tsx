import { AvailabilityBadge } from './AvailabilityBadge';

type Props = { title: string; steps: string[]; note: string };

/**
 * A roadmap concept described in words, never as a mock product screen.
 * Used where a future capability needs visual weight without implying it exists.
 */
export function ConceptPanel({ title, steps, note }: Props) {
  return (
    <figure className="concept-panel" aria-labelledby="concept-title">
      <div className="concept-panel__label">
        <span className="eyebrow eyebrow--insight">Roadmap concept · not a product screen</span>
        <AvailabilityBadge availability="roadmap" />
      </div>
      <p id="concept-title" className="item__title">
        {title}
      </p>
      <ol className="concept-flow">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <figcaption className="meta spaced-top-sm">{note}</figcaption>
    </figure>
  );
}
