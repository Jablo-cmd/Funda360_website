import type { Feature } from '@/content/types';

type Props = {
  steps: Feature[];
  level?: 3 | 4;
  /** Index of the step that represents insight (drawn with the teal intelligence accent). */
  highlight?: number;
};

/** An ordered sequence (Manage → Understand → Act, Connect → … → Act). */
export function StepList({ steps, level = 3, highlight }: Props) {
  const Heading = `h${level}` as 'h3' | 'h4';
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step.title} data-highlight={index === highlight || undefined}>
          <Heading className="item__title">{step.title}</Heading>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
