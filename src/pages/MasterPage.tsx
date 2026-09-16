import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon/Icon';
import { Media } from '../components/Media/Media';
import { SaveButton } from '../components/SaveButton/SaveButton';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

function WorkCard({ index, ratio, go }: { index:number; ratio:number; go:(screen:Screen)=>void }) {
  return <article className="srez-work-card"><button type="button" className="srez-work-card__visual" onClick={() => go('Work')}><Media index={index} ratioOverride={ratio} /></button></article>;
}

type Props = { state:AppState; go:(screen:Screen)=>void; onSave:()=>void };

export function MasterPage({ state, go, onSave }: Props) {
  const master = MASTERS[0];
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;
  return <div className="srez-app srez-master-profile-page"><Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} /><main className="srez-shell">
    <section className="srez-master-profile-head">
      <div className="srez-master-profile-identity">
        <div className="srez-master-profile-avatar">{master.name.slice(0, 1)}</div>
        <div className="srez-master-profile-copy">
          <h1>{master.name}</h1>
          <span>{master.place}</span>
        </div>
        <div className="srez-master-profile-actions"><Button>Перейти к записи</Button><SaveButton saved={state.saved} onClick={onSave} /><button type="button" className="srez-profile-share__trigger" aria-label="Поделиться профилем"><Icon name="share" size={18} /></button></div>
      </div>
    </section>

    <section className="srez-master-profile-content">
      <div className="srez-master-profile-works">
        <div className="cosmos-section-heading"><h2>Работы</h2><button type="button" className="srez-profile-filters__trigger" aria-label="Фильтры работ"><Icon name="sliders" size={18} /></button></div>
        <div className="srez-work-grid">{[.82,1.08,.7,1.22,.94,.76,1.12,.86].map((ratio, index) => <WorkCard index={index} ratio={ratio} go={go} key={index} />)}</div>
      </div>
    </section>
  </main></div>;
}
