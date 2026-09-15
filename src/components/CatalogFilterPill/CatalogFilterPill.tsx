import { Icon } from '../Icon/Icon';

type Props = {
  label: string;
  active?: boolean;
  open?: boolean;
  dropdown?: boolean;
  onClick: () => void;
  ariaLabel?: string;
};

export function CatalogFilterPill({
  label,
  active = false,
  open = false,
  dropdown = false,
  onClick,
  ariaLabel,
}: Props) {
  return (
    <button
      type="button"
      className={`srez-catalog-filter-pill ${active ? 'is-active' : ''} ${open ? 'is-open' : ''}`.trim()}
      aria-label={ariaLabel}
      aria-expanded={dropdown ? open : undefined}
      aria-pressed={!dropdown ? active : undefined}
      onClick={onClick}
    >
      <span>{label}</span>
      {dropdown ? <Icon name="chevron-down" size={16} /> : null}
    </button>
  );
}
