import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MASTER_COLLECTIONS } from '../../data/masterCollections';
import { StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';
import { MasterCollectionCarousel as MasterCollectionCarouselPattern } from './MasterCollectionCarousel';

const meta = {
  title: 'Patterns',
  component: MasterCollectionCarouselPattern,
  parameters: { layout: 'fullscreen' },
  args: {
    collections: MASTER_COLLECTIONS,
    selectedLookId: null,
    onSelect: () => {},
  },
} satisfies Meta<typeof MasterCollectionCarouselPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveCarousel() {
  const [selectedLookId, setSelectedLookId] = useState<string | null>(null);

  return (
    <MasterCollectionCarouselPattern
      collections={MASTER_COLLECTIONS}
      selectedLookId={selectedLookId}
      onSelect={collection => setSelectedLookId(collection.lookId)}
    />
  );
}

export const MasterCollections: Story = {
  name: 'Master collections',
  render: () => (
    <StoryPage kind="Product pattern" title="Master collections" description="Горизонтальная подборка мастеров по типам стрижек: трёхкадровый preview, количество мастеров, drag/scroll, стрелки и выбранное состояние собраны в одном production-паттерне.">
      <StorySection title="Interactive carousel"><InteractiveCarousel /></StorySection>
      <StateMatrix coverage={{
        default: 'Haircut collections with three-image previews and master counts',
        hover: 'Preview lift, image zoom and edge-image separation',
        focus: 'Visible focus ring and the same visual preview response',
        selected: 'Selected haircut collection is exposed through aria-pressed',
        active: 'Pointer drag and previous/next controls move the track',
        overflow: 'Long Russian collection labels remain below the collage',
        sizes: 'Desktop arrows; native horizontal touch interaction on mobile',
      }} />
    </StoryPage>
  ),
};
