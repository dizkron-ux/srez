import { useState } from 'react';
import type { Master } from '../../types';
import { Icon } from '../Icon/Icon';
import { MasterPortfolioPreview } from '../MasterPortfolioPreview/MasterPortfolioPreview';

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
            <MasterPortfolioPreview master={item} />
          </div>
        ))}
      </div>
    </>
  );
}
