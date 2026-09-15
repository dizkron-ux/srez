import { useState } from 'react';
import { CatalogFilterBar } from '../components/CatalogFilterBar/CatalogFilterBar';
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
        <CatalogFilterBar initialOpen={state.filtersOpen ? 'hair' : null} />

        <section className="srez-cosmos-catalog__intro">
          <div>
            <span className="srez-eyebrow">Каталог мастеров</span>
            <h1>Мастера</h1>
          </div>
          <div className="srez-cosmos-catalog__summary">
            <strong>{MASTERS.length} мастера</strong>
            <span>{selectedLook ? `с подтверждениями по ${selectedLook}` : 'с подтверждениями компетенции'}</span>
          </div>
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
