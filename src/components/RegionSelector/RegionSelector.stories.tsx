import type { Meta, StoryObj } from '@storybook/react';
import { RegionSelector } from './RegionSelector';

const meta = {
  title: 'Components/Region selector',
  component: RegionSelector,
  parameters: { layout: 'centered' },
  args: {
    city: 'Москва',
    onClick: () => {},
  },
} satisfies Meta<typeof RegionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongCity: Story = {
  args: { city: 'Санкт-Петербург' },
};
