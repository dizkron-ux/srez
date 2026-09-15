import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SearchComposer } from './SearchComposer';

const meta = { title:'SREZ/SearchComposer', component:SearchComposer, args:{go:fn()}, decorators:[(Story) => <div style={{width:900,maxWidth:'94vw',padding:32}}><Story /></div>] } satisfies Meta<typeof SearchComposer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
