import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({ variant = 'primary', size = 'sm', className = '', children, type = 'button', ...props }: Props) {
  return (
    <button type={type} className={`cosmos-button cosmos-button--${variant} cosmos-button--${size} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
