import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Documentation',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const screenRows = [
  ['Home', 'default · focus · all looks · city modal'],
  ['Catalog', 'default · filters open · saved'],
  ['Master', 'default · saved'],
  ['Work', 'default'],
  ['Photo', 'before analysis · analyzed · analyzed without tags'],
  ['Favourites', 'empty · saved'],
];

const publicComponents = [
  'Button',
  'Header',
  'Filters',
  'Modal',
  'Look card',
  'Master card',
  'Evidence',
];

const productPatterns = [
  'Search composer',
  'Featured match',
];

export const Service: Story = {
  name: 'Service specification',
  render: () => (
    <div style={{ maxWidth: 940, margin: '0 auto', display: 'grid', gap: 42, lineHeight: 1.6 }}>
      <header>
        <div className="srez-eyebrow">DOCUMENTATION</div>
        <h1 style={{ margin: '8px 0 10px', fontFamily: 'var(--display)', fontSize: 50, fontWeight: 400, letterSpacing: '-.045em' }}>SREZ Storybook contract</h1>
        <p style={{ maxWidth: 760, margin: 0, color: 'var(--stone)', fontSize: 13 }}>Storybook — навигационная документация публичной UI-системы продукта, а не список всех технических fixtures. Visual regression и edge-case проверки остаются в CI и не должны засорять sidebar.</p>
      </header>

      <section>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 400, margin: '0 0 14px' }}>Navigation model</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '10px 18px', fontSize: 13 }}>
          <strong>Foundations</strong><span>Tokens, Icons</span>
          <strong>Components</strong><span>{publicComponents.join(' · ')}</span>
          <strong>Patterns</strong><span>{productPatterns.join(' · ')}</span>
          <strong>Screens</strong><span>Home · Catalog · Master · Work · Photo · Favourites</span>
          <strong>Documentation</strong><span>Service specification</span>
        </div>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 400, margin: '0 0 14px' }}>Screen state coverage</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <tbody>
            {screenRows.map(([screen, states]) => (
              <tr key={screen}>
                <th style={{ width: 180, padding: '12px 0', textAlign: 'left', borderBottom: '1px solid var(--line)' }}>{screen}</th>
                <td style={{ padding: '12px 0', color: 'var(--stone)', borderBottom: '1px solid var(--line)' }}>{states}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: 'var(--stone)', fontSize: 12, marginTop: 12 }}>У каждого экрана одна sidebar page. Состояние выбирается через Controls → preset. Responsive проверяется viewport toolbar и automated visual QA.</p>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 400, margin: '0 0 14px' }}>Curation rules</h2>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
          <li>Sidebar unit = public component, meaningful product pattern or screen.</li>
          <li>Variants, sizes, hover, focus, disabled and stress cases live inside one component page.</li>
          <li>Implementation helpers do not get a page unless they become a stable public UI primitive.</li>
          <li>Storybook and production import the same components; no Storybook-only copies.</li>
          <li>QA breadth belongs to automated rendered checks, not navigation clutter.</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 400, margin: '0 0 14px' }}>Known prototype gaps</h2>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
          <li>Search input is not connected to real filtering or ranking.</li>
          <li>Filter checkbox/reset actions do not update result data.</li>
          <li>Saved state is one global boolean and is not persisted.</li>
          <li>Master and Work use the first fixture instead of a selected entity id.</li>
          <li>Loading, network error, no-results, missing-evidence and media-error states are not implemented yet.</li>
          <li>City modal does not persist the entered city or implement focus trap/Escape rules.</li>
        </ul>
      </section>
    </div>
  ),
};
