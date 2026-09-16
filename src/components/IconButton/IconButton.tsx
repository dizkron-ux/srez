import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon/Icon';

export type IconButtonVariant = 'surface' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: IconName;
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  iconSize?: number;
  selected?: boolean;
};

export function IconButton({
  icon,
  'aria-label': ariaLabel,
  variant = 'surface',
  size = 'lg',
  iconSize,
  selected,
  className = '',
  type = 'button',
  ...props
}: Props) {
  const resolvedIconSize = iconSize ?? (size === 'sm' ? 12 : size === 'md' ? 16 : 18);

  return (
    <button
      type={type}
      className={`cosmos-icon-button cosmos-icon-button--${variant} cosmos-icon-button--${size} ${selected ? 'is-selected' : ''} ${className}`.trim()}
      aria-label={ariaLabel}
      aria-pressed={selected === undefined ? props['aria-pressed'] : selected}
      {...props}
    >
      <Icon name={icon} size={resolvedIconSize} />
    </button>
  );
}
