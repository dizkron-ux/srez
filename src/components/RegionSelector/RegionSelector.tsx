type Props = {
  city: string;
  open?: boolean;
  onClick: () => void;
};

export function RegionSelector({ city, open = false, onClick }: Props) {
  return (
    <div className="srez-region">
      <span className="srez-region__label">Город</span>
      <button
        type="button"
        className="srez-region__city"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="srez-city-popover"
        onClick={onClick}
      >
        {city}
      </button>
    </div>
  );
}
