import type { Master } from '../../types';
import { Media } from '../Media/Media';

type Props = {
  master: Master;
  className?: string;
};

export function MasterPortfolioPreview({ master, className = '' }: Props) {
  return (
    <div className={`srez-look-detail__portfolio ${className}`.trim()} aria-hidden="true" data-qa-ignore>
      <div className="srez-look-detail__portfolio-media">
        {master.media.slice(0, 2).map((mediaIndex, mediaItemIndex) => (
          <Media index={mediaIndex} ratioOverride={1.38} key={`${master.name}-${mediaItemIndex}`} />
        ))}
      </div>
      <div className="srez-look-detail__portfolio-meta">
        <div className="srez-look-detail__portfolio-avatar">{master.name.slice(0, 1)}</div>
        <div>
          <strong>{master.name}</strong>
          <span>{master.shop} · портфолио</span>
        </div>
      </div>
    </div>
  );
}
