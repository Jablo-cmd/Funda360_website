import Link from 'next/link';
import { platformAreas, platformGroups } from '@/content/platform';
import { AreaIcon } from '@/components/ui/AreaIcon';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';

/**
 * The twelve capability areas as four connected clusters rather than a flat
 * grid. Each row links to its detail page (or its section on /platform).
 */
export function CapabilityGroups({ level = 3 }: { level?: 3 }) {
  const GroupHeading = `h${level}` as 'h3';
  const RowHeading = `h${level + 1}` as 'h4';
  return (
    <div className="cap-groups">
      {platformGroups.map((group) => (
        <section key={group.id} className="cap-group" data-group={group.id} aria-labelledby={`group-${group.id}`}>
          <header className="cap-group__head">
            <span className="cap-group__step">{group.step}</span>
            <GroupHeading id={`group-${group.id}`}>{group.title}</GroupHeading>
            <p className="cap-group__intro">{group.intro}</p>
          </header>
          <ul className="cap-list">
            {group.areaIds.map((areaId) => {
              const area = platformAreas.find((a) => a.id === areaId);
              if (!area) return null;
              return (
                <li key={area.id} className="cap-row">
                  <span className="cap-row__icon">
                    <AreaIcon id={area.id} size={18} />
                  </span>
                  <RowHeading className="cap-row__title">
                    <Link href={area.href ?? `/platform#${area.id}`}>{area.title}</Link>
                    <AvailabilityBadge availability={area.availability} />
                  </RowHeading>
                  <p>{area.summary}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
