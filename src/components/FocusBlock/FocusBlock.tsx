import { LOOKS } from '../../data/looks';
import { MASTERS } from '../../data/masters';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';
import type { Screen } from '../../types';

type Props = { go: (screen: Screen) => void };

export function FocusBlock({ go }: Props) {
  const look = LOOKS[0];
  const master = MASTERS[0];
  return (
    <section className="srez-focus">
      <div className="srez-focus__visual">
        <Media index={0} />
        <div className="srez-focus__caption">
          <span>Выбрано</span><strong>{look.name}</strong><small>{look.description}</small><em><b>Подойдёт, если</b> {look.fit}</em>
        </div>
      </div>
      <div className="srez-focus__masters">
        <div className="srez-focus__heading"><div><span className="srez-eyebrow">Подтверждённые совпадения</span><h3>1 мастер</h3><small>Есть основания именно по Mullet</small></div></div>
        <div className="srez-mini-list">
          <article className="srez-master-mini">
            <span className="cosmos-avatar" style={{ width:34, height:34, background:'#d9d0c7' }}>{master.name[0]}</span>
            <div className="srez-master-mini__body"><strong>{master.name}</strong><span>{master.place}</span><small>Есть опубликованная работа с Mullet</small></div>
            <button type="button" className="srez-mini-arrow" aria-label={`Открыть ${master.name}`} onClick={() => go('Master')}><Icon name="arrow-up-right" size={15} /></button>
          </article>
        </div>
        <div className="srez-focus__footer"><span className="srez-focus__hint">Покажем только то, что можно объяснить.</span><Button variant="secondary" onClick={() => go('Catalog')}>Все результаты<Icon name="arrow-right" size={14} /></Button></div>
      </div>
    </section>
  );
}
