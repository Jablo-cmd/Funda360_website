import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

/**
 * Shared Open Graph / X card renderer (1200×630).
 *
 * Brand rules: navy ground, Funda360 mark, one concise title, one short line
 * of context. No claims, statistics, logos or people. Teal is used only as
 * the accent for intelligence pages.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const fontDir = join(process.cwd(), 'node_modules/@fontsource');
const fonts = [
  { name: 'Inter Tight', data: readFileSync(join(fontDir, 'inter-tight/files/inter-tight-latin-600-normal.woff')), weight: 600 as const, style: 'normal' as const },
  { name: 'Inter', data: readFileSync(join(fontDir, 'inter/files/inter-latin-400-normal.woff')), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: readFileSync(join(fontDir, 'inter/files/inter-latin-500-normal.woff')), weight: 500 as const, style: 'normal' as const },
];

export type OgInput = {
  /** Small label above the title, e.g. "Platform · Attendance". */
  eyebrow: string;
  /** The message: keep under ~70 characters. */
  title: string;
  /** One supporting line: keep under ~110 characters. */
  subtitle?: string;
  accent?: 'brand' | 'insight';
};

export function renderOgImage({ eyebrow, title, subtitle, accent = 'brand' }: OgInput) {
  const accentColor = accent === 'insight' ? '#14B8A6' : '#2563EB';
  const eyebrowColor = accent === 'insight' ? '#5EEAD4' : '#93C5FD';
  const titleSize = title.length > 52 ? 58 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#0B1F3A',
          backgroundImage: 'radial-gradient(circle at 88% 0%, rgba(37,99,235,0.34), rgba(11,31,58,0) 55%)',
          color: '#FFFFFF',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#2563EB" />
            <path d="M9 21.5V11.8c0-.66.54-1.2 1.2-1.2h8.6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M9.6 16.2h7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ display: 'flex', fontFamily: 'Inter Tight', fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em' }}>
            Funda<span style={{ color: '#60A5FA' }}>360</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: accentColor }} />
            <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: eyebrowColor }}>{eyebrow}</div>
          </div>
          <div style={{ fontFamily: 'Inter Tight', fontSize: titleSize, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.03em' }}>{title}</div>
          {subtitle ? <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.4, color: '#C7D2E0', maxWidth: 940 }}>{subtitle}</div> : null}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: '#C7D2E0' }}>
          <div style={{ display: 'flex' }}>Smarter Schools. Better Outcomes.</div>
          <div style={{ display: 'flex' }}>{siteConfig.allowIndexing ? new URL(siteConfig.url).host : 'Funda360'}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
