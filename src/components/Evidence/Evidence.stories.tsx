import type { Meta, StoryObj } from '@storybook/react';
import { MASTERS } from '../../data/masters';
import { Evidence } from './Evidence';

const meta = { title:'SREZ/Evidence', component:Evidence, parameters:{layout:'centered'}, decorators:[(Story) => <div style={{width:520,maxWidth:'92vw'}}><Story /></div>], args:{master:MASTERS[0]} } satisfies Meta<typeof Evidence>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Alternate: Story = { args:{master:MASTERS[1]} };
