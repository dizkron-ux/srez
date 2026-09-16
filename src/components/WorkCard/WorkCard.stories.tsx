import type { Meta, StoryObj } from '@storybook/react';
import { WorkCard } from './WorkCard';

const meta = {
  title: 'Components/Work card',
  component: WorkCard,
  parameters: { layout: 'centered' },
  args: {
    index: 0,
    ratio: 1,
    onOpen: () => {},
  },
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ratios: Story = {
  render: () => (
    <div style={{ width: 'min(900px, calc(100vw - 48px))', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, alignItems: 'start' }}>
      <WorkCard index={0} ratio={0.82} onOpen={() => {}} />
      <WorkCard index={1} ratio={1.08} onOpen={() => {}} />
      <WorkCard index={2} ratio={0.7} onOpen={() => {}} />
    </div>
  ),
};
