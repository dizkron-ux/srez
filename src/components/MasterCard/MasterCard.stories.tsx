import type { Meta, StoryObj } from '@storybook/react';
import { MasterCard as MasterCardComponent } from './MasterCard';
import { MASTERS } from '../../data/masters';
import type { Master } from '../../types';
import { Specimen, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Components',
  component: MasterCardComponent,
  parameters: { layout: 'fullscreen' },
  args: { master: MASTERS[0], saved: false, onSave: () => {}, go: () => {} },
} satisfies Meta<typeof MasterCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
const noop = () => {};

const longMaster: Master = {
  ...MASTERS[0],
  name: 'Александр Константинопольский',
  place: 'Очень длинное название барбершопа · Большая Никитская улица, Москва',
};

export const MasterCard: Story = {
  name: 'Master card',
  render: () => (
    <StoryPage title="Master card" description="Карточка специалиста с collage, identity и save action. Saved и stress-content — состояния этой страницы, а не отдельные sidebar entries.">
      <StorySection title="State specimens">
        <div className="srez-story-card-column">
          <Specimen label="Default"><MasterCardComponent master={MASTERS[0]} saved={false} onSave={noop} go={noop} /></Specimen>
          <Specimen label="Saved"><MasterCardComponent master={MASTERS[1]} saved onSave={noop} go={noop} /></Specimen>
          <Specimen label="Long content"><MasterCardComponent master={longMaster} saved={false} onSave={noop} go={noop} /></Specimen>
        </div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Default fixture',
        hover: 'Card visual lift and save-action hover',
        focus: 'Visual, master name and save action are keyboard focusable',
        active: 'Card actions use native pressed interaction',
        saved: 'Shared SaveButton over the selected IconButton state',
        overflow: 'Long master name and workplace fixture',
        sizes: 'One responsive card; consumers control grid width',
      }} />
    </StoryPage>
  ),
};
