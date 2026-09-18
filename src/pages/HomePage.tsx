import { useState } from 'react';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import { Button } from '../components/Button/Button';
import { CityPopover } from '../components/CityPopover/CityPopover';
import { CatalogSearch } from '../components/CatalogSearch/CatalogSearch';
import { Header } from '../components/Header/Header';
import { LookCard } from '../components/LookCard/LookCard';
import { MasterCard } from '../components/MasterCard/MasterCard';
import { MasterPortfolioPreview } from '../components/MasterPortfolioPreview/MasterPortfolioPreview';
import { RegionSelector } from '../components/RegionSelector/RegionSelector';
import type { AppState, Screen } from '../types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  go: (screen: Screen) => void;
  toast: (message: string) => void;
  onSave?: () => void;
};

export function HomePage({ state, setState, go, toast, onSave = () => {} }: Props) {
  const [query, setQuery] = useState('');
  const shown = LOOKS.slice(0,4);
  const submitSearch = () => {
    go('Catalog');
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };
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
          <div className="srez-region-control">
            <RegionSelector
              city="Москва"
              open={state.city}
              onClick={() => setState(s => ({ ...s, city: !s.city }))}
            />
            <CityPopover
              open={state.city}
              close={() => setState(s => ({ ...s, city: false }))}
              save={() => {
                toast('Город сохранён для исследования');
                setState(s => ({ ...s, city: false }));
              }}
            />
          </div>
          <h1>Найди своего барбера на SREZ</h1>
          <div className="srez-hero-search">
            <CatalogSearch query={query} onQueryChange={setQuery} onSubmit={submitSearch} />
          </div>
          <div className="srez-hero-proof" aria-label="Более 500 специалистов на площадке">
            <div className="srez-hero-proof__avatars">
              {MASTERS.slice(0, 3).map((master, index) => (
                <div className="srez-hero-proof__avatar-wrap" key={master.name}>
                  <button
                    type="button"
                    className={`srez-hero-proof__avatar srez-hero-proof__avatar--${['one', 'two', 'three'][index]}`}
                    aria-label={`Показать работы мастера ${master.name}`}
                    onClick={() => go('Master')}
                  >
                    {master.name.slice(0, 1)}
                  </button>
                  <MasterPortfolioPreview master={master} className="srez-hero-proof__portfolio" />
                </div>
              ))}
            </div>
            <span className="srez-hero-proof__label">500+ специалистов на площадке</span>
          </div>
        </section>
        <section className="srez-section srez-home-masters">
          <div className="srez-section-title"><div><h2>Популярные мастера</h2></div><Button variant="secondary" onClick={() => go('Catalog')}>Посмотреть все</Button></div>
          <div className="srez-master-grid srez-home-masters__grid">
            {MASTERS.slice(0, 3).map(master => <MasterCard master={master} saved={state.saved} onSave={onSave} go={go} mediaMode="photo" key={master.name} />)}
          </div>
        </section>
        <section className="srez-section">
          <div className="srez-section-title"><div><h2>Популярные стрижки</h2></div><Button variant="secondary" onClick={() => go('Catalog')}>Посмотреть все</Button></div>
          <div className="srez-look-wrap"><div className="cosmos-masonry srez-look-masonry">{shown.map(look => <LookCard look={look} index={LOOKS.indexOf(look)} onOpen={onOpen} key={look.id} />)}</div></div>
        </section>
      </main>
    </div>
  );
}
