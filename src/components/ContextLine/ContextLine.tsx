type Props = {
  eyebrow: string;
  onBack: () => void;
  backLabel?: string;
};

export function ContextLine({ eyebrow, onBack, backLabel = '← Назад' }: Props) {
  return (
    <div className="srez-context-line">
      <button className="srez-back" onClick={onBack}>{backLabel}</button>
      <span className="srez-eyebrow">{eyebrow}</span>
    </div>
  );
}
