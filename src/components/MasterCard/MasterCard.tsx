import { useState } from 'react';
import type { Master, Screen } from '../../types';
import { Media } from '../Media/Media';
import { SaveButton } from '../SaveButton/SaveButton';

type Props = {
  master: Master;
  saved: boolean;
  onSave: () => void;
  go: (screen: Screen) => void;
  mediaMode?: 'collage' | 'photo';
};

export function MasterCard({ master, saved, onSave, go, mediaMode = 'collage' }: Props) {
  const [activeMedia, setActiveMedia] = useState(0);
  const isPhotoMode = mediaMode === 'photo';

  const selectMediaFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPhotoMode || master.media.length < 2) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = Math.min(0.999, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    setActiveMedia(Math.floor(progress * master.media.length));
  };

  const openMaster = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest('button')) return;
    go('Master');
  };

  const textBlock = (
    <div className="srez-master-card__body">
      <div className="srez-master-card__head">
        <div><button type="button" className="srez-master-card__name" onClick={() => go('Master')}>{master.name}</button><div className="srez-master-card__meta">{master.place}</div></div>
        {!isPhotoMode ? <SaveButton saved={saved} onClick={onSave} /> : null}
      </div>
    </div>
  );

  return (
    <article className="srez-master-card">
      {isPhotoMode ? (
        <div
          className="srez-master-card__visual srez-master-card__visual--photo"
          role="button"
          tabIndex={0}
          aria-label={`Открыть профиль мастера ${master.name}`}
          onClick={openMaster}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') go('Master'); }}
          onPointerMove={selectMediaFromPointer}
          onPointerLeave={() => setActiveMedia(0)}
        >
          <Media index={master.media[activeMedia]} ratioOverride={0.82} />
          <span className="srez-master-card__photo-save"><SaveButton saved={saved} onClick={onSave} /></span>
        </div>
      ) : (
        <button type="button" className="srez-master-card__visual" aria-label={`Открыть профиль мастера ${master.name}`} onClick={() => go('Master')}>
          <div className="cosmos-collage">{master.media.slice(0,4).map((index, i) => <Media index={index} ratioOverride={1} key={`${index}-${i}`} />)}</div>
        </button>
      )}
      {textBlock}
    </article>
  );
}
