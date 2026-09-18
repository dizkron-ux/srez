import type { Meta, StoryObj } from '@storybook/react';
import { LookCard as LookCardComponent } from './LookCard';
import { LOOKS } from '../../data/looks';
import type { Look } from '../../types';
import { Specimen, SpecimenGrid, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Components',
  component: LookCardComponent,
  parameters: { layout: 'fullscreen' },
  args: { look: LOOKS[0], index: 0, onOpen: () => {} },
} satisfies Meta<typeof LookCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const longLook: Look = { ...LOOKS[0], name: 'Удлинённая текстурная стрижка с очень длинным названием' };

export const LookCard: Story = {
  name: 'Look card',
  render: () => (
    <StoryPage title="Look card" description="Карточка визуального результата/стрижки. Она остаётся отдельной от Master card и Work card: сущность, действие и контентный контракт различаются.">
      <StorySection title="Content variants" note="Hover и keyboard focus можно проверить прямо на каждом specimen.">
        <SpecimenGrid min={220}>
          {LOOKS.slice(0, 3).map((look, index) => <Specimen label={index === 0 ? 'Default' : `Fixture ${index + 1}`} key={look.id}><LookCardComponent look={look} index={index} onOpen={() => {}} /></Specimen>)}
          <Specimen label="Long label"><LookCardComponent look={longLook} index={3} onOpen={() => {}} /></Specimen>
        </SpecimenGrid>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Multiple real product fixtures',
        hover: 'Media lift, crop treatment and open affordance',
        focus: 'focus-within reveals the open affordance',
        active: 'Media and title are native button actions',
        overflow: 'Long Russian title stress specimen',
        sizes: 'Responsive masonry width; use the viewport toolbar',
      }} />
    </StoryPage>
  ),
};
