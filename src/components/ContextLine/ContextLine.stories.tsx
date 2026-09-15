import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ContextLine } from './ContextLine';

const meta = {
  title: 'Components/ContextLine',
  component: ContextLine,
  parameters: { layout: 'centered' },
  args: { eyebrow: 'ПОИСК ПО РЕФЕРЕНСУ', onBack: fn() },
} satisfies Meta<typeof ContextLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const BackOnly: Story = { args: { eyebrow: undefined } };
export const BackToResults: Story = { args: { eyebrow: undefined, backLabel: 'Назад к результатам' } };
export const LongEyebrow: Story = { args: { eyebrow: 'ДЛИННЫЙ КОНТЕКСТНЫЙ ЛЕЙБЛ ДЛЯ ПРОВЕРКИ ПЕРЕНОСА' } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
