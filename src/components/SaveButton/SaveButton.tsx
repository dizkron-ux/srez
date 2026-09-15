import { Icon } from '../Icon/Icon';

type Props = {
  saved: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export function SaveButton({ saved, onClick, disabled = false }: Props) {
  return (
    <button
      type="button"
      className={`cosmos-save ${saved ? 'is-saved' : ''}`}
      onClick={onClick}
      aria-pressed={saved}
      disabled={disabled}
    >
      <Icon name={saved ? 'heart-filled' : 'heart'} size={14} />
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  );
}
