import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from 'storybook/test';
import { SearchComposer } from './SearchComposer';

const meta = {
  title: 'Components/SearchComposer',
  component: SearchComposer,
  args: { go: fn() },
  decorators: [(Story) => <div style={{width:900,maxWidth:'94vw',padding:32}}><Story /></div>],
} satisfies Meta<typeof SearchComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Focused: Story = { play: async ({canvasElement}) => { within(canvasElement).getByRole('textbox').focus(); } };
export const WithQuery: Story = { play: async ({canvasElement}) => { await userEvent.type(within(canvasElement).getByRole('textbox'), 'wolf cut'); } };
export const PhotoButtonHover: Story = { play: async ({canvasElement}) => { await userEvent.hover(within(canvasElement).getByRole('button',{name:/Есть фото/})); } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
