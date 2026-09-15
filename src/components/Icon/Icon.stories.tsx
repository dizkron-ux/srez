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
  render: () => <div style={{width:'min(520px, calc(100vw - 32px))',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(96px,1fr))',gap:16}}>{names.map(name => <div key={name} style={{display:'flex',minWidth:0,alignItems:'center',gap:8,fontSize:12}}><Icon name={name} size={20}/><span style={{overflowWrap:'anywhere'}}>{name}</span></div>)}</div>,
};
