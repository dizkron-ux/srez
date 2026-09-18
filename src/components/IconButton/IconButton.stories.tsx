import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { IconButton as IconButtonComponent } from './IconButton';
import { Specimen, SpecimenGrid, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Components',
  component: IconButtonComponent,
  parameters: { layout: 'fullscreen' },
  args: { icon: 'share', 'aria-label': 'Action' },
} satisfies Meta<typeof IconButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

function SaveAction() {
  const [saved, setSaved] = useState(false);
  return (
    <IconButtonComponent
      icon={saved ? 'heart-filled' : 'heart'}
      aria-label={saved ? 'Удалить из избранного' : 'Добавить в избранное'}
      selected={saved}
      onClick={() => setSaved(value => !value)}
    />
  );
}

export const IconButton: Story = {
  name: 'Icon button',
  render: () => (
    <StoryPage title="Icon button" description="Единый icon-only control для back, close, photo upload, filters, share и save. Продуктовые обёртки могут добавлять семантику, но сохраняют общий icon / size / variant / state / accessible-label API.">
      <StorySection title="Product actions">
        <SpecimenGrid min={120}>
          <Specimen label="Back"><IconButtonComponent icon="arrow-left" aria-label="Назад" /></Specimen>
          <Specimen label="Close"><IconButtonComponent icon="close" aria-label="Закрыть" /></Specimen>
          <Specimen label="Image upload"><IconButtonComponent icon="image" aria-label="Найти по фотографии" variant="ghost" /></Specimen>
          <Specimen label="External / open"><IconButtonComponent icon="arrow-up-right" aria-label="Открыть" variant="ghost" /></Specimen>
          <Specimen label="Filters"><IconButtonComponent icon="sliders" aria-label="Фильтры" /></Specimen>
          <Specimen label="Share"><IconButtonComponent icon="share" aria-label="Поделиться" /></Specimen>
          <Specimen label="Favourite / save"><SaveAction /></Specimen>
        </SpecimenGrid>
      </StorySection>

      <StorySection title="Sizes and variants">
        <div className="srez-story-actions">
          <Specimen label="Small / ghost"><IconButtonComponent icon="close" aria-label="Закрыть" size="sm" variant="ghost" /></Specimen>
          <Specimen label="Regular / ghost"><IconButtonComponent icon="image" aria-label="Фото" size="md" variant="ghost" /></Specimen>
          <Specimen label="Large / surface"><IconButtonComponent icon="arrow-left" aria-label="Назад" size="lg" /></Specimen>
        </div>
      </StorySection>

      <StorySection title="Interaction states">
        <div className="srez-story-actions">
          <Specimen label="Default"><IconButtonComponent icon="share" aria-label="Default" /></Specimen>
          <Specimen label="Hover"><IconButtonComponent icon="share" aria-label="Hover" data-story-state="hover" /></Specimen>
          <Specimen label="Focus"><IconButtonComponent icon="share" aria-label="Focus" data-story-state="focus" /></Specimen>
          <Specimen label="Pressed"><IconButtonComponent icon="share" aria-label="Pressed" data-story-state="active" /></Specimen>
          <Specimen label="Selected / saved"><IconButtonComponent icon="heart-filled" aria-label="Saved" selected /></Specimen>
          <Specimen label="Disabled"><IconButtonComponent icon="share" aria-label="Disabled" disabled /></Specimen>
        </div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Surface and ghost variants',
        hover: 'Forced specimen plus live :hover',
        focus: 'Visible focus-ring specimen plus live keyboard focus',
        active: 'Pressed specimen and native :active',
        disabled: 'Native disabled attribute',
        selected: 'aria-pressed + selected visual treatment',
        saved: 'SaveButton uses the selected IconButton contract',
        sizes: 'sm / md / lg; local layout classes preserve existing product geometry',
      }} />
    </StoryPage>
  ),
};
