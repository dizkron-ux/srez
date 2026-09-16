import { Media } from '../Media/Media';

type Props = {
  index: number;
  ratio: number;
  onOpen: () => void;
};

export function WorkCard({ index, ratio, onOpen }: Props) {
  return (
    <article className="srez-work-card">
      <button type="button" className="srez-work-card__visual" onClick={onOpen}>
        <Media index={index} ratioOverride={ratio} />
      </button>
    </article>
  );
}
