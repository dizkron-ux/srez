import type { Meta, StoryObj } from '@storybook/react';
import { LookMasterSelector } from './LookMasterSelector';
import { MASTERS } from '../../data/masters';

const meta = {
  title: 'Patterns/Look master selector',
  component: LookMasterSelector,
  parameters: { layout: 'centered' },
  args: {
    masters: MASTERS,
    onOpenMaster: () => {},
  },
} satisfies Meta<typeof LookMasterSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 'min(390px, calc(100vw - 48px))' }}>
      <LookMasterSelector masters={MASTERS} onOpenMaster={() => {}} />
    </div>
  ),
};
