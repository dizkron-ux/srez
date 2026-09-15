import type { Screen } from '../../types';

type Props = {
  screen: Screen;
  saved: boolean;
  go: (screen: Screen) => void;
};

export function Header({ screen, saved, go }: Props) {
  const haircutsActive = ['Home','Photo'].includes(screen);
  const mastersActive = ['Catalog','Master','Work'].includes(screen);
  const favouritesActive = screen === 'Favourites';

  return (
    <header className="srez-topnav">
      <div className="srez-topnav__inner">
        <button type="button" className="srez-brand-button" onClick={() => go('Home')} aria-label="На главную СРЕЗ">
          <div className="srez-mark"><strong>СРЕЗ.</strong></div>
        </button>
        <nav className="srez-nav" aria-label="Основная навигация">
          <button type="button" className={haircutsActive ? 'is-active' : ''} aria-current={haircutsActive ? 'page' : undefined} onClick={() => go('Home')}>Стрижки</button>
          <button type="button" className={mastersActive ? 'is-active' : ''} aria-current={mastersActive ? 'page' : undefined} onClick={() => go('Catalog')}>Мастера</button>
          <button type="button" className={favouritesActive ? 'is-active' : ''} aria-current={favouritesActive ? 'page' : undefined} onClick={() => go('Favourites')}>
            Избранное{saved ? <span className="srez-fav-count">1</span> : null}
          </button>
        </nav>
      </div>
    </header>
  );
}
