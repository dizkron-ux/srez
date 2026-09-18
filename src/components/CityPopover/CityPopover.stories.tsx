import type { Meta, StoryObj } from '@storybook/react-vite';
import { CityPopover } from './CityPopover';

const meta = {
  title: 'Components/City popover',
  component: CityPopover,
  args: { open: true, close: () => {}, save: () => {} },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 360, display: 'grid', placeItems: 'start center', paddingTop: 80 }}>
        <div className="srez-region-control"><Story /></div>
      </div>
    ),
  ],
} satisfies Meta<typeof CityPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
