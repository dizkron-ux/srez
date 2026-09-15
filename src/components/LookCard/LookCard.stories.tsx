import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { LOOKS } from '../../data/looks';
import { LookCard } from './LookCard';

const meta = { title:'SREZ/LookCard', component:LookCard, parameters:{layout:'centered'}, decorators:[(Story) => <div style={{width:280}}><Story /></div>], args:{look:LOOKS[0],index:0,onOpen:fn()} } satisfies Meta<typeof LookCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Mullet: Story = {};
export const ModCut: Story = { args:{look:LOOKS[1],index:1} };
