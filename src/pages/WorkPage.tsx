import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon/Icon';
import { IconButton } from '../components/IconButton/IconButton';
import { Media } from '../components/Media/Media';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; go: (screen: Screen) => void };

export function WorkPage({ state, go }: Props) {
  const master = MASTERS[0];
  const look = LOOKS.find(item => item.id === state.selectedLookId) ?? LOOKS[0];

  return (
    <div className="srez-app srez-work-detail-page">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={look.name} />
      <main className="srez-shell">
        <div className="srez-work-detail">
          <section className="srez-work-detail__stage" aria-label={`Работа мастера по стрижке ${look.name}`}>
            <IconButton icon="arrow-left" iconSize={18} aria-label="Назад к мастеру" className="srez-work-detail__back" onClick={() => go('Master')} />
            <div className="srez-work-detail__visual">
              <Media index={0} ratioOverride={0.72} />
            </div>
          </section>

          <aside className="srez-work-side">
            <h1>{look.name}</h1>
            <p>В этом прототипе изображение служит только для проверки структуры интерфейса. Оно не является реальной работой мастера.</p>

            <div className="srez-tag-row">
              <span className="cosmos-chip">{look.name}</span>
              <span className="cosmos-chip">Средняя длина</span>
              <span className="cosmos-chip">Тонкие волосы</span>
            </div>

            <button type="button" className="srez-source-block" data-qa-ignore onClick={() => go('Master')} aria-label={`Открыть профиль мастера ${master.name}`}>
              <span className="srez-source-avatar">{master.name.slice(0, 1)}</span>
              <span className="srez-source-copy"><strong>{master.name}</strong><span>{master.place}</span></span>
              <Icon name="arrow-up-right" size={15} />
            </button>

            <div className="srez-master-hero__actions">
              <Button onClick={() => go('Master')}>Открыть мастера</Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
