import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { CatalogFilterBar } from '../components/CatalogFilterBar/CatalogFilterBar';
import { CatalogSearch } from '../components/CatalogSearch/CatalogSearch';
import { FocusBlock } from '../components/FocusBlock/FocusBlock';
import { SearchComposer } from '../components/SearchComposer/SearchComposer';

const meta = {
  title: 'Patterns',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

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

export const Search: Story = {
  render: () => (
    <Page title="Search composer" description="Главный вход в intent expression: текстовый запрос + поиск по референсу. Default, filled и focus собраны в одной story.">
      <div style={{ display: 'grid', gap: 28 }}>
        <Specimen label="Default"><SearchComposer go={noop} /></Specimen>
        <Specimen label="Filled"><SearchComposer go={noop} /></Specimen>
        <Specimen label="Focus"><SearchComposer go={noop} /></Specimen>
      </div>
    </Page>
  ),
  play: async ({ canvasElement }) => {
    const inputs = within(canvasElement).getAllByRole('textbox');
    await userEvent.type(inputs[1], 'wolf cut');
    inputs[2].focus();
  },
};

function CatalogControlsPreview() {
  const [query, setQuery] = useState('');
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <Specimen label="Selected look integrated into search">
        <div style={{ maxWidth: 620 }}>
          <CatalogSearch selectedLook="Mullet" query={query} onQueryChange={setQuery} onPhoto={noop} />
        </div>
      </Specimen>
      <Specimen label="Dropdown filters">
        <CatalogFilterBar />
      </Specimen>
    </div>
  );
}

export const CatalogControls: Story = {
  name: 'Catalog controls',
  render: () => (
    <Page title="Catalog controls" description="Экспериментальный компактный паттерн каталога по мотивам Cosmos: выбранный визуальный intent встроен в строку поиска, фильтры вынесены наверх и раскрываются через dropdown. Color picker сознательно исключён.">
      <CatalogControlsPreview />
    </Page>
  ),
};

export const Focus: Story = {
  name: 'Featured match',
  render: () => (
    <Page title="Featured match" description="Композиционный паттерн Home: выбранный визуальный результат + подходящие мастера. Это product pattern, а не базовый primitive.">
      <div style={{ width: 'min(1100px, 100%)' }}><FocusBlock go={noop} /></div>
    </Page>
  ),
};
