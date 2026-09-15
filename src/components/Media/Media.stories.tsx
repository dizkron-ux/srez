import type { Meta, StoryObj } from '@storybook/react';
import { Media } from './Media';

const meta = {
  title: 'Components/Media',
  component: Media,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{width:360,maxWidth:'90vw'}}><Story /></div>],
  args: { index: 0 },
} satisfies Meta<typeof Media>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Square: Story = { args: { ratioOverride: 1 } };
export const Portrait: Story = { args: { ratioOverride: .72 } };
export const Landscape: Story = { args: { ratioOverride: 1.5 } };
