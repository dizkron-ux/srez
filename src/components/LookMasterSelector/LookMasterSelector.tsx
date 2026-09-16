import { useState } from 'react';
import type { Master } from '../../types';
import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';

type Props = {
  masters: Master[];
  onOpenMaster: () => void;
};

export function LookMasterSelector({ masters, onOpenMaster }: Props) {
  const [activeMaster, setActiveMaster] = useState(0);

  return (
    <>
      <div className="srez-look-detail__masters-label">Мастера</div>
      <div className="srez-look-detail__masters">
        {masters.map((item, index) => (
          <div className="srez-look-detail__master-wrap" key={item.name}>
            <button
              type="button"
              className={`srez-look-detail__master ${index === activeMaster ? 'is-active' : ''}`}
              data-qa-ignore
              onMouseEnter={() => setActiveMaster(index)}
              onFocus={() => setActiveMaster(index)}
              onClick={onOpenMaster}
            >
              <span className="srez-look-detail__master-avatar">{item.name.slice(0, 1)}</span>
              <span className="srez-look-detail__master-copy">
                <strong>{item.name}</strong>
                <span>{item.place}</span>
              </span>
              <Icon name="arrow-up-right" size={15} />
            </button>
            <div className="srez-look-detail__portfolio" aria-hidden="true" data-qa-ignore>
              <div className="srez-look-detail__portfolio-media">
                {item.media.slice(0, 2).map((mediaIndex, mediaItemIndex) => (
                  <Media index={mediaIndex} ratioOverride={1.38} key={`${item.name}-${mediaItemIndex}`} />
                ))}
              </div>
              <div className="srez-look-detail__portfolio-meta">
                <div className="srez-look-detail__portfolio-avatar">{item.name.slice(0, 1)}</div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.shop} · портфолио</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
