import type { Meta, StoryObj } from '@storybook/react';
import { WorkCard as WorkCardComponent } from './WorkCard';
import { Specimen, SpecimenGrid, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Components',
  component: WorkCardComponent,
  parameters: { layout: 'fullscreen' },
  args: { index: 0, ratio: 1, onOpen: () => {} },
} satisfies Meta<typeof WorkCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkCard: Story = {
  name: 'Work card',
  render: () => (
    <StoryPage title="Work card" description="Минимальная карточка portfolio work. Она не объединена с Look card: это доказательство работы мастера, а не результат для навигации по каталогу.">
      <StorySection title="Aspect variants">
        <SpecimenGrid min={200}>
          <Specimen label="Portrait"><WorkCardComponent index={0} ratio={0.7} onOpen={() => {}} /></Specimen>
          <Specimen label="Regular"><WorkCardComponent index={1} ratio={0.82} onOpen={() => {}} /></Specimen>
          <Specimen label="Landscape"><WorkCardComponent index={2} ratio={1.08} onOpen={() => {}} /></Specimen>
        </SpecimenGrid>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Regular portfolio fixture',
        hover: 'Lift and shadow on the work visual',
        focus: 'The visual is a keyboard-focusable button',
        active: 'Native pressed interaction',
        sizes: 'Portrait / regular / landscape content ratios',
      }} />
    </StoryPage>
  ),
};
