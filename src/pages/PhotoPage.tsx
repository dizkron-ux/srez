import { Button } from '../components/Button/Button';
import { ContextLine } from '../components/ContextLine/ContextLine';
import { Header } from '../components/Header/Header';
import { Media } from '../components/Media/Media';
import type { AppState, Screen } from '../types';

type Props = { state:AppState; setState:React.Dispatch<React.SetStateAction<AppState>>; go:(screen:Screen)=>void };

export function PhotoPage({ state, setState, go }: Props) {
  return <div className="srez-app"><Header screen={state.screen} saved={state.saved} go={go} /><main className="srez-shell"><section className="srez-photo"><ContextLine eyebrow="ПОИСК ПО РЕФЕРЕНСУ" onBack={() => go('Home')} /><h1>Покажи, как хочешь выглядеть</h1><div className="srez-upload"><p>Загрузи фото. В MVP анализ ниже имитируется, чтобы проверить сам сценарий до настоящего AI.</p><div className="srez-upload-actions"><Button onClick={() => setState(s => ({...s, photoAnalyzed:true}))}>Выбрать фото</Button><Button variant="secondary" onClick={() => setState(s => ({...s, photoAnalyzed:true}))}>Использовать пример</Button></div></div>
  {state.photoAnalyzed ? <div className="srez-photo-result"><Media index={0} ratioOverride={.72} /><div className="srez-photo-analysis"><span className="srez-eyebrow">ПРЕДПОЛОЖЕНИЕ</span><h2>Похоже на</h2><p>Проверь признаки. Неправильные можно убрать до поиска.</p><div className="srez-removable">{state.photoTags.map(tag => <button className="cosmos-chip" key={tag} onClick={() => setState(s => ({...s, photoTags:s.photoTags.filter(t => t !== tag)}))}>{tag} ×</button>)}</div><div style={{marginTop:22}}><Button onClick={() => go('Catalog')}>Найти мастеров</Button></div></div></div> : null}
  </section></main></div>;
}
