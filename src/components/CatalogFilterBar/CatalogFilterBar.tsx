import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';

type Group = {
  id: string;
  label: string;
  options: string[];
};

const GROUPS: Group[] = [
  { id: 'hair', label: 'Тип волос', options: ['Прямые', 'Волнистые', 'Кудрявые', 'Тонкие'] },
  { id: 'length', label: 'Длина', options: ['Короткая', 'Средняя', 'Длинная'] },
  { id: 'style', label: 'Стиль', options: ['Классика', 'Clean', 'Alternative', 'Textured'] },
  { id: 'proof', label: 'Подтверждение', options: ['Есть релевантная работа'] },
  { id: 'data', label: 'Данные', options: ['Цена указана'] },
];

const INITIAL_SELECTED: Record<string, string[]> = {
  hair: ['Волнистые'],
  length: ['Средняя'],
  style: [],
  proof: ['Есть релевантная работа'],
  data: [],
};

type Props = {
  initialOpen?: string | null;
};

export function CatalogFilterBar({ initialOpen = null }: Props) {
  const [open, setOpen] = useState<string | null>(initialOpen);
  const [selected, setSelected] = useState<Record<string, string[]>>(INITIAL_SELECTED);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const toggleOption = (groupId: string, option: string) => {
    setSelected(current => {
      const values = current[groupId] ?? [];
      const next = values.includes(option) ? values.filter(value => value !== option) : [...values, option];
      return { ...current, [groupId]: next };
    });
  };

  const clear = () => setSelected(Object.fromEntries(GROUPS.map(group => [group.id, []])));
  const hasSelections = Object.values(selected).some(values => values.length > 0);

  return (
    <div className="srez-catalog-filterbar" ref={rootRef}>
      <div className="srez-catalog-filterbar__scroll">
        {GROUPS.map(group => {
          const values = selected[group.id] ?? [];
          const isOpen = open === group.id;
          const label = values.length === 1 ? `${group.label}: ${values[0]}` : values.length > 1 ? `${group.label} · ${values.length}` : group.label;
          return (
            <div className="srez-catalog-filter" key={group.id}>
              <button
                type="button"
                className={`srez-catalog-filter__trigger ${values.length ? 'is-selected' : ''}`}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : group.id)}
              >
                <span>{label}</span>
                <Icon name="chevron-down" size={14} />
              </button>
              {isOpen ? (
                <div className="srez-catalog-filter__menu" role="menu" aria-label={group.label}>
                  {group.options.map(option => {
                    const active = values.includes(option);
                    return (
                      <button
                        type="button"
                        className={`srez-catalog-filter__option ${active ? 'is-active' : ''}`}
                        role="menuitemcheckbox"
                        aria-checked={active}
                        onClick={() => toggleOption(group.id, option)}
                        key={option}
                      >
                        <span>{option}</span>
                        <span className="srez-catalog-filter__check" aria-hidden="true">{active ? '✓' : ''}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {hasSelections ? <button type="button" className="srez-catalog-filterbar__clear" onClick={clear}>Сбросить</button> : null}
    </div>
  );
}
