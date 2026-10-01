import type { Feature } from '@/content/types';

type Props = { steps: Feature[]; level?: 3 | 4 };

/** An ordered sequence (Manage → Understand → Act, Connect → Act, etc.). */
export function StepList({ steps, level = 3 }: Props) {
  const Heading = `h${level}` as 'h3' | 'h4';
  return (
    <ol className="steps">
      {steps.map((step) => (
        <li key={step.title} className="item">
          <Heading className="item__title">{step.title}</Heading>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
