import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { FocusBlock } from './FocusBlock';

const meta = {
  title: 'Components/FocusBlock',
  component: FocusBlock,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{width:'min(1100px, calc(100vw - 32px))'}}><Story /></div>],
  args: { go: fn() },
} satisfies Meta<typeof FocusBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
