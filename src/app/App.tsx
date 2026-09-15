import { useMemo, useState } from 'react';
import { PrototypeNav } from '../components/PrototypeNav/PrototypeNav';
import { CatalogPage } from '../pages/CatalogPage';
import { FavouritesPage } from '../pages/FavouritesPage';
import { HomePage } from '../pages/HomePage';
import { MasterPage } from '../pages/MasterPage';
import { PhotoPage } from '../pages/PhotoPage';
import { WorkPage } from '../pages/WorkPage';
import type { AppState, Screen } from '../types';

const initialState: AppState = {
  screen:'Home', focus:false, city:false, showAll:false, filtersOpen:false,
  photoAnalyzed:false, photoTags:['Mullet','Волнистые','Средняя длина','Textured'], saved:false,
};

export function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [toastText, setToastText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const go = (screen: Screen) => {
    setState(s => ({ ...s, screen }));
    window.scrollTo(0,0);
  };

  const toast = (message: string) => {
    setToastText(message);
    setToastVisible(true);
    window.clearTimeout((window as typeof window & { __srezToast?: number }).__srezToast);
    (window as typeof window & { __srezToast?: number }).__srezToast = window.setTimeout(() => setToastVisible(false), 1400);
  };

  const onSave = () => {
    setState(s => ({...s, saved:!s.saved}));
    toast(state.saved ? 'Удалено из избранного' : 'Добавлено в избранное');
  };

  const page = useMemo(() => {
    switch(state.screen) {
      case 'Catalog': return <CatalogPage state={state} setState={setState} go={go} onSave={onSave} />;
      case 'Master': return <MasterPage state={state} go={go} onSave={onSave} />;
      case 'Work': return <WorkPage state={state} go={go} />;
      case 'Photo': return <PhotoPage state={state} setState={setState} go={go} />;
      case 'Favourites': return <FavouritesPage state={state} go={go} onSave={onSave} />;
      default: return <HomePage state={state} setState={setState} go={go} toast={toast} />;
    }
  }, [state]);

  return <>{page}<PrototypeNav screen={state.screen} go={go} /><div className={`preview-toast ${toastVisible ? 'show' : ''}`}>{toastText}</div></>;
}
