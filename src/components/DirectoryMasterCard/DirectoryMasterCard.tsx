import { Media } from '../Media/Media';
import type { DirectoryMaster } from '../../data/directoryMasters';

type Props = {
  master: DirectoryMaster;
  index: number;
  active?: boolean;
  onActivate?: (masterId: string) => void;
  onOpen: () => void;
};

export function DirectoryMasterCard({
  master,
  index,
  active = false,
  onActivate,
  onOpen,
}: Props) {
  return (
    <article
      id={`directory-${master.id}`}
      className={`srez-master-directory-card ${active ? 'is-active' : ''}`}
      onMouseEnter={() => onActivate?.(master.id)}
      onFocusCapture={() => onActivate?.(master.id)}
    >
      <div className="srez-master-directory-card__header">
        <button
          type="button"
          className="srez-master-directory-card__profile"
          onClick={onOpen}
          aria-label={`Открыть профиль мастера ${master.name}`}
        >
          <img
            className="srez-master-directory-card__photo"
            src={master.photo}
            alt=""
            loading={index < 6 ? 'eager' : 'lazy'}
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
}
