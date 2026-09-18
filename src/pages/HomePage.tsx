import { useState } from 'react';
import { MASTERS } from '../data/masters';
import { Button } from '../components/Button/Button';
import { CityPopover } from '../components/CityPopover/CityPopover';
import { CatalogSearch } from '../components/CatalogSearch/CatalogSearch';
import { HaircutTypeGrid } from '../components/HaircutTypeGrid/HaircutTypeGrid';
import { Header } from '../components/Header/Header';
import { MasterPortfolioPreview } from '../components/MasterPortfolioPreview/MasterPortfolioPreview';
import { PopularMasterCarousel } from '../components/PopularMasterCarousel/PopularMasterCarousel';
import { RegionSelector } from '../components/RegionSelector/RegionSelector';
import { DIRECTORY_MASTERS } from '../data/directoryMasters';
import { MASTER_COLLECTIONS } from '../data/masterCollections';
import type { MasterCollection } from '../data/masterCollections';
import type { AppState, Screen } from '../types';

const HOME_HAIRCUT_COLLECTIONS = MASTER_COLLECTIONS.slice(0, 6);
const POPULAR_MASTERS = DIRECTORY_MASTERS.slice(0, 10);

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  go: (screen: Screen) => void;
  toast: (message: string) => void;
};

export function HomePage({ state, setState, go, toast }: Props) {
  const [query, setQuery] = useState('');
  const submitSearch = () => {
    go('Catalog');
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };
  const openCollection = (collection: MasterCollection) => {
    setState(current => ({
      ...current,
      selectedLookId: collection.lookId,
      selectedCollectionId: collection.id,
      focus: collection.lookId === 'mullet',
      screen: 'Catalog',
    }));
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
        <section className="srez-section srez-home-haircut-types" aria-labelledby="home-haircut-types-title">
          <div className="srez-section-title">
            <div>
              <h2 id="home-haircut-types-title">По типу стрижки</h2>
            </div>
            <Button variant="secondary" onClick={() => go('Haircuts')}>Все стрижки</Button>
          </div>
          <HaircutTypeGrid collections={HOME_HAIRCUT_COLLECTIONS} onSelect={openCollection} />
        </section>
        <section className="srez-section srez-home-masters">
          <div className="srez-section-title"><div><h2>Популярные мастера</h2></div><Button variant="secondary" onClick={() => go('Catalog')}>Посмотреть все</Button></div>
          <PopularMasterCarousel masters={POPULAR_MASTERS} onOpen={() => go('Master')} />
        </section>
      </main>
    </div>
  );
}
