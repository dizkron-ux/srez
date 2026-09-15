import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon/Icon';
import { Media } from '../components/Media/Media';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = {
  state: AppState;
  go: (screen: Screen) => void;
};

export function LookPage({ state, go }: Props) {
  const look = LOOKS.find(item => item.id === state.selectedLookId) ?? LOOKS[0];
  const lookIndex = Math.max(0, LOOKS.findIndex(item => item.id === look.id));
  const [activeMaster, setActiveMaster] = useState(0);
  const master = MASTERS[activeMaster] ?? MASTERS[0];

  return (
    <div className="srez-app srez-look-detail-page">
      <Header screen={state.screen} saved={state.saved} go={go} selectedLook={look.name} />

      <main className="srez-look-detail">
        <section className="srez-look-detail__stage" aria-label={`Стрижка ${look.name}`}>
          <button type="button" className="srez-look-detail__back" onClick={() => go('Home')} aria-label="Назад к стрижкам">
            <Icon name="arrow-left" size={18} />
          </button>

          <div className="srez-look-detail__visual-wrap">
            <div className="srez-look-detail__visual">
              <Media index={lookIndex} ratioOverride={0.66} />
            </div>
            <div className="srez-look-detail__caption">
              <strong>{look.name}</strong>
              <span>{look.description}</span>
            </div>
          </div>

          <div className="srez-look-detail__portfolio" aria-hidden="true">
            <div className="srez-look-detail__portfolio-media">
              {master.media.slice(0, 2).map((index, itemIndex) => (
                <Media index={index} ratioOverride={1.38} key={`${master.name}-${itemIndex}`} />
              ))}
            </div>
            <div className="srez-look-detail__portfolio-meta">
              <div className="srez-look-detail__portfolio-avatar">{master.name.slice(0, 1)}</div>
              <div>
                <strong>{master.name}</strong>
                <span>{master.shop} · портфолио</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="srez-look-detail__rail">
          <div className="srez-look-detail__rail-head">
            <span className="srez-eyebrow">СТРИЖКА</span>
            <h1>{look.name}</h1>
            <p>{look.fit}</p>
          </div>

          <div className="srez-look-detail__masters-label">Мастера</div>
          <div className="srez-look-detail__masters">
            {MASTERS.map((item, index) => (
              <button
                type="button"
                className={`srez-look-detail__master ${index === activeMaster ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveMaster(index)}
                onFocus={() => setActiveMaster(index)}
                onClick={() => go('Master')}
                key={item.name}
              >
                <span className="srez-look-detail__master-avatar">{item.name.slice(0, 1)}</span>
                <span className="srez-look-detail__master-copy">
                  <strong>{item.name}</strong>
                  <span>{item.place}</span>
                </span>
                <Icon name="arrow-up-right" size={15} />
              </button>
            ))}
          </div>

          <div className="srez-look-detail__cta">
            <div>
              <strong>{master.name}</strong>
              <span>{master.shop}</span>
            </div>
            <button type="button" onClick={() => go('Master')}>Записаться</button>
          </div>
        </aside>
      </main>

      <section className="srez-shell srez-look-detail__more">
        <h2>Похожие стрижки</h2>
        <div className="srez-look-detail__more-grid">
          {LOOKS.filter(item => item.id !== look.id).slice(0, 4).map((item, index) => (
            <button type="button" key={item.id} onClick={() => go('Home')}>
              <Media index={index + 1} ratioOverride={1.08} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
