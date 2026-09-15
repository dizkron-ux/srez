import type { Meta, StoryObj } from '@storybook/react';
import { Filters } from './Filters';

const meta = {
  title: 'Components/Filters',
  component: Filters,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{width:260,maxWidth:'92vw'}}><Story /></div>],
  args: { open: true },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const MobileOpen: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
export const MobileClosed: Story = { args: { open: false }, parameters: { viewport: { defaultViewport: 'mobile1' } } };
