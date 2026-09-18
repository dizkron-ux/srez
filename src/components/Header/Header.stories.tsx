import type { Meta, StoryObj } from '@storybook/react';
import { Header as HeaderComponent } from './Header';
import { Specimen, StateMatrix, StoryPage, StorySection } from '../../storybook/StoryPage';

const meta = {
  title: 'Components',
  component: HeaderComponent,
  parameters: { layout: 'fullscreen' },
  args: { screen: 'Home', saved: false, go: () => {} },
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
const noop = () => {};

export const Header: Story = {
  render: () => (
    <StoryPage title="Header" description="Постоянная навигация продукта с контекстным поиском. Active section, selected look и saved count — состояния одного компонента, а не отдельные sidebar stories.">
      <StorySection title="Navigation states">
        <div className="srez-story-card-column">
          <Specimen label="Haircuts active"><div className="srez-story-frame"><HeaderComponent screen="Home" saved={false} go={noop} /></div></Specimen>
          <Specimen label="Masters active + selected look"><div className="srez-story-frame"><HeaderComponent screen="Catalog" saved={false} selectedLook="Mullet" go={noop} /></div></Specimen>
          <Specimen label="Favourites active + saved count"><div className="srez-story-frame"><HeaderComponent screen="Favourites" saved go={noop} /></div></Specimen>
        </div>
      </StorySection>

      <StateMatrix coverage={{
        default: 'Home / Haircuts active specimen',
        hover: 'Live hover on navigation and search actions',
        focus: 'Keyboard-focusable navigation, search input and actions',
        active: 'Current section uses aria-current and active styling',
        selected: 'Selected haircut is embedded in the search context',
        saved: 'Favourites count appears for the saved state',
        overflow: 'Search tokens ellipsize; responsive layout is exercised in the same page',
        sizes: 'One responsive component; use the viewport toolbar',
      }} />
    </StoryPage>
  ),
};
