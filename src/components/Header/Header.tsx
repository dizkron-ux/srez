import { useState } from 'react';
import type { Screen } from '../../types';
import { CatalogSearch } from '../CatalogSearch/CatalogSearch';

type Props = {
  screen: Screen;
  saved: boolean;
  go: (screen: Screen) => void;
  selectedLook?: string | null;
};

export function Header({ screen, saved, go, selectedLook = null }: Props) {
  const [query, setQuery] = useState('');
  const haircutsActive = ['Home', 'Look', 'Photo'].includes(screen);
  const mastersActive = ['Catalog', 'Master', 'Work'].includes(screen);
  const favouritesActive = screen === 'Favourites';

  const submitSearch = () => {
    if (screen !== 'Catalog') go('Catalog');
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  return (
    <header className="srez-app-header">
      <div className="srez-app-header__inner">
        <div className="srez-app-header__left">
          <button type="button" className="srez-app-header__brand" onClick={() => go('Home')} aria-label="На главную СРЕЗ">
            СРЕЗ.
          </button>
          <nav className="srez-app-header__nav" aria-label="Основная навигация">
            <button
              type="button"
              className={haircutsActive ? 'is-active' : ''}
              aria-current={haircutsActive ? 'page' : undefined}
              onClick={() => go('Home')}
            >
              Стрижки
            </button>
            <button
              type="button"
              className={mastersActive ? 'is-active' : ''}
              aria-current={mastersActive ? 'page' : undefined}
              onClick={() => go('Catalog')}
            >
              Мастера
            </button>
          </nav>
        </div>

        <div className="srez-app-header__search">
          <CatalogSearch
            selectedLook={selectedLook}
            query={query}
            onQueryChange={setQuery}
            onSubmit={submitSearch}
          />
        </div>

        <div className="srez-app-header__right">
          <button
            type="button"
            className={`srez-app-header__favourites ${favouritesActive ? 'is-active' : ''}`}
            aria-current={favouritesActive ? 'page' : undefined}
            onClick={() => go('Favourites')}
          >
            Избранное{saved ? <span>1</span> : null}
          </button>
        </div>
      </div>
    </header>
  );
}
