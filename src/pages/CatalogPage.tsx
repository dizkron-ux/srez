import { Button } from '../components/Button/Button';
import { ContextLine } from '../components/ContextLine/ContextLine';
import { Filters } from '../components/Filters/Filters';
import { Header } from '../components/Header/Header';
import { MasterCard } from '../components/MasterCard/MasterCard';
import { SearchComposer } from '../components/SearchComposer/SearchComposer';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; go: (screen: Screen) => void; onSave: () => void };

export function CatalogPage({ state, setState, go, onSave }: Props) {
  return (
    <div className="srez-app">
      <Header screen={state.screen} saved={state.saved} go={go} />
      <main className="srez-shell">
        <section className="srez-catalog-head"><ContextLine eyebrow="Вы ищете" onBack={() => go('Home')} /><h1>Mullet</h1><p className="srez-catalog-lead">Мастера с подтверждениями по выбранной форме и признакам.</p><SearchComposer go={go} /><div className="srez-active-filters"><button className="cosmos-chip">Mullet</button><button className="cosmos-chip">Волнистые</button><button className="cosmos-chip">Средняя длина</button></div></section>
        <div className="srez-result-bar"><div><span className="srez-eyebrow">Найдено</span><h2>3 мастера</h2><p>Только совпадения, которые можно объяснить через работы или профиль.</p></div><Button variant="secondary" onClick={() => setState(s => ({...s, filtersOpen:!s.filtersOpen}))}>{state.filtersOpen ? 'Скрыть фильтры' : 'Фильтры'}</Button></div>
        <div className="srez-catalog-layout"><Filters open={state.filtersOpen} /><section><div className="srez-master-grid">{MASTERS.map(master => <MasterCard master={master} saved={state.saved} onSave={onSave} go={go} key={master.name} />)}</div></section></div>
      </main>
    </div>
  );
}
