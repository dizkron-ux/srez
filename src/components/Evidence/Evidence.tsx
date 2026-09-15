import type { Master } from '../../types';

type Props = { master: Master };

export function Evidence({ master }: Props) {
  return (
    <div className="srez-match">
      <div className="srez-match-head"><span>Почему подходит</span><span>{master.proof.length}</span></div>
      {master.proof.map(([label, detail]) => (
        <div className="srez-proof-row" key={`${label}-${detail}`}><b>{label}</b><span>{detail}</span></div>
      ))}
    </div>
  );
}
