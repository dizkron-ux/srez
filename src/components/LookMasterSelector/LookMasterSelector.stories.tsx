import type { Meta, StoryObj } from '@storybook/react';
import { LookMasterSelector as LookMasterSelectorPattern } from './LookMasterSelector';
import { MASTERS } from '../../data/masters';
import type { Master } from '../../types';
import { Specimen, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Patterns',
  component: LookMasterSelectorPattern,
  parameters: { layout: 'fullscreen' },
  args: { masters: MASTERS, onOpenMaster: () => {} },
} satisfies Meta<typeof LookMasterSelectorPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

const longMaster: Master = {
  ...MASTERS[0],
  name: 'Александр Константинопольский',
  place: 'Очень длинное название барбершопа · Большая Никитская улица, Москва',
};

export const LookMasterSelector: Story = {
  name: 'Look master selector',
  render: () => (
    <StoryPage kind="Product pattern" title="Look master selector" description="Составной выбор мастера внутри haircut detail: identity, workplace, selected row и portfolio preview образуют одну продуктовую конструкцию.">
      <StorySection title="Selection and content">
        <div className="srez-story-card-column">
          <Specimen label="Default / first selected"><div style={{ width: 'min(390px, 100%)' }}><LookMasterSelectorPattern masters={MASTERS} onOpenMaster={() => {}} /></div></Specimen>
          <Specimen label="Long master content"><div style={{ width: 'min(390px, 100%)' }}><LookMasterSelectorPattern masters={[longMaster, ...MASTERS.slice(1)]} onOpenMaster={() => {}} /></div></Specimen>
        </div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'First product fixture selected',
        hover: 'Hover changes the active master and reveals portfolio preview',
        focus: 'Focus changes selection and exposes the same preview',
        active: 'Selected row uses the shared active treatment',
        selected: 'One active master at a time',
        overflow: 'Long identity and workplace stress fixture with ellipsis',
        sizes: 'Portfolio preview hides at the existing narrow breakpoint',
      }} />
    </StoryPage>
  ),
};
