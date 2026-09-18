import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { IconButton } from '../components/IconButton/IconButton';
import { LookMasterSelector } from '../components/LookMasterSelector/LookMasterSelector';
import { Media } from '../components/Media/Media';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  go: (screen: Screen) => void;
};

export function LookPage({ state, setState, go }: Props) {
  const look = LOOKS.find(item => item.id === state.selectedLookId) ?? LOOKS[0];
  const lookIndex = Math.max(0, LOOKS.findIndex(item => item.id === look.id));
  const openLook = (lookId: string) => {
    setState(current => ({ ...current, selectedLookId: lookId, selectedCollectionId: null, screen: 'Look' }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="srez-app srez-look-detail-page">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={look.name} />

      <main className="srez-look-detail">
        <section className="srez-look-detail__stage" aria-label={`Стрижка ${look.name}`}>
          <IconButton icon="arrow-left" iconSize={18} aria-label="Назад к стрижкам" className="srez-look-detail__back" onClick={() => go('Haircuts')} />

          <div className="srez-look-detail__visual-wrap">
            <div className="srez-look-detail__visual">
              <Media index={lookIndex} ratioOverride={0.66} />
            </div>
          </div>

        </section>

        <aside className="srez-look-detail__rail">
          <div className="srez-look-detail__rail-head">
            <h1>{look.name}</h1>
            <p>{look.fit}</p>
          </div>

          <LookMasterSelector masters={MASTERS} onOpenMaster={() => go('Master')} />

          <div className="srez-look-detail__cta">
            <Button size="md" onClick={() => go('Catalog')}>Найти мастера</Button>
          </div>
        </aside>
      </main>

      <section className="srez-shell srez-look-detail__more">
        <h2>Похожие стрижки</h2>
        <div className="srez-look-detail__more-grid">
          {LOOKS.filter(item => item.id !== look.id).slice(0, 4).map((item, index) => (
            <button type="button" key={item.id} onClick={() => openLook(item.id)}>
              <Media index={index + 1} ratioOverride={1.08} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
