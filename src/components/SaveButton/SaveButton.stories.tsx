import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from 'storybook/test';
import { SaveButton } from './SaveButton';

const meta = {
  title: 'Components/SaveButton',
  component: SaveButton,
  parameters: { layout: 'centered' },
  args: { saved: false, onClick: fn() },
} satisfies Meta<typeof SaveButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Saved: Story = { args: { saved: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Hover: Story = { play: async ({canvasElement}) => { await userEvent.hover(within(canvasElement).getByRole('button')); } };
export const Focus: Story = { play: async ({canvasElement}) => { within(canvasElement).getByRole('button').focus(); } };
