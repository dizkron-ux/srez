import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from 'storybook/test';
import { CityModal } from './CityModal';

const meta = {
  title: 'Components/CityModal',
  component: CityModal,
  parameters: { layout: 'fullscreen' },
  args: { open: true, close: fn(), save: fn() },
} satisfies Meta<typeof CityModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const InputFocused: Story = { play: async ({canvasElement}) => { within(canvasElement).getByRole('textbox').focus(); } };
export const WithCity: Story = { play: async ({canvasElement}) => { await userEvent.type(within(canvasElement).getByRole('textbox'), 'Казань'); } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
