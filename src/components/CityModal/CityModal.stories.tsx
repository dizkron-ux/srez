import type { Meta, StoryObj } from '@storybook/react';
import { CityModal } from './CityModal';
import { StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Components',
  component: CityModal,
  parameters: { layout: 'fullscreen' },
  args: { open: true, close: () => {}, save: () => {} },
} satisfies Meta<typeof CityModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  render: () => (
    <StoryPage title="Modal" description="Текущая публичная modal composition — выбор другого города. Storybook документирует реализованный сценарий и не превращает его в вымышленный универсальный dialog API.">
      <StorySection title="Open state" note="Поле, close и CTA интерактивны; отправка в specimen не меняет данные.">
        <div className="srez-story-modal"><CityModal open close={() => {}} save={() => {}} /></div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Open city modal specimen',
        hover: 'Live hover on close and submit actions',
        focus: 'Input and actions expose the product focus ring',
        active: 'Close and submit use native pressed interaction',
        empty: 'Empty input is the initial implemented state',
        overflow: 'Russian heading and placeholder are exercised at narrow viewports',
        sizes: 'One responsive modal composition',
      }} />
    </StoryPage>
  ),
};
