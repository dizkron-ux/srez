import type { Meta, StoryObj } from '@storybook/react';
import { CatalogFilters as CatalogFiltersPattern } from './CatalogFilters';
import { Specimen, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Patterns',
  component: CatalogFiltersPattern,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CatalogFiltersPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CatalogFilters: Story = {
  name: 'Catalog filters',
  render: () => (
    <StoryPage kind="Product pattern" title="Catalog filters" description="Фильтры сохраняют отдельные продуктовые оси — тип волос, длина, стиль и подтверждение. Варианты option не выносятся в самостоятельные stories.">
      <StorySection title="Closed and open">
        <div className="srez-story-card-column">
          <Specimen label="Closed / selected count"><div className="srez-story-actions"><CatalogFiltersPattern /></div></Specimen>
          <Specimen label="Open / selected options"><div className="srez-story-filter-stage"><CatalogFiltersPattern initialOpen /></div></Specimen>
        </div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Closed filter trigger with current selections',
        hover: 'Live hover on trigger, options, reset and done',
        focus: 'All filter actions are keyboard focusable',
        active: 'Open trigger uses aria-expanded; options use aria-pressed',
        selected: 'Current selected options and count are visible',
        empty: 'Reset provides the implemented zero-selection state',
        overflow: 'Options wrap by product taxonomy group',
        sizes: 'Popover becomes a bounded mobile panel at the same Storybook path',
      }} />
    </StoryPage>
  ),
};
