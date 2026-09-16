import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { CatalogSearch } from '../components/CatalogSearch/CatalogSearch';

const meta = {
  title: 'Patterns',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Page({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 28px 72px' }}>
      <div style={{ marginBottom: 34 }}>
        <div className="srez-eyebrow">PRODUCT PATTERN</div>
        <h1 style={{ margin: '8px 0 10px', fontFamily: 'var(--display)', fontSize: 48, fontWeight: 400, letterSpacing: '-.045em' }}>{title}</h1>
        <p style={{ maxWidth: 760, margin: 0, color: 'var(--stone)', fontSize: 13, lineHeight: 1.6 }}>{description}</p>
      </div>
      {children}
    </div>
  );
}

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <span style={{ color: 'var(--pebble)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</span>
      {children}
    </div>
  );
}

function CatalogControlsPreview() {
  const [query, setQuery] = useState('');
  return (
    <div style={{ display: 'grid', gap: 32 }}>
      <Specimen label="Focused contextual search + inline photo search">
        <div style={{ maxWidth: 620 }}>
          <CatalogSearch selectedLook="Mullet" query={query} onQueryChange={setQuery} />
        </div>
      </Specimen>
      <Specimen label="Single compact filter control">
        <div style={{ minHeight: 360, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <CatalogFilters initialOpen />
        </div>
      </Specimen>
    </div>
  );
}

export const CatalogControls: Story = {
  name: 'Catalog controls',
  render: () => (
    <Page title="Catalog controls" description="Интеграционный паттерн текущего каталога: выбранный intent встроен в поиск, фото добавляется прямо в строку, а фильтры собраны в одну control-кнопку у списка мастеров.">
      <CatalogControlsPreview />
    </Page>
  ),
};
