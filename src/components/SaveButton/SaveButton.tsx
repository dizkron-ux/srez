import { IconButton } from '../IconButton/IconButton';

type Props = {
  saved: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export function SaveButton({ saved, onClick, disabled = false }: Props) {
  return (
    <IconButton
      icon={saved ? 'heart-filled' : 'heart'}
      iconSize={14}
      aria-label={saved ? 'Удалить из избранного' : 'Добавить в избранное'}
      selected={saved}
      className={`cosmos-save ${saved ? 'is-saved' : ''}`}
      onClick={onClick}
      disabled={disabled}
    />
  );
}
