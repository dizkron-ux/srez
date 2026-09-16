import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { MasterCard } from '../components/MasterCard/MasterCard';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state:AppState; go:(screen:Screen)=>void; onSave:()=>void };

export function FavouritesPage({ state, go, onSave }: Props) {
  return <div className="srez-app"><Header screen={state.screen} saved={state.saved} go={go} selectedLook={state.focus ? 'Mullet' : null} /><main className="srez-shell"><section className="srez-favs">{state.saved ? <div className="srez-master-grid"><MasterCard master={MASTERS[0]} saved={state.saved} onSave={onSave} go={go} /></div> : <div className="srez-empty"><div className="srez-empty__mark">∅</div><h3>В избранном пока пусто</h3><p>Добавь мастера сердечком в выдаче или профиле.</p><Button variant="secondary" onClick={() => go('Catalog')}>Посмотреть мастеров</Button></div>}</section></main></div>;
}
