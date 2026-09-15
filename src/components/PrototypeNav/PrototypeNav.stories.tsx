import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { PrototypeNav } from './PrototypeNav';

const meta = {
  title: 'QA/PrototypeNav',
  component: PrototypeNav,
  parameters: { layout: 'fullscreen' },
  args: { screen: 'Home', go: fn() },
} satisfies Meta<typeof PrototypeNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {};
export const Catalog: Story = { args: { screen: 'Catalog' } };
export const Photo: Story = { args: { screen: 'Photo' } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
