import { memo } from 'react';
import { Media } from '../Media/Media';
import type { DirectoryMaster } from '../../data/directoryMasters';

type Props = {
  master: DirectoryMaster;
  index: number;
  active?: boolean;
  instanceId?: string;
  accessibilityClone?: boolean;
  onActivate?: (masterId: string) => void;
  onOpen: () => void;
};

export const DirectoryMasterCard = memo(function DirectoryMasterCard({
  master,
  index,
  active = false,
  instanceId,
  accessibilityClone = false,
  onActivate,
  onOpen,
}: Props) {
  const preventCloneFocus = accessibilityClone
    ? (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()
    : undefined;

  return (
    <article
      id={`directory-${master.id}${instanceId ? `-${instanceId}` : ''}`}
      className={`srez-master-directory-card ${active ? 'is-active' : ''}`}
      aria-hidden={accessibilityClone || undefined}
      onMouseEnter={accessibilityClone ? undefined : () => onActivate?.(master.id)}
      onFocusCapture={accessibilityClone ? undefined : () => onActivate?.(master.id)}
    >
      <div className="srez-master-directory-card__header">
        <button
          type="button"
          className="srez-master-directory-card__profile"
          onClick={onOpen}
          onMouseDown={preventCloneFocus}
          tabIndex={accessibilityClone ? -1 : undefined}
          aria-label={`Открыть профиль мастера ${master.name}`}
        >
          <img
            className="srez-master-directory-card__photo"
            src={master.photo}
            alt=""
            width="96"
            height="96"
            loading={!accessibilityClone && index < 6 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="srez-master-directory-card__identity-copy">
            <strong>{master.name}</strong>
            <span>{master.specialty}</span>
            <small>{master.place}</small>
          </span>
        </button>

        <div className="srez-master-directory-card__controls">
          <span
            className="srez-master-directory-card__rating"
            aria-label={`Рейтинг ${master.rating} из 5, ${master.reviewCount} отзывов`}
          >
            <span aria-hidden="true">★</span>
            <strong>{master.rating.toFixed(1)}</strong>
            <span>({master.reviewCount})</span>
          </span>
        </div>
      </div>

      <button
        type="button"
        className="srez-master-directory-card__works"
        onClick={onOpen}
        onMouseDown={preventCloneFocus}
        tabIndex={accessibilityClone ? -1 : undefined}
        aria-label={`Открыть работы мастера ${master.name}`}
      >
        {master.media.map((mediaIndex, mediaItemIndex) => (
          <span className="srez-master-directory-card__work" key={`${master.id}-work-${mediaItemIndex}`}>
            <Media index={mediaIndex} ratioOverride={1} />
          </span>
        ))}
      </button>

    </article>
  );
});
