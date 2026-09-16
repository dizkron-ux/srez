import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { IconButton } from '../components/IconButton/IconButton';
import { SaveButton } from '../components/SaveButton/SaveButton';
import { WorkCard } from '../components/WorkCard/WorkCard';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state:AppState; go:(screen:Screen)=>void; onSave:()=>void };

export function MasterPage({ state, go, onSave }: Props) {
  const master = MASTERS[0];
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;
  return <div className="srez-app srez-master-profile-page"><Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} /><main className="srez-shell">
    <section className="srez-master-profile-head">
      <div className="srez-master-profile-identity srez-page-head">
        <div className="srez-master-profile-avatar">{master.name.slice(0, 1)}</div>
        <div className="srez-master-profile-copy">
          <h1 className="srez-page-title">{master.name}</h1>
          <span>{master.place}</span>
        </div>
        <div className="srez-master-profile-actions"><Button>Перейти к записи</Button><SaveButton saved={state.saved} onClick={onSave} /><IconButton icon="share" iconSize={18} aria-label="Поделиться профилем" className="srez-profile-share__trigger" /></div>
      </div>
    </section>

    <section className="srez-master-profile-content">
      <div className="srez-master-profile-works">
        <div className="cosmos-section-heading"><h2>Работы</h2><IconButton icon="sliders" iconSize={18} aria-label="Фильтры работ" className="srez-profile-filters__trigger" /></div>
        <div className="srez-work-grid">{[.82,1.08,.7,1.22,.94,.76,1.12,.86].map((ratio, index) => <WorkCard index={index} ratio={ratio} onOpen={() => go('Work')} key={index} />)}</div>
      </div>
    </section>
  </main></div>;
}
