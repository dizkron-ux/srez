type Props = {
  city: string;
  onClick: () => void;
};

export function RegionSelector({ city, onClick }: Props) {
  return (
    <div className="srez-region">
      <span className="srez-region__label">Город</span>
      <button type="button" className="srez-region__city" aria-haspopup="dialog" onClick={onClick}>{city}</button>
    </div>
  );
}
