import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from 'storybook/test';
import { MASTERS } from '../../data/masters';
import type { Master } from '../../types';
import { MasterCard } from './MasterCard';

const longMaster: Master = {
  ...MASTERS[0],
  name: 'Александр Константинопольский',
  place: 'Очень длинное название барбершопа · Большая Никитская улица, Москва',
  proof: [['Mullet — опубликованная работа','Длинное описание подтверждения, которое должно переноситься без поломки сетки.'], ...MASTERS[0].proof],
};

const meta = {
  title: 'Components/MasterCard',
  component: MasterCard,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 620, maxWidth: '92vw' }}><Story /></div>],
  args: { master: MASTERS[0], saved: false, onSave: fn(), go: fn() },
} satisfies Meta<typeof MasterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Saved: Story = { args: { saved: true } };
export const AlternateMaster: Story = { args: { master: MASTERS[1] } };
export const LongContent: Story = { args: { master: longMaster } };
export const MediaHover: Story = { play: async ({canvasElement}) => { await userEvent.hover(within(canvasElement).getByRole('button',{name:/Открыть работу мастера/})); } };
export const SaveFocus: Story = { play: async ({canvasElement}) => { within(canvasElement).getByRole('button',{name:/Save/}).focus(); } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } };
