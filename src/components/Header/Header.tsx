import type { Screen } from '../../types';
import { Icon } from '../Icon/Icon';

type Props = {
  screen: Screen;
  saved: boolean;
  go: (screen: Screen) => void;
  selectedLook?: string | null;
};

export function Header({ screen, saved, go, selectedLook = null }: Props) {
  const haircutsActive = ['Haircuts', 'Look'].includes(screen);
  const mastersActive = ['Catalog', 'Master', 'Work'].includes(screen);
  const favouritesActive = screen === 'Favourites';

  return (
    <header className="srez-app-header">
      <div className={`srez-app-header__inner ${screen === 'Home' ? 'is-home' : ''}`}>
        <div className="srez-app-header__left">
          <button
            type="button"
            className="srez-app-header__brand"
            onClick={() => go('Home')}
            aria-label="На главную СРЕЗ"
            aria-current={screen === 'Home' ? 'page' : undefined}
            data-tooltip="На главную"
          >
            СРЕЗ.
          </button>
          <nav className="srez-app-header__nav" aria-label="Основная навигация">
            <button
              type="button"
              className={haircutsActive ? 'is-active' : ''}
              aria-current={haircutsActive ? 'page' : undefined}
              aria-label="Стрижки"
              data-tooltip="Стрижки"
              onClick={() => go('Haircuts')}
            >
              <Icon name="grid" size={21} />
              <span className="srez-app-header__label">Стрижки</span>
            </button>
            <button
              type="button"
              className={mastersActive ? 'is-active' : ''}
              aria-current={mastersActive ? 'page' : undefined}
              aria-label="Мастера"
              data-tooltip="Мастера"
              onClick={() => go('Catalog')}
            >
              <Icon name="users" size={21} />
              <span className="srez-app-header__label">Мастера</span>
            </button>
          </nav>
        </div>

        <div className="srez-app-header__right">
          <button
            type="button"
            className={`srez-app-header__favourites ${favouritesActive ? 'is-active' : ''}`}
            aria-current={favouritesActive ? 'page' : undefined}
            aria-label="Избранное"
            data-tooltip="Открыть избранное"
            data-qa-ignore
            onClick={() => go('Favourites')}
          >
            <Icon name="heart" size={21} />
            {saved ? <span className="srez-app-header__count">1</span> : null}
          </button>
        </div>
      </div>
    </header>
  );
}
