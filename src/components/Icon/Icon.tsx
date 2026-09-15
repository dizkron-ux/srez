import type { SVGProps } from 'react';

export type IconName = 'search' | 'image' | 'arrow-right' | 'arrow-left' | 'arrow-up-right' | 'heart' | 'heart-filled' | 'close' | 'chevron-down' | 'sliders' | 'share';

type Props = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 16, className = '', ...props }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const body = {
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.25 4.25"/></>,
    image: <><rect x="3.5" y="4" width="17" height="16" rx="2.5"/><circle cx="9" cy="9" r="1.5"/><path d="m5.5 17 4.2-4.2 3.2 3.2 2.1-2.1 3.5 3.1"/></>,
    'arrow-right': <><path d="M5 12h13"/><path d="m14 7 5 5-5 5"/></>,
    'arrow-left': <><path d="M19 12H6"/><path d="m10 7-5 5 5 5"/></>,
    'arrow-up-right': <><path d="M7 17 17 7"/><path d="M9 7h8v8"/></>,
    heart: <path d="M20.8 5.9a5.2 5.2 0 0 0-7.4 0L12 7.3l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 22l8.8-8.7a5.2 5.2 0 0 0 0-7.4Z"/>,
    'heart-filled': <path fill="currentColor" stroke="none" d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.51L12 21.35Z"/>,
    close: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
    'chevron-down': <path d="m7 9 5 5 5-5"/>,
    sliders: <><path d="M4 7h10"/><path d="M18 7h2"/><circle cx="16" cy="7" r="2"/><path d="M4 17h2"/><path d="M10 17h10"/><circle cx="8" cy="17" r="2"/></>,
    share: <><path d="M12 16V3"/><path d="m7 8 5-5 5 5"/><path d="M5 13v6h14v-6"/></>,
  }[name];

  return (
    <svg className={`srez-icon ${className}`.trim()} {...common} aria-hidden="true" focusable="false" {...props}>
      {body}
    </svg>
  );
}
