import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';
import type { Look } from '../../types';

type Props = {
  look: Look;
  index: number;
  onClick: () => void;
};

export function LookEntityCard({ look, index, onClick }: Props) {
  return (
    <button type="button" className="srez-look-entity-card" onClick={onClick}>
      <span className="srez-look-entity-card__media">
        <Media index={index} ratioOverride={1} />
      </span>
      <span className="srez-look-entity-card__copy">
        <strong>{look.name}</strong>
        <span>{look.description}</span>
      </span>
      <Icon name="arrow-up-right" size={15} />
    </button>
  );
}
