import type { Meta, StoryObj } from '@storybook/react';
import { Filters } from './Filters';

const meta = { title:'SREZ/Filters', component:Filters, parameters:{layout:'centered'}, decorators:[(Story) => <div style={{width:260}}><Story /></div>], args:{open:true} } satisfies Meta<typeof Filters>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Open: Story = {};
