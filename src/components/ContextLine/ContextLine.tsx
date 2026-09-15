import { Icon } from '../Icon/Icon';

type Props = {
  eyebrow?: string;
  onBack: () => void;
  backLabel?: string;
};

export function ContextLine({ eyebrow, onBack, backLabel = 'Назад' }: Props) {
  return (
    <div className="srez-context-line">
      <button type="button" className="srez-back" onClick={onBack}><Icon name="arrow-left" size={14} />{backLabel}</button>
      {eyebrow ? <span className="srez-eyebrow">{eyebrow}</span> : null}
    </div>
  );
}
