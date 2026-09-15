import type { Screen } from '../../types';
import { CatalogSearch } from '../CatalogSearch/CatalogSearch';

type Props = {
  saved: boolean;
  go: (screen: Screen) => void;
  selectedLook?: string | null;
  query: string;
  onQueryChange: (value: string) => void;
  onSearch?: () => void;
};

export function CatalogHeader({ saved, go, selectedLook, query, onQueryChange, onSearch }: Props) {
  return (
    <header className="srez-catalog-header">
      <div className="srez-catalog-header__inner">
        <div className="srez-catalog-header__left">
          <button type="button" className="srez-catalog-header__brand" onClick={() => go('Home')} aria-label="На главную СРЕЗ">СРЕЗ.</button>
          <nav className="srez-catalog-header__nav" aria-label="Основная навигация">
            <button type="button" onClick={() => go('Home')}>Стрижки</button>
            <button type="button" className="is-active" aria-current="page" onClick={() => go('Catalog')}>Мастера</button>
          </nav>
        </div>

        <div className="srez-catalog-header__search">
          <CatalogSearch
            selectedLook={selectedLook}
            query={query}
            onQueryChange={onQueryChange}
            onSubmit={onSearch}
          />
        </div>

        <div className="srez-catalog-header__right">
          <button type="button" className="srez-catalog-header__favourites" onClick={() => go('Favourites')}>
            Избранное{saved ? <span>1</span> : null}
          </button>
        </div>
      </div>
    </header>
  );
}
