import type { Master, Screen } from '../../types';
import { Media } from '../Media/Media';
import { SaveButton } from '../SaveButton/SaveButton';

type Props = {
  master: Master;
  saved: boolean;
  onSave: () => void;
  go: (screen: Screen) => void;
};

export function MasterCard({ master, saved, onSave, go }: Props) {
  return (
    <article className="srez-master-card">
      <button type="button" className="srez-master-card__visual" aria-label={`Открыть работу мастера ${master.name}`} onClick={() => go('Work')}>
        <div className="cosmos-collage">{master.media.slice(0,4).map((index, i) => <Media index={index} ratioOverride={1} key={`${index}-${i}`} />)}</div>
      </button>
      <div className="srez-master-card__body">
        <div className="srez-master-card__head">
          <div><button type="button" className="srez-master-card__name" onClick={() => go('Master')}>{master.name}</button><div className="srez-master-card__meta">{master.place}</div></div>
          <SaveButton saved={saved} onClick={onSave} />
        </div>
        <div className="srez-proto-note">Изображения выше — иллюстративные плейсхолдеры, не работы мастера.</div>
      </div>
    </article>
  );
}
