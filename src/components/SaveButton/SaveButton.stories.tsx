import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SaveButton } from './SaveButton';

const meta = {
  title: 'Components/Save button',
  component: SaveButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SaveButton>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveSaveButton() {
  const [saved, setSaved] = useState(false);
  return <SaveButton saved={saved} onClick={() => setSaved(value => !value)} />;
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--pebble)' }}>INTERACTIVE</span>
        <InteractiveSaveButton />
      </div>
      <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--pebble)' }}>SAVED</span>
        <SaveButton saved onClick={() => {}} />
      </div>
      <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--pebble)' }}>DISABLED</span>
        <SaveButton saved={false} disabled onClick={() => {}} />
      </div>
    </div>
  ),
};
