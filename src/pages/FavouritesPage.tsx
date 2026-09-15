import { Button } from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { MasterCard } from '../components/MasterCard/MasterCard';
import { MASTERS } from '../data/masters';
import type { AppState, Screen } from '../types';

type Props = { state:AppState; go:(screen:Screen)=>void; onSave:()=>void };

export function FavouritesPage({ state, go, onSave }: Props) {
  return <div className="srez-app"><Header screen={state.screen} saved={state.saved} go={go} /><main className="srez-shell"><section className="srez-favs"><button className="srez-back" onClick={() => go('Home')}>← Назад</button><span className="srez-eyebrow">СОХРАНЕНО ЛОКАЛЬНО</span><h1>Избранное</h1><p className="srez-local-note">Избранное хранится только в этом браузере.</p>{state.saved ? <div className="srez-master-grid"><MasterCard master={MASTERS[0]} saved={state.saved} onSave={onSave} go={go} /></div> : <div className="srez-empty"><div className="srez-empty__mark">∅</div><h3>Пока пусто</h3><p>Добавь мастера сердечком в выдаче или профиле.</p><Button variant="secondary" onClick={() => go('Catalog')}>Посмотреть мастеров</Button></div>}</section></main></div>;
}
