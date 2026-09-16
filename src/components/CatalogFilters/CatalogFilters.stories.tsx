import type { Meta, StoryObj } from '@storybook/react';
import { CatalogFilters } from './CatalogFilters';

const meta = {
  title: 'Patterns/Catalog filters',
  component: CatalogFilters,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CatalogFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: { initialOpen: false },
};

export const Open: Story = {
  args: { initialOpen: true },
  parameters: { layout: 'fullscreen' },
  render: args => (
    <div style={{ minHeight: 560, padding: 40, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
      <CatalogFilters {...args} />
    </div>
  ),
};
