import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Documentation',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const screenRows = [
  ['Home', 'default · focus · all looks · city modal'],
  ['Haircut detail', 'mullet · wolf'],
  ['Catalog', 'default · mullet · filters open · saved'],
  ['Master', 'default · saved'],
  ['Work', 'default'],
  ['Photo', 'prototype-only · before analysis · analyzed · analyzed without tags'],
  ['Favourites', 'empty · saved'],
];

const publicComponents = [
  'Button',
  'Icon button',
  'Header',
  'Modal',
  'Look card',
  'Master card',
  'Work card',
];

const componentRows = [
  ['Button', 'primary · secondary · ghost · sm/md/lg · icon start/end', 'default · hover · focus · pressed · disabled · long label', 'Home · Look · Master · Work · Photo · Favourites · City modal · Catalog filters/search', 'Components / Button'],
  ['Icon button', 'surface · ghost · sm/md/lg · icon', 'default · hover · focus · pressed · disabled · selected/saved', 'Back · close · image upload · filters · share · SaveButton', 'Components / Icon button'],
  ['Header', 'Haircuts · Masters · Favourites · selected look', 'default · current section · saved count · responsive', 'All product screens', 'Components / Header'],
  ['Modal', 'City modal composition', 'open · empty input · focus · responsive', 'Home / RegionSelector', 'Components / Modal'],
  ['Look card', 'Product fixtures', 'default · hover · focus · long label · responsive', 'Home', 'Components / Look card'],
  ['Master card', 'Product fixtures', 'default · hover · focus · saved · long content · responsive', 'Catalog · Favourites', 'Components / Master card'],
  ['Work card', 'portrait · regular · landscape ratios', 'default · hover · focus · responsive', 'Master', 'Components / Work card'],
  ['Catalog search', 'empty · selected look · long query · photo panel', 'hover · focus · expanded · responsive', 'Header', 'Patterns / Catalog search'],
  ['Catalog filters', 'closed · open · grouped options', 'hover · focus · selected · reset/empty · responsive', 'Catalog', 'Patterns / Catalog filters'],
  ['Look master selector', 'default · long identity', 'hover · focus · selected · overflow · responsive', 'Haircut detail', 'Patterns / Look master selector'],
  ['Catalog controls', 'search + filters composition', 'child pattern states · responsive', 'Catalog', 'Patterns / Catalog controls'],
];

const internalRows = [
  ['SaveButton', 'Semantic favourite wrapper over IconButton; saved copy and aria-pressed belong to the product action.'],
  ['RegionSelector', 'Single-purpose Home helper; documented through Home and Modal instead of a public sidebar page.'],
  ['Media', 'Prototype placeholder implementation, not yet a stable real-media API.'],
  ['Pills / chips / tags', 'Work taxonomy labels and removable photo-analysis assumptions have different evidence/interaction semantics, so they are not merged by appearance alone.'],
];

const productPatterns = [
  'Catalog search',
  'Catalog filters',
  'Look master selector',
  'Catalog controls',
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
          <strong>Screens</strong><span>Home · Haircut detail · Catalog · Master · Work · Photo · Favourites</span>
          <strong>Documentation</strong><span>Service specification · Component inventory</span>
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
        <p style={{ color: 'var(--stone)', fontSize: 12, marginTop: 12 }}>У каждого экрана одна sidebar page. Состояние выбирается через Controls → preset. Responsive проверяется viewport toolbar и automated visual QA. Photo пока остаётся только прототипным сценарием Storybook и не маршрутизируется текущим App.</p>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 400, margin: '0 0 14px' }}>Curation rules</h2>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
          <li>Sidebar unit = public component, meaningful product pattern or screen.</li>
          <li>Variants, sizes, hover, focus, disabled and stress cases live inside one component page.</li>
          <li>Implementation helpers do not get a page unless they become a stable public UI primitive.</li>
          <li>Storybook and production import the same components; no Storybook-only copies.</li>
          <li>QA breadth belongs to automated rendered checks, not navigation clutter.</li>
          <li>Current rendered product is the source of truth during refactors; componentization must not redesign screens.</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 400, margin: '0 0 14px' }}>Known prototype gaps</h2>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
          <li>Search input is not connected to real filtering or ranking.</li>
          <li>Catalog filters do not update result data.</li>
          <li>Saved state is one global boolean and is not persisted.</li>
          <li>Master and Work use the first fixture instead of a selected entity id.</li>
          <li>Loading, network error, no-results, missing-evidence and media-error states are not implemented yet.</li>
          <li>City modal does not persist the entered city or implement a focus trap.</li>
          <li>Photo analysis screen is preserved as a prototype fixture but is not reachable in the current App.</li>
        </ul>
      </section>
    </div>
  ),
};

export const ComponentInventory: Story = {
  name: 'Component inventory',
  render: () => (
    <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 40, padding: '40px 24px 72px', lineHeight: 1.5 }}>
      <header>
        <div className="srez-eyebrow">DOCUMENTATION</div>
        <h1 style={{ margin: '8px 0 10px', fontFamily: 'var(--display)', fontSize: 50, fontWeight: 400, letterSpacing: '-.045em' }}>Component inventory</h1>
        <p style={{ maxWidth: 820, margin: 0, color: 'var(--stone)', fontSize: 13 }}>Публичный contract map: один компонент или product pattern — один Storybook path. Variants и states собраны внутри соответствующей страницы.</p>
      </header>

      <section>
        <div className="srez-story-table-wrap">
          <table className="srez-story-table" style={{ minWidth: 1040 }}>
            <thead><tr><th>Component</th><th>Variants</th><th>States</th><th>Consumers</th><th>Storybook path</th></tr></thead>
            <tbody>
              {componentRows.map(([component, variants, states, consumers, path]) => (
                <tr key={component}><th>{component}</th><td>{variants}</td><td>{states}</td><td>{consumers}</td><td><code>{path}</code></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: 30, fontWeight: 400, margin: '0 0 14px' }}>Internal coverage decisions</h2>
        <div className="srez-story-table-wrap">
          <table className="srez-story-table">
            <thead><tr><th>Internal unit</th><th>Why it has no public page</th></tr></thead>
            <tbody>{internalRows.map(([unit, reason]) => <tr key={unit}><th>{unit}</th><td>{reason}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  ),
};
