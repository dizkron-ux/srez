type Props = {
  city: string;
  onClick: () => void;
};

export function RegionSelector({ city, onClick }: Props) {
  return (
    <div className="srez-region">
      <span className="srez-region__label">Город</span>
      <button className="srez-region__city" onClick={onClick}>{city}</button>
    </div>
  );
}
