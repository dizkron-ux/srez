import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { DirectoryMasterCard } from '../components/DirectoryMasterCard/DirectoryMasterCard';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon/Icon';
import { DIRECTORY_MASTERS } from '../data/directoryMasters';
import { LOOKS } from '../data/looks';
import { MASTER_COLLECTIONS } from '../data/masterCollections';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; go: (screen: Screen) => void };

const MasterMap = lazy(() => import('../components/MasterMap/MasterMap').then(module => ({ default: module.MasterMap })));

export function CatalogPage({ state, setState, go }: Props) {
  const selectedCollection = MASTER_COLLECTIONS.find(collection => collection.id === state.selectedCollectionId) ?? null;
  const displayedMasters = useMemo(
    () => selectedCollection
      ? DIRECTORY_MASTERS.filter(master => master.collectionIds.includes(selectedCollection.id))
      : DIRECTORY_MASTERS,
    [selectedCollection],
  );
  const [mapMode, setMapMode] = useState(true);
  const [activeMasterId, setActiveMasterId] = useState<string | null>(displayedMasters[0]?.id ?? null);
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;
  const openMaster = useCallback(() => go('Master'), [go]);

  useEffect(() => {
    setActiveMasterId(current => (
      current && displayedMasters.some(master => master.id === current)
        ? current
        : displayedMasters[0]?.id ?? null
    ));
  }, [displayedMasters]);

  const selectMasterFromMap = (masterId: string) => {
    setActiveMasterId(masterId);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(`directory-${masterId}`)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  const masterCards = displayedMasters.map((master, index) => (
    <DirectoryMasterCard
      key={master.id}
      master={master}
      index={index}
      active={mapMode && activeMasterId === master.id}
      onActivate={mapMode ? setActiveMasterId : undefined}
      onOpen={openMaster}
    />
  ));

  return (
    <div className="srez-app srez-app--cosmos-catalog">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} />

      <main className="srez-shell srez-cosmos-catalog">
        <section className="srez-cosmos-catalog__intro srez-page-head">
          <div className="srez-catalog-title-group">
            <h1 className="srez-page-title">Мастера</h1>
            {selectedCollection ? (
              <div className="srez-catalog-selection" aria-label={`Выбранный тип: ${selectedCollection.title}`}>
                <span>По типу: <strong>{selectedCollection.title}</strong></span>
                <button
                  type="button"
                  onClick={() => setState(current => ({ ...current, selectedCollectionId: null, selectedLookId: null }))}
                >
                  Сбросить
                </button>
              </div>
            ) : null}
          </div>
          <div className="srez-catalog-view-controls">
            <button
              type="button"
              className="srez-catalog-map-toggle"
              aria-pressed={mapMode}
              aria-label={mapMode ? 'Скрыть карту' : 'Показать на карте'}
              data-tooltip={mapMode ? 'Скрыть карту' : 'Показать на карте'}
              onClick={() => setMapMode(current => !current)}
            >
              <Icon name="map" size={17} />
              <span>{mapMode ? 'Скрыть карту' : 'Показать на карте'}</span>
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
                  masters={displayedMasters}
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
