import type { Meta, StoryObj } from '@storybook/react';
import { Button as ButtonComponent } from './Button';
import { Specimen, SpecimenGrid, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Components',
  component: ButtonComponent,
  parameters: { layout: 'fullscreen' },
  args: { children: 'Button' },
} satisfies Meta<typeof ButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  render: () => (
    <StoryPage title="Button" description="Общий action-компонент для CTA и обычных действий. Вариант, размер, иконка и нативные button-атрибуты образуют один предсказуемый API.">
      <StorySection title="Variants">
        <div className="srez-story-actions">
          <ButtonComponent>Primary</ButtonComponent>
          <ButtonComponent variant="secondary">Secondary</ButtonComponent>
          <ButtonComponent variant="ghost">Ghost</ButtonComponent>
        </div>
      </StorySection>

      <StorySection title="Sizes">
        <div className="srez-story-actions">
          <ButtonComponent size="sm">Small</ButtonComponent>
          <ButtonComponent size="md">Regular</ButtonComponent>
          <ButtonComponent size="lg">Large</ButtonComponent>
        </div>
      </StorySection>

      <StorySection title="Content">
        <SpecimenGrid min={240}>
          <Specimen label="Icon + text"><ButtonComponent icon="arrow-right" iconPosition="end">Открыть мастера</ButtonComponent></Specimen>
          <Specimen label="Long label"><ButtonComponent variant="secondary">Показать мастеров с подтверждёнными работами</ButtonComponent></Specimen>
        </SpecimenGrid>
      </StorySection>

      <StorySection title="Interaction states">
        <div className="srez-story-actions">
          <Specimen label="Default"><ButtonComponent>Default</ButtonComponent></Specimen>
          <Specimen label="Hover"><ButtonComponent data-story-state="hover">Hover</ButtonComponent></Specimen>
          <Specimen label="Focus"><ButtonComponent data-story-state="focus">Focus</ButtonComponent></Specimen>
          <Specimen label="Pressed"><ButtonComponent data-story-state="active">Pressed</ButtonComponent></Specimen>
          <Specimen label="Disabled"><ButtonComponent disabled>Disabled</ButtonComponent></Specimen>
        </div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Primary, secondary and ghost specimens',
        hover: 'Forced specimen plus live :hover',
        focus: 'Visible focus-ring specimen plus live keyboard focus',
        active: 'Pressed transform specimen plus live :active',
        disabled: 'Native disabled attribute and shared disabled styling',
        overflow: 'Long-label stress specimen; product buttons stay on one line',
        sizes: 'sm / md / lg',
      }} />
    </StoryPage>
  ),
};
