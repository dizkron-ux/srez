import { useState } from 'react';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { CatalogHeader } from '../components/CatalogHeader/CatalogHeader';
import { MasterCard } from '../components/MasterCard/MasterCard';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; go: (screen: Screen) => void; onSave: () => void };

export function CatalogPage({ state, setState, go, onSave }: Props) {
  const [query, setQuery] = useState('');
  const selectedLook = state.focus ? 'Mullet' : null;

  const submitSearch = () => {
    setState(current => ({ ...current, filtersOpen: false }));
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  return (
    <div className="srez-app srez-app--cosmos-catalog">
      <CatalogHeader
        saved={state.saved}
        go={go}
        selectedLook={selectedLook}
        query={query}
        onQueryChange={setQuery}
        onSearch={submitSearch}
      />

      <main className="srez-shell srez-cosmos-catalog">
        <section className="srez-cosmos-catalog__intro">
          <h1>Мастера</h1>
          <CatalogFilters initialOpen={state.filtersOpen} />
        </section>

        <section className="srez-cosmos-catalog__results" aria-label="Результаты каталога">
          <div className="srez-cosmos-master-grid">
            {MASTERS.map(master => (
              <MasterCard master={master} saved={state.saved} onSave={onSave} go={go} key={master.name} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
