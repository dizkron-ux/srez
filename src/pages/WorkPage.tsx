import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { Media } from '../components/Media/Media';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state:AppState; go:(screen:Screen)=>void };

export function WorkPage({ state, go }: Props) {
  const master=MASTERS[0];
  return <div className="srez-app"><Header screen={state.screen} saved={state.saved} go={go} /><main className="srez-shell"><div className="srez-work-detail"><div className="srez-work-large"><button className="srez-back" onClick={() => go('Master')}>← Назад</button><div style={{height:12}}></div><Media index={0} ratioOverride={.72} /></div><aside className="srez-work-side"><span className="srez-eyebrow">РАБОТА / ОСНОВАНИЕ</span><h1>Mullet</h1><p>В этом прототипе изображение служит только для проверки структуры интерфейса. Оно не является реальной работой мастера.</p><div className="srez-tag-row"><span className="cosmos-chip">Mullet</span><span className="cosmos-chip">Средняя длина</span><span className="cosmos-chip">Тонкие волосы</span></div><div className="srez-source-proof">{master.proof.map(([label,detail]) => <div className="srez-proof-row" key={label}><b>{label}</b><span>{detail}</span></div>)}</div><div className="srez-source-block"><span className="srez-eyebrow">СДЕЛАЛ / ИСТОЧНИК</span><strong>{master.name}</strong><span>{master.place}</span></div><div className="srez-master-hero__actions"><Button onClick={() => go('Master')}>Открыть мастера</Button></div></aside></div></main></div>;
}
