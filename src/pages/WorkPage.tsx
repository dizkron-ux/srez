import { Button } from '../components/Button/Button';
import { ContextLine } from '../components/ContextLine/ContextLine';
import { Header } from '../components/Header/Header';
import { LookEntityCard } from '../components/LookEntityCard/LookEntityCard';
import { Media } from '../components/Media/Media';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state: AppState; go: (screen: Screen) => void };

export function WorkPage({ state, go }: Props) {
  const master = MASTERS[0];
  const look = LOOKS.find(item => item.id === state.selectedLookId) ?? LOOKS[0];
  const lookIndex = Math.max(0, LOOKS.findIndex(item => item.id === look.id));

  return (
    <div className="srez-app">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={look.name} />
      <main className="srez-shell">
        <div className="srez-work-detail">
          <div className="srez-work-large">
            <ContextLine onBack={() => go('Master')} />
            <div style={{ height: 12 }} />
            <Media index={0} ratioOverride={0.72} />
          </div>

          <aside className="srez-work-side">
            <span className="srez-eyebrow">РАБОТА / ОСНОВАНИЕ</span>
            <h1>{look.name}</h1>
            <p>В этом прототипе изображение служит только для проверки структуры интерфейса. Оно не является реальной работой мастера.</p>

            <div className="srez-tag-row">
              <span className="cosmos-chip">{look.name}</span>
              <span className="cosmos-chip">Средняя длина</span>
              <span className="cosmos-chip">Тонкие волосы</span>
            </div>

            <div className="srez-source-proof">
              {master.proof.map(([label, detail]) => (
                <div className="srez-proof-row" key={label}>
                  <b>{label}</b>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="srez-source-block">
              <span className="srez-eyebrow">СДЕЛАЛ / ИСТОЧНИК</span>
              <strong>{master.name}</strong>
              <span>{master.place}</span>
            </div>

            <div className="srez-work-related">
              <span className="srez-eyebrow">СТРИЖКА</span>
              <LookEntityCard look={look} index={lookIndex} onClick={() => go('Look')} />
            </div>

            <div className="srez-master-hero__actions">
              <Button onClick={() => go('Master')}>Открыть мастера</Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
