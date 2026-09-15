import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from 'storybook/test';
import { RegionSelector } from './RegionSelector';

const meta = {
  title: 'Components/RegionSelector',
  component: RegionSelector,
  parameters: { layout: 'centered' },
  args: { city: 'Москва', onClick: fn() },
} satisfies Meta<typeof RegionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Moscow: Story = {};
export const LongCity: Story = { args: { city: 'Нижний Новгород' } };
export const Hover: Story = { play: async ({canvasElement}) => { await userEvent.hover(within(canvasElement).getByRole('button')); } };
export const Focus: Story = { play: async ({canvasElement}) => { within(canvasElement).getByRole('button').focus(); } };
