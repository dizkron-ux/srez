import type { CSSProperties } from 'react';
import { LOOKS } from '../../data/looks';

type Props = { index: number; ratioOverride?: number; className?: string };

type MediaStyle = CSSProperties & {
  '--a': string;
  '--b': string;
  '--c': string;
};

export function Media({ index, ratioOverride, className = '' }: Props) {
  const look = LOOKS[index % LOOKS.length];
  const ratio = ratioOverride ?? look.ratio;
  const style: MediaStyle = {
    '--a': look.colors[0],
    '--b': look.colors[1],
    '--c': look.colors[2],
    aspectRatio: `${ratio} / 1`,
  };
  return <div className={`preview-media ${className}`.trim()} style={style} aria-hidden="true" />;
}
