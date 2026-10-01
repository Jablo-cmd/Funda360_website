/**
 * Marks content that must be supplied or confirmed before launch.
 * Search the codebase for <Placeholder> and "TODO(content)" to find them all.
 */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <p className="placeholder-note" data-placeholder="content">
      <strong>Content placeholder:</strong> {children}
    </p>
  );
}
