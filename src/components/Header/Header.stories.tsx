import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  args: { screen: 'Home', saved: false, go: fn() },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HaircutsActive: Story = {};
export const MastersActive: Story = { args: { screen: 'Catalog' } };
export const FavouritesActive: Story = { args: { screen: 'Favourites' } };
export const WithSavedItem: Story = { args: { saved: true, screen: 'Favourites' } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
