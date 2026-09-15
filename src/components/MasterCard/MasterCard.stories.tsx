import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MASTERS } from '../../data/masters';
import { MasterCard } from './MasterCard';

const meta = {
  title: 'SREZ/MasterCard',
  component: MasterCard,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 620, maxWidth: '92vw' }}><Story /></div>],
  args: { master: MASTERS[0], saved: false, onSave: fn(), go: fn() },
} satisfies Meta<typeof MasterCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Saved: Story = { args: { saved: true } };
export const AlternateMaster: Story = { args: { master: MASTERS[1] } };
