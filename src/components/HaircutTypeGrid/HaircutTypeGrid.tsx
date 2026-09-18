import type { MasterCollection } from '../../data/masterCollections';
import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';

type Props = {
  collections: readonly MasterCollection[];
  onSelect: (collection: MasterCollection) => void;
};

export function HaircutTypeGrid({ collections, onSelect }: Props) {
  return (
    <ul className="srez-haircut-type-grid">
      {collections.map(collection => (
        <li key={collection.id}>
          <button
            type="button"
            className="srez-haircut-type-tile"
            aria-label={`Найти мастеров: ${collection.title}`}
            onClick={() => onSelect(collection)}
          >
            <span className="srez-haircut-type-tile__visual" aria-hidden="true">
              <Media index={collection.media[0]} ratioOverride={1.42} />
            </span>
            <span className="srez-haircut-type-tile__caption">
              <strong>{collection.title}</strong>
              <Icon name="arrow-up-right" size={16} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
