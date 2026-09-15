import { Media } from '../Media/Media';
import type { Look } from '../../types';

type Props = { look: Look; index: number; onOpen: (index: number) => void };

export function LookCard({ look, index, onOpen }: Props) {
  return (
    <article className="srez-look">
      <button className="srez-look__media" onClick={() => onOpen(index)}>
        <Media index={index} />
        <span className="srez-look__open">открыть ↗</span>
      </button>
      <button className="srez-look__title" onClick={() => onOpen(index)}>{look.name}</button>
    </article>
  );
}
