import { Media } from '../Media/Media';

type Props = {
  index: number;
  ratio: number;
  onOpen: () => void;
};

export function WorkCard({ index, ratio, onOpen }: Props) {
  return (
    <article className="srez-work-card">
      <button type="button" className="srez-work-card__visual" aria-label={`Открыть работу ${index + 1}`} onClick={onOpen}>
        <Media index={index} ratioOverride={ratio} />
      </button>
    </article>
  );
}
