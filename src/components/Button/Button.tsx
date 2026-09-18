import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'sm',
  icon,
  iconPosition = 'start',
  className = '',
  children,
  type = 'button',
  ...props
}: Props) {
  return (
    <button type={type} className={`cosmos-button cosmos-button--${variant} cosmos-button--${size} ${className}`.trim()} {...props}>
      {icon && iconPosition === 'start' ? <Icon name={icon} size={size === 'lg' ? 18 : 16} /> : null}
      {children}
      {icon && iconPosition === 'end' ? <Icon name={icon} size={size === 'lg' ? 18 : 16} /> : null}
    </button>
  );
}
