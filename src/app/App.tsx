import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CatalogPage } from '../pages/CatalogPage';
import { FavouritesPage } from '../pages/FavouritesPage';
import { HaircutsPage } from '../pages/HaircutsPage';
import { HomePage } from '../pages/HomePage';
import { LookPage } from '../pages/LookPage';
import { MasterPage } from '../pages/MasterPage';
import { PhotoPage } from '../pages/PhotoPage';
import { WorkPage } from '../pages/WorkPage';
import { TooltipLayer } from '../components/TooltipLayer/TooltipLayer';
import type { AppState, Screen } from '../types';

const initialState: AppState = {
  screen: 'Home',
  focus: false,
  selectedLookId: null,
  selectedCollectionId: null,
  city: false,
  showAll: false,
  filtersOpen: false,
  photoAnalyzed: false,
  photoTags: ['Mullet', 'Волнистые', 'Средняя длина', 'Textured'],
  saved: false,
};

export function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [toastText, setToastText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
  }, []);

  const go = useCallback((screen: Screen) => {
    setState(s => ({ ...s, screen, ...(screen === 'Home' ? { selectedLookId: null, selectedCollectionId: null, focus: false } : {}) }));
    window.scrollTo(0,0);
  }, []);

  const toast = useCallback((message: string) => {
    setToastText(message);
    setToastVisible(true);
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimerRef.current = null;
    }, 1400);
  }, []);

  const onSave = useCallback(() => {
    const nextSaved = !state.saved;
    setState(s => ({...s, saved:nextSaved}));
    toast(nextSaved ? 'Добавлено в избранное' : 'Удалено из избранного');
  }, [state.saved, toast]);

  const page = useMemo(() => {
    switch(state.screen) {
      case 'Haircuts': return <HaircutsPage state={state} setState={setState} go={go} />;
      case 'Look': return <LookPage state={state} setState={setState} go={go} />;
      case 'Catalog': return <CatalogPage state={state} setState={setState} go={go} />;
      case 'Master': return <MasterPage state={state} go={go} onSave={onSave} toast={toast} />;
      case 'Work': return <WorkPage state={state} go={go} />;
      case 'Photo': return <PhotoPage state={state} setState={setState} go={go} />;
      case 'Favourites': return <FavouritesPage state={state} go={go} onSave={onSave} />;
      default: return <HomePage state={state} setState={setState} go={go} toast={toast} />;
    }
  }, [go, onSave, state, toast]);

  return <>{page}<TooltipLayer /><div className={`preview-toast ${toastVisible ? 'show' : ''}`} role="status" aria-live="polite" aria-atomic="true">{toastText}</div></>;
}
