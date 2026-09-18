import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CatalogPage } from './CatalogPage';
import { FavouritesPage } from './FavouritesPage';
import { HaircutsPage } from './HaircutsPage';
import { HomePage } from './HomePage';
import { LookPage } from './LookPage';
import { MasterPage } from './MasterPage';
import { PhotoPage } from './PhotoPage';
import { WorkPage } from './WorkPage';
import type { AppState, Screen } from '../types';

type ScreenStoryArgs = {
  preset: string;
};

const meta = {
  title: 'Screens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta<ScreenStoryArgs>;

export default meta;
type Story = StoryObj<ScreenStoryArgs>;

const base: AppState = {
  screen: 'Home',
  focus: false,
  selectedLookId: null,
  city: false,
  showAll: false,
  filtersOpen: false,
  photoAnalyzed: false,
  photoTags: ['Mullet', 'Волнистые', 'Средняя длина', 'Textured'],
  saved: false,
};

function stateFor(screen: Screen, preset: string): AppState {
  const state: AppState = { ...base, screen };

  if (screen === 'Home') {
    if (preset === 'focus') {
      state.focus = true;
      state.selectedLookId = 'mullet';
    }
    if (preset === 'all-looks') state.showAll = true;
    if (preset === 'city-popover') state.city = true;
  }

  if (screen === 'Look') state.selectedLookId = preset === 'wolf' ? 'wolf' : 'mullet';

  if (screen === 'Catalog') {
    if (preset === 'filters-open') state.filtersOpen = true;
    if (preset === 'mullet') state.selectedLookId = 'mullet';
  }

  if (screen === 'Master' && preset === 'saved') state.saved = true;

  if (screen === 'Photo') {
    if (preset === 'analyzed' || preset === 'analyzed-no-tags') state.photoAnalyzed = true;
    if (preset === 'analyzed-no-tags') state.photoTags = [];
  }

  if (screen === 'Favourites' && preset === 'saved') state.saved = true;

  return state;
}

function StatefulScreen({ initial }: { initial: AppState }) {
  const [state, setState] = useState<AppState>(initial);
  const go = (next: Screen) => setState(current => ({ ...current, screen: next }));
  const onSave = () => setState(current => ({ ...current, saved: !current.saved }));

  switch (state.screen) {
    case 'Haircuts':
      return <HaircutsPage state={state} setState={setState} go={go} />;
    case 'Look':
      return <LookPage state={state} go={go} />;
    case 'Catalog':
      return <CatalogPage state={state} setState={setState} go={go} />;
    case 'Master':
      return <MasterPage state={state} go={go} onSave={onSave} />;
    case 'Work':
      return <WorkPage state={state} go={go} />;
    case 'Photo':
      return <PhotoPage state={state} setState={setState} go={go} />;
    case 'Favourites':
      return <FavouritesPage state={state} go={go} onSave={onSave} />;
    default:
      return <HomePage state={state} setState={setState} go={go} toast={() => {}} />;
  }
}

function ScreenPreview({ screen, preset }: { screen: Screen; preset: string }) {
  return <StatefulScreen key={`${screen}-${preset}`} initial={stateFor(screen, preset)} />;
}

export const Home: Story = {
  args: { preset: 'default' },
  argTypes: {
    preset: {
      control: 'select',
      options: ['default', 'focus', 'all-looks', 'city-popover'],
      description: 'State preset',
    },
  },
  render: ({ preset }) => <ScreenPreview screen="Home" preset={preset} />,
};

export const Look: Story = {
  name: 'Haircut detail',
  args: { preset: 'mullet' },
  argTypes: {
    preset: {
      control: 'select',
      options: ['mullet', 'wolf'],
      description: 'Haircut preset',
    },
  },
  render: ({ preset }) => <ScreenPreview screen="Look" preset={preset} />,
};

export const Catalog: Story = {
  args: { preset: 'default' },
  argTypes: {
    preset: {
      control: 'select',
      options: ['default', 'mullet', 'filters-open'],
      description: 'State preset',
    },
  },
  render: ({ preset }) => <ScreenPreview screen="Catalog" preset={preset} />,
};

export const Master: Story = {
  args: { preset: 'default' },
  argTypes: {
    preset: {
      control: 'select',
      options: ['default', 'saved'],
      description: 'State preset',
    },
  },
  render: ({ preset }) => <ScreenPreview screen="Master" preset={preset} />,
};

export const Work: Story = {
  args: { preset: 'default' },
  argTypes: {
    preset: { table: { disable: true } },
  },
  render: () => <ScreenPreview screen="Work" preset="default" />,
};

export const Photo: Story = {
  args: { preset: 'default' },
  argTypes: {
    preset: {
      control: 'select',
      options: ['default', 'analyzed', 'analyzed-no-tags'],
      description: 'State preset',
    },
  },
  render: ({ preset }) => <ScreenPreview screen="Photo" preset={preset} />,
};

export const Favourites: Story = {
  args: { preset: 'default' },
  argTypes: {
    preset: {
      control: 'select',
      options: ['default', 'saved'],
      description: 'State preset',
    },
  },
  render: ({ preset }) => <ScreenPreview screen="Favourites" preset={preset} />,
};
