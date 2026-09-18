import { lazy, Suspense, useState } from 'react';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { DirectoryMasterCard } from '../components/DirectoryMasterCard/DirectoryMasterCard';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon/Icon';
import { DIRECTORY_MASTERS } from '../data/directoryMasters';
import { LOOKS } from '../data/looks';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; go: (screen: Screen) => void };

const MasterMap = lazy(() => import('../components/MasterMap/MasterMap').then(module => ({ default: module.MasterMap })));

export function CatalogPage({ state, go }: Props) {
  const [mapMode, setMapMode] = useState(false);
  const [activeMasterId, setActiveMasterId] = useState<string | null>(DIRECTORY_MASTERS[0]?.id ?? null);
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;

  const selectMasterFromMap = (masterId: string) => {
    setActiveMasterId(masterId);
    document.getElementById(`directory-${masterId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const masterCards = DIRECTORY_MASTERS.map((master, index) => (
    <DirectoryMasterCard
      key={master.id}
      master={master}
      index={index}
      active={mapMode && activeMasterId === master.id}
      onActivate={mapMode ? setActiveMasterId : undefined}
      onOpen={() => go('Master')}
    />
  ));

  return (
    <div className="srez-app srez-app--cosmos-catalog">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} />

      <main className="srez-shell srez-cosmos-catalog">
        <section className="srez-cosmos-catalog__intro srez-page-head">
          <h1 className="srez-page-title">Мастера</h1>
          <div className="srez-catalog-view-controls">
            <button
              type="button"
              className={`srez-catalog-map-toggle ${mapMode ? 'is-active' : ''}`}
              aria-pressed={mapMode}
              aria-label={mapMode ? 'Показать каталог' : 'Показать на карте'}
              data-tooltip={mapMode ? 'Показать каталог' : 'Показать на карте'}
              onClick={() => setMapMode(current => !current)}
            >
              <Icon name={mapMode ? 'grid' : 'map'} size={17} />
              <span>{mapMode ? 'Каталог' : 'На карте'}</span>
            </button>
            <CatalogFilters initialOpen={state.filtersOpen} />
          </div>
        </section>

        <section className={`srez-master-directory ${mapMode ? 'is-map-mode' : ''}`} aria-label="Каталог мастеров">
          {mapMode ? (
            <div className="srez-master-directory__map-layout">
              <div className="srez-master-directory__map-list" aria-label="Мастера на карте">
                {masterCards}
              </div>
              <Suspense fallback={<div className="srez-master-map is-loading" aria-label="Карта загружается" />}>
                <MasterMap
                  masters={DIRECTORY_MASTERS}
                  activeMasterId={activeMasterId}
                  onSelect={selectMasterFromMap}
                />
              </Suspense>
            </div>
          ) : (
            <div className="srez-master-directory__grid">{masterCards}</div>
          )}
        </section>
      </main>
    </div>
  );
}
