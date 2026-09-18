import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { CatalogSearch as CatalogSearchPattern } from './CatalogSearch';
import { Specimen, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Patterns',
  component: CatalogSearchPattern,
  parameters: { layout: 'fullscreen' },
  args: { query: '', onQueryChange: () => {} },
} satisfies Meta<typeof CatalogSearchPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchPreview({ selectedLook = null, initialQuery = '' }: { selectedLook?: string | null; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  return (
    <div className="srez-story-compact-frame">
      <CatalogSearchPattern selectedLook={selectedLook} query={query} onQueryChange={setQuery} onSubmit={() => {}} />
    </div>
  );
}

export const CatalogSearch: Story = {
  name: 'Catalog search',
  render: () => (
    <StoryPage kind="Product pattern" title="Catalog search" description="Контекстный поиск каталога объединяет query, выбранную стрижку и reference photo. Это product composition, а не универсальный Input.">
      <StorySection title="Search states">
        <div className="srez-story-card-column">
          <Specimen label="Default / empty query"><div data-testid="search-default"><SearchPreview /></div></Specimen>
          <Specimen label="Selected look"><div data-testid="search-selected"><SearchPreview selectedLook="Mullet" /></div></Specimen>
          <Specimen label="Long query / overflow"><SearchPreview selectedLook="Mullet" initialQuery="Текстурная стрижка на длинные волнистые волосы без сложной ежедневной укладки" /></Specimen>
          <Specimen label="Photo panel open"><div data-testid="search-photo"><SearchPreview selectedLook="Mullet" /></div></Specimen>
        </div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Empty-query specimen with rotating example',
        hover: 'Live hover on the image action and token close action',
        focus: 'Selected-look input is focused by the play function',
        active: 'Photo action exposes aria-expanded and an open panel',
        selected: 'Selected haircut token is embedded in the search',
        empty: 'Empty query is the default implemented state',
        overflow: 'Long query and selected token stress specimen',
        sizes: 'One responsive pattern; use the viewport toolbar',
      }} />
    </StoryPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const photoSpecimen = within(canvas.getByTestId('search-photo'));
    await userEvent.click(photoSpecimen.getByRole('button', { name: 'Найти по фотографии' }));
    const selectedSpecimen = within(canvas.getByTestId('search-selected'));
    selectedSpecimen.getByRole('textbox').focus();
  },
};
