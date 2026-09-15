import type { Screen } from '../../types';

type Props = {
  screen: Screen;
  saved: boolean;
  go: (screen: Screen) => void;
};

export function Header({ screen, saved, go }: Props) {
  return (
    <header className="srez-topnav">
      <div className="srez-topnav__inner">
        <button className="srez-brand-button" onClick={() => go('Home')}>
          <div className="srez-mark"><strong>СРЕЗ.</strong></div>
        </button>
        <nav className="srez-nav">
          <button className={['Home','Photo'].includes(screen) ? 'is-active' : ''} onClick={() => go('Home')}>Стрижки</button>
          <button className={['Catalog','Master','Work'].includes(screen) ? 'is-active' : ''} onClick={() => go('Catalog')}>Мастера</button>
          <button className={screen === 'Favourites' ? 'is-active' : ''} onClick={() => go('Favourites')}>
            Избранное{saved ? <span className="srez-fav-count">1</span> : null}
          </button>
        </nav>
      </div>
    </header>
  );
}
