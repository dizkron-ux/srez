import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';
import type { Look } from '../../types';

type Props = { look: Look; index: number; onOpen: (index: number) => void };

export function LookCard({ look, index, onOpen }: Props) {
  return (
    <article className="srez-look">
      <button type="button" className="srez-look__media" aria-label={`Открыть ${look.name}`} onClick={() => onOpen(index)}>
        <Media index={index} />
        <span className="srez-look__open">открыть <Icon name="arrow-up-right" size={13} /></span>
      </button>
      <button type="button" className="srez-look__title" onClick={() => onOpen(index)}>{look.name}</button>
    </article>
  );
}
