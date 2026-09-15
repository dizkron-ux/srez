import { LOOKS } from '../data/looks';
import { Button } from '../components/Button/Button';
import { CityModal } from '../components/CityModal/CityModal';
import { FocusBlock } from '../components/FocusBlock/FocusBlock';
import { Header } from '../components/Header/Header';
import { LookCard } from '../components/LookCard/LookCard';
import { SearchComposer } from '../components/SearchComposer/SearchComposer';
import type { AppState, Screen } from '../types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  go: (screen: Screen) => void;
  toast: (message: string) => void;
};

export function HomePage({ state, setState, go, toast }: Props) {
  const visible = LOOKS.filter((_, i) => !(state.focus && i === 0));
  const shown = state.showAll ? visible : visible.slice(0,8);
  const onOpen = (index: number) => {
    if (index === 0) setState(s => ({ ...s, focus: !s.focus }));
    else toast('Для демо FocusBlock привязан к Mullet');
  };
  return (
    <div className="srez-app">
      <Header screen={state.screen} saved={state.saved} go={go} />
      <main className="srez-shell">
        <section className="srez-hero">
          <div className="srez-region"><span className="srez-region__label">Город</span><button className="srez-region__city" onClick={() => setState(s => ({...s, city:true}))}>Москва <span>⌄</span></button></div>
          <h1>Найди мастера<br/>под стрижку, которую хочешь</h1>
          <SearchComposer go={go} />
        </section>
        <section className="srez-section">
          <div className="srez-section-title"><div><span className="srez-eyebrow">Выбери результат</span><h2>Популярные стрижки</h2></div><p>Выбери форму — покажем мастеров, чья компетенция подтверждается работами или профилем.</p></div>
          {state.focus ? <FocusBlock go={go} /> : null}
          <div className="srez-look-wrap"><div className="cosmos-masonry srez-look-masonry">{shown.map(look => <LookCard look={look} index={LOOKS.indexOf(look)} onOpen={onOpen} key={look.id} />)}</div></div>
          <div className="srez-show-more"><Button variant="secondary" onClick={() => setState(s => ({...s, showAll:!s.showAll}))}>{state.showAll ? 'Показать меньше' : 'Показать ещё'}</Button></div>
        </section>
      </main>
      <CityModal open={state.city} close={() => setState(s => ({...s, city:false}))} save={() => { toast('Город сохранён для исследования'); setState(s => ({...s, city:false})); }} />
    </div>
  );
}
