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

type PreviewProps = { screen: Screen; initial?: Partial<AppState> };

function ScreenPreview({ screen, initial = {} }: PreviewProps) {
  const [state,setState] = useState<AppState>(() => ({...base,...initial,screen}));
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

const meta = { title:'Screens/Service', component:ScreenPreview, parameters:{layout:'fullscreen'} } satisfies Meta<typeof ScreenPreview>;
export default meta;
type Story = StoryObj<typeof meta>;

export const HomeDefault: Story = { name:'Home / Default', args:{screen:'Home'} };
export const HomeFocusSelected: Story = { name:'Home / Focus selected', args:{screen:'Home',initial:{focus:true}} };
export const HomeAllLooks: Story = { name:'Home / All looks', args:{screen:'Home',initial:{showAll:true}} };
export const HomeCityModal: Story = { name:'Home / City modal', args:{screen:'Home',initial:{city:true}} };
export const CatalogDefault: Story = { name:'Catalog / Default', args:{screen:'Catalog'} };
export const CatalogFiltersOpen: Story = { name:'Catalog / Filters open', args:{screen:'Catalog',initial:{filtersOpen:true}} };
export const CatalogSaved: Story = { name:'Catalog / Saved', args:{screen:'Catalog',initial:{saved:true}} };
export const MasterDefault: Story = { name:'Master / Default', args:{screen:'Master'} };
export const MasterSaved: Story = { name:'Master / Saved', args:{screen:'Master',initial:{saved:true}} };
export const WorkDefault: Story = { name:'Work / Default', args:{screen:'Work'} };
export const PhotoEmpty: Story = { name:'Photo / Before analysis', args:{screen:'Photo'} };
export const PhotoAnalyzed: Story = { name:'Photo / Analyzed', args:{screen:'Photo',initial:{photoAnalyzed:true}} };
export const PhotoAnalyzedNoTags: Story = { name:'Photo / Analyzed without tags', args:{screen:'Photo',initial:{photoAnalyzed:true,photoTags:[]}} };
export const FavouritesEmpty: Story = { name:'Favourites / Empty', args:{screen:'Favourites'} };
export const FavouritesSaved: Story = { name:'Favourites / Saved', args:{screen:'Favourites',initial:{saved:true}} };
export const MobileHome: Story = { name:'Responsive / Mobile Home', args:{screen:'Home'}, parameters:{viewport:{defaultViewport:'mobile1'}} };
export const MobileCatalog: Story = { name:'Responsive / Mobile Catalog + filters', args:{screen:'Catalog',initial:{filtersOpen:true}}, parameters:{viewport:{defaultViewport:'mobile1'}} };
export const MobileMaster: Story = { name:'Responsive / Mobile Master', args:{screen:'Master'}, parameters:{viewport:{defaultViewport:'mobile1'}} };
export const MobilePhoto: Story = { name:'Responsive / Mobile Photo analyzed', args:{screen:'Photo',initial:{photoAnalyzed:true}}, parameters:{viewport:{defaultViewport:'mobile1'}} };
