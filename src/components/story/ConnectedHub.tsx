import { Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { AreaIcon } from '@/components/ui/AreaIcon';

type Node = { id: string; label: string; href: string; insight?: boolean };

type Props = {
  center: { title: string; note: string };
  /** Exactly eight nodes, laid out row by row around the centre on larger screens. */
  nodes: readonly Node[];
};

// Node centres in a 3×3 grid (percent), skipping the middle cell.
const POSITIONS = [
  [16.7, 16.7],
  [50, 16.7],
  [83.3, 16.7],
  [16.7, 50],
  [83.3, 50],
  [16.7, 83.3],
  [50, 83.3],
  [83.3, 83.3],
];

/**
 * "Connected platform" diagram: the learner record at the centre with the
 * school's working areas around it. A real list of links (screen readers get
 * a plain list); the connector lines are decorative.
 */
export function ConnectedHub({ center, nodes }: Props) {
  const before = nodes.slice(0, 4);
  const after = nodes.slice(4);
  const renderNode = (node: Node) => (
    <li key={node.label} className={`hub__node${node.insight ? ' hub__node--insight' : ''}`}>
      <AreaIcon id={node.id} />
      <Link href={node.href}>{node.label}</Link>
    </li>
  );

  return (
    <div className="hub-wrap">
      <svg className="hub__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {POSITIONS.slice(0, nodes.length).map(([x, y], i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke={nodes[i]?.insight ? '#5EC9B9' : 'currentColor'}
            strokeWidth="1.5"
            strokeDasharray={nodes[i]?.insight ? '4 4' : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <ul className="hub" aria-label="Areas connected to the learner record">
        {before.map(renderNode)}
        <li className="hub__node hub__center">
          <Fingerprint size={28} strokeWidth={1.5} aria-hidden="true" />
          <span>{center.title}</span>
          <small>{center.note}</small>
        </li>
        {after.map(renderNode)}
      </ul>
    </div>
  );
}
