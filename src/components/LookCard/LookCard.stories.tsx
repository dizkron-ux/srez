import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from 'storybook/test';
import { LOOKS } from '../../data/looks';
import { LookCard } from './LookCard';

const meta = {
  title: 'Components/LookCard',
  component: LookCard,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{width:280}}><Story /></div>],
  args: { look: LOOKS[0], index: 0, onOpen: fn() },
} satisfies Meta<typeof LookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mullet: Story = {};
export const ModCut: Story = { args: { look: LOOKS[1], index: 1 } };
export const Hover: Story = { play: async ({canvasElement}) => { await userEvent.hover(within(canvasElement).getByRole('button',{name:/Открыть Mullet/})); } };
export const Focus: Story = { play: async ({canvasElement}) => { within(canvasElement).getByRole('button',{name:/Открыть Mullet/}).focus(); } };
