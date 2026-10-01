type Props = {
  variant?: 'default' | 'inverse';
  /** Hide the wordmark (mark only). */
  markOnly?: boolean;
};

/**
 * Funda360 mark and wordmark, matching the identity used inside the Funda360
 * application (rounded tile with the "F" stroke; "360" in brand blue).
 * Decorative: callers provide the accessible name (e.g. "Funda360 home").
 */
export function Logo({ variant = 'default', markOnly = false }: Props) {
  return (
    <span className={`logo${variant === 'inverse' ? ' logo--inverse' : ''}`} aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" focusable="false">
        <rect width="32" height="32" rx="7" fill={variant === 'inverse' ? '#2563EB' : '#0B1F3A'} />
        <path d="M9 21.5V11.8c0-.66.54-1.2 1.2-1.2h8.6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M9.6 16.2h7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      {markOnly ? null : (
        <span>
          Funda<span className="logo__accent">360</span>
        </span>
      )}
    </span>
  );
}
