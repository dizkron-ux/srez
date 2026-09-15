import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { Header } from '../components/Header/Header';
import { MasterCard } from '../components/MasterCard/MasterCard';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; go: (screen: Screen) => void; onSave: () => void };

export function CatalogPage({ state, go, onSave }: Props) {
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;

  return (
    <div className="srez-app srez-app--cosmos-catalog">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} />

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
