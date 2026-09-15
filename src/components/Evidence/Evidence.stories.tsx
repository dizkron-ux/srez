import type { Meta, StoryObj } from '@storybook/react';
import { MASTERS } from '../../data/masters';
import type { Master } from '../../types';
import { Evidence } from './Evidence';

const longMaster: Master = {
  ...MASTERS[0],
  proof: [
    ['Mullet — опубликованная работа', 'Подтверждение с длинным описанием источника, чтобы проверить перенос строк, высоту ряда и устойчивость сетки.'],
    ['Профиль', 'Указана работа с текстурными формами и средняя длина.'],
  ],
};

const meta = {
  title: 'Components/Evidence',
  component: Evidence,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{width:520,maxWidth:'92vw'}}><Story /></div>],
  args: { master: MASTERS[0] },
} satisfies Meta<typeof Evidence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Alternate: Story = { args: { master: MASTERS[1] } };
export const LongContent: Story = { args: { master: longMaster } };
