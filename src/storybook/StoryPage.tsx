import type { CSSProperties, ReactNode } from 'react';

export type StateKey =
  | 'default'
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'selected'
  | 'saved'
  | 'loading'
  | 'empty'
  | 'overflow'
  | 'sizes';

type Coverage = Partial<Record<StateKey, string>>;

const stateLabels: Array<[StateKey, string]> = [
  ['default', 'Default'],
  ['hover', 'Hover'],
  ['focus', 'Focus'],
  ['active', 'Active / pressed'],
  ['disabled', 'Disabled'],
  ['selected', 'Selected'],
  ['saved', 'Saved'],
  ['loading', 'Loading'],
  ['empty', 'Empty'],
  ['overflow', 'Long content / overflow'],
  ['sizes', 'Compact / regular / large'],
];

export function StoryPage({
  kind = 'Component',
  title,
  description,
  children,
}: {
  kind?: 'Component' | 'Product pattern';
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="srez-app srez-story-page">
      <header className="srez-story-page__header">
        <div className="srez-eyebrow">{kind}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <div className="srez-story-page__content">{children}</div>
    </div>
  );
}

export function StorySection({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="srez-story-section">
      <div className="srez-story-section__heading">
        <h2>{title}</h2>
        {note ? <span>{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

export function Specimen({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`srez-story-specimen ${className}`.trim()}>
      <span className="srez-story-specimen__label">{label}</span>
      {children}
    </div>
  );
}

export function SpecimenGrid({ children, min = 180 }: { children: ReactNode; min?: number }) {
  return <div className="srez-story-grid" style={{ '--story-grid-min': `${min}px` } as CSSProperties}>{children}</div>;
}

export function StateMatrix({ coverage }: { coverage: Coverage }) {
  return (
    <StorySection title="State matrix" note="Только состояния, существующие в текущем продукте; отсутствующие не выдумываются для Storybook.">
      <div className="srez-story-table-wrap">
        <table className="srez-story-table">
          <thead>
            <tr><th>State</th><th>Coverage</th></tr>
          </thead>
          <tbody>
            {stateLabels.map(([key, label]) => (
              <tr key={key}>
                <th>{label}</th>
                <td className={coverage[key] ? '' : 'is-muted'}>{coverage[key] ?? 'Not applicable / not implemented in the current product'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StorySection>
  );
}
