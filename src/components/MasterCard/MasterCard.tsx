import type { Master, Screen } from '../../types';
import { Evidence } from '../Evidence/Evidence';
import { Media } from '../Media/Media';

type Props = {
  master: Master;
  saved: boolean;
  onSave: () => void;
  go: (screen: Screen) => void;
};

export function MasterCard({ master, saved, onSave, go }: Props) {
  return (
    <article className="srez-master-card">
      <button className="srez-master-card__visual" onClick={() => go('Work')}>
        <div className="cosmos-collage">{master.media.slice(0,4).map((index, i) => <Media index={index} ratioOverride={1} key={`${index}-${i}`} />)}</div>
      </button>
      <div className="srez-master-card__body">
        <div className="srez-master-card__head">
          <div><button className="srez-master-card__name" onClick={() => go('Master')}>{master.name}</button><div className="srez-master-card__meta">{master.place}</div></div>
          <button className={`cosmos-save ${saved ? 'is-saved' : ''}`} onClick={onSave}>♡ <span>{saved ? 'Saved' : 'Save'}</span></button>
        </div>
        <Evidence master={master} />
        <div className="srez-proto-note">Изображения выше — иллюстративные плейсхолдеры, не работы мастера.</div>
        <div className="srez-card-foot"><span></span><button className="srez-open-master" onClick={() => go('Master')}>Открыть мастера →</button></div>
      </div>
    </article>
  );
}
