import { Button } from '../components/Button/Button';
import { ContextLine } from '../components/ContextLine/ContextLine';
import { Evidence } from '../components/Evidence/Evidence';
import { Header } from '../components/Header/Header';
import { Media } from '../components/Media/Media';
import { SaveButton } from '../components/SaveButton/SaveButton';
import { LOOKS } from '../data/looks';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

function WorkCard({ index, go }: { index:number; go:(screen:Screen)=>void }) {
  return <article className="srez-work-card"><button type="button" className="srez-work-card__visual" onClick={() => go('Work')}><Media index={index} ratioOverride={.82} /></button><div className="srez-work-card__text"><strong>Mullet</strong><span>Есть опубликованная работа</span></div></article>;
}

type Props = { state:AppState; go:(screen:Screen)=>void; onSave:()=>void };

export function MasterPage({ state, go, onSave }: Props) {
  const master = MASTERS[0];
  const selectedLook = LOOKS.find(look => look.id === state.selectedLookId)?.name ?? null;
  return <div className="srez-app"><Header screen={state.screen} saved={state.saved} go={go} selectedLook={selectedLook} /><main className="srez-shell">
    <section className="srez-detail-head"><ContextLine onBack={() => go('Catalog')} backLabel="Назад к результатам" /><div className="srez-master-hero"><div className="srez-master-hero__visual"><Media index={0} ratioOverride={.72} /></div><div className="srez-master-hero__info"><span className="srez-eyebrow">МАСТЕР</span><h1>{master.name}</h1><div className="srez-master-hero__place">{master.place}</div><Evidence master={master} /><div className="srez-master-hero__actions"><Button>Перейти к записи</Button><SaveButton saved={state.saved} onClick={onSave} /></div></div></div></section>
    <section className="srez-detail-section"><span className="srez-eyebrow">EVIDENCE FIRST</span><div className="cosmos-section-heading"><h2>Работы и основания по Mullet</h2><button type="button">Все работы</button></div><div className="srez-work-grid">{[0,1,2,3].map(i => <WorkCard index={i} go={go} key={i} />)}</div><div className="srez-proto-note srez-proto-note--section">Визуалы — плейсхолдеры прототипа. Реальные источники отделены от иллюстраций.</div></section>
    <section className="srez-detail-section"><div className="cosmos-section-heading"><h2>Специализации в тестовой базе</h2></div><div className="srez-tag-row">{master.tags.map(tag => <span className="cosmos-chip" key={tag}>{tag}</span>)}</div></section>
    <section className="srez-detail-section"><div className="cosmos-section-heading"><h2>Где работает</h2></div><div className="srez-salon-card"><span className="cosmos-avatar" style={{width:46,height:46,background:'#d8d4cd'}}>ПМ</span><div><strong>{master.shop}</strong><span>{master.place}</span></div></div></section>
  </main></div>;
}
