import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { CatalogSearch } from '../components/CatalogSearch/CatalogSearch';
import { Specimen, StateMatrix, StoryPage, StorySection } from './StoryPage';

const meta = {
  title: 'Patterns',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
    <StoryPage kind="Product pattern" title="Catalog controls" description="Интеграционный паттерн текущего каталога: выбранный intent встроен в поиск, фото добавляется прямо в строку, а фильтры собраны в одну control-кнопку у списка мастеров.">
      <StorySection title="Composition"><CatalogControlsPreview /></StorySection>
      <StateMatrix coverage={{
        default: 'Contextual search + compact filter trigger',
        hover: 'Inherited from Catalog search and Catalog filters',
        focus: 'Keyboard path spans search, photo action and filters',
        active: 'Search photo panel and filter popover are independently expandable',
        selected: 'Selected haircut context and selected filter count',
        empty: 'Empty query remains actionable',
        overflow: 'Child patterns own token, query and option overflow',
        sizes: 'Responsive composition at the same Storybook path',
      }} />
    </StoryPage>
  ),
};
