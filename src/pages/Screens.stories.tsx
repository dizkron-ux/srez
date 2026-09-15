import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CatalogPage } from './CatalogPage';
import { FavouritesPage } from './FavouritesPage';
import { HomePage } from './HomePage';
import { MasterPage } from './MasterPage';
import { PhotoPage } from './PhotoPage';
import { WorkPage } from './WorkPage';
import type { AppState, Screen } from '../types';

const base: AppState = { screen:'Home',focus:false,city:false,showAll:false,filtersOpen:false,photoAnalyzed:false,photoTags:['Mullet','Волнистые','Средняя длина','Textured'],saved:false };

function ScreenPreview({ screen }: { screen: Screen }) {
  const [state,setState] = useState<AppState>({...base,screen});
  const go = (next:Screen) => setState(s => ({...s,screen:next}));
  const onSave = () => setState(s => ({...s,saved:!s.saved}));
  switch(screen){
    case 'Catalog': return <CatalogPage state={state} setState={setState} go={go} onSave={onSave}/>;
    case 'Master': return <MasterPage state={state} go={go} onSave={onSave}/>;
    case 'Work': return <WorkPage state={state} go={go}/>;
    case 'Photo': return <PhotoPage state={state} setState={setState} go={go}/>;
    case 'Favourites': return <FavouritesPage state={state} go={go} onSave={onSave}/>;
    default: return <HomePage state={state} setState={setState} go={go} toast={()=>{}}/>;
  }
}

const meta = { title:'SREZ/Screens', component:ScreenPreview, parameters:{layout:'fullscreen'} } satisfies Meta<typeof ScreenPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Home: Story = { args:{screen:'Home'} };
export const Catalog: Story = { args:{screen:'Catalog'} };
export const Master: Story = { args:{screen:'Master'} };
export const Work: Story = { args:{screen:'Work'} };
export const Photo: Story = { args:{screen:'Photo'} };
export const Favourites: Story = { args:{screen:'Favourites'} };
