import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { Header } from '../components/Header/Header';
import { SaveButton } from '../components/SaveButton/SaveButton';
import { DIRECTORY_MASTERS } from '../data/directoryMasters';
import { LOOKS } from '../data/looks';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; go: (screen: Screen) => void };

export function CatalogPage({ state, go }: Props) {
  const [savedDirectoryMasters, setSavedDirectoryMasters] = useState<Set<string>>(() => new Set());
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;
  const toggleDirectorySave = (masterId: string) => {
    setSavedDirectoryMasters(current => {
      const next = new Set(current);

      if (next.has(masterId)) {
        next.delete(masterId);
      } else {
        next.add(masterId);
      }

      return next;
    });
  };

  return (
    <div className="srez-app srez-app--cosmos-catalog">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} />

      <main className="srez-shell srez-cosmos-catalog">
        <section className="srez-cosmos-catalog__intro srez-page-head">
          <h1 className="srez-page-title">Мастера</h1>
          <CatalogFilters initialOpen={state.filtersOpen} />
        </section>

        <section className="srez-master-directory" aria-label="Каталог мастеров">
          <div className="srez-master-directory__grid">
            {DIRECTORY_MASTERS.map((master, index) => (
              <article className="srez-master-directory-card" key={master.id}>
                <div className="srez-master-directory-card__save">
                  <SaveButton
                    saved={savedDirectoryMasters.has(master.id)}
                    onClick={() => toggleDirectorySave(master.id)}
                  />
                </div>

                <button
                  type="button"
                  className="srez-master-directory-card__profile"
                  onClick={() => go('Master')}
                  aria-label={`Открыть профиль мастера ${master.name}`}
                >
                  <img
                    className="srez-master-directory-card__photo"
                    src={master.photo}
                    alt=""
                    loading={index < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <strong>{master.name}</strong>
                  <span>{master.specialty}</span>
                  <small>{master.place}</small>
                </button>

                <div className="srez-master-directory-card__actions">
                  <Button variant="secondary" size="md" onClick={() => go('Master')}>
                    К записи
                  </Button>
                  <Button variant="secondary" size="md" onClick={() => go('Master')}>
                    Работы
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
