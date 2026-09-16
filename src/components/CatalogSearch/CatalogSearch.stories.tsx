import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { CatalogSearch } from './CatalogSearch';

const meta = {
  title: 'Patterns/Catalog search',
  component: CatalogSearch,
  parameters: { layout: 'centered' },
  args: {
    selectedLook: null,
    query: '',
    onQueryChange: () => {},
    onSubmit: () => {},
  },
} satisfies Meta<typeof CatalogSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchPreview({ selectedLook = null }: { selectedLook?: string | null }) {
  const [query, setQuery] = useState('');
  return (
    <div style={{ width: 'min(620px, calc(100vw - 48px))' }}>
      <CatalogSearch selectedLook={selectedLook} query={query} onQueryChange={setQuery} onSubmit={() => {}} />
    </div>
  );
}

export const Default: Story = {
  render: () => <SearchPreview />,
};

export const SelectedLook: Story = {
  render: () => <SearchPreview selectedLook="Mullet" />,
};

export const PhotoPanel: Story = {
  render: () => <SearchPreview selectedLook="Mullet" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Найти по фотографии' }));
  },
};
