import type { Faq } from '@/content/types';
import { faqJsonLd } from '@/lib/seo';
import { JsonLd } from './JsonLd';
import { Section } from './Section';

type Props = { faqs: Faq[]; id?: string; heading?: string };

/** FAQ section using native disclosure widgets, plus FAQPage structured data. */
export function FaqSection({ faqs, id = 'faqs', heading = 'Frequently asked questions' }: Props) {
  if (faqs.length === 0) return null;
  return (
    <Section id={id} heading={heading}>
      <div className="faqs">
        {faqs.map((faq) => (
          <details key={faq.question} className="faq">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </Section>
  );
}
