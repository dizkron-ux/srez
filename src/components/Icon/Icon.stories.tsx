import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName } from './Icon';

const names: IconName[] = ['search','image','arrow-right','arrow-left','arrow-up-right','heart','heart-filled','close','chevron-down'];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  args: { name: 'search', size: 20 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {};
export const Heart: Story = { args: { name: 'heart' } };
export const Gallery: Story = {
  render: () => <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(110px,1fr))',gap:16,padding:24}}>{names.map(name => <div key={name} style={{display:'flex',alignItems:'center',gap:8,fontSize:12}}><Icon name={name} size={20}/><span>{name}</span></div>)}</div>,
};
