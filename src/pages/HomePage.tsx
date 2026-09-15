import { LOOKS } from '../data/looks';
import { Button } from '../components/Button/Button';
import { CityModal } from '../components/CityModal/CityModal';
import { Header } from '../components/Header/Header';
import { LookCard } from '../components/LookCard/LookCard';
import { RegionSelector } from '../components/RegionSelector/RegionSelector';
import type { AppState, Screen } from '../types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  go: (screen: Screen) => void;
  toast: (message: string) => void;
};

export function HomePage({ state, setState, go, toast }: Props) {
  const shown = state.showAll ? LOOKS : LOOKS.slice(0,8);
  const onOpen = (index: number) => {
    const look = LOOKS[index] ?? LOOKS[0];
    setState(current => ({ ...current, selectedLookId: look.id, focus: look.id === 'mullet', screen: 'Look' }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="srez-app">
      <Header screen={state.screen} saved={state.saved} go={go} />
      <main className="srez-shell">
        <section className="srez-hero">
          <RegionSelector city="Москва" onClick={() => setState(s => ({...s, city:true}))} />
          <h1>Найди мастера<br/>под стрижку, которую хочешь</h1>
        </section>
        <section className="srez-section">
          <div className="srez-section-title"><div><h2>Популярные стрижки</h2></div><p>Выбери форму — покажем мастеров, чья компетенция подтверждается работами или профилем.</p></div>
          <div className="srez-look-wrap"><div className="cosmos-masonry srez-look-masonry">{shown.map(look => <LookCard look={look} index={LOOKS.indexOf(look)} onOpen={onOpen} key={look.id} />)}</div></div>
          <div className="srez-show-more"><Button variant="secondary" onClick={() => setState(s => ({...s, showAll:!s.showAll}))}>{state.showAll ? 'Показать меньше' : 'Показать ещё'}</Button></div>
        </section>
      </main>
      <CityModal open={state.city} close={() => setState(s => ({...s, city:false}))} save={() => { toast('Город сохранён для исследования'); setState(s => ({...s, city:false})); }} />
    </div>
  );
}
