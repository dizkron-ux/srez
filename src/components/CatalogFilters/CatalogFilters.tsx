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
  initialOpen?: boolean;
};

export function CatalogFilters({ initialOpen = false }: Props) {
  const [open, setOpen] = useState(initialOpen);
  const [selected, setSelected] = useState<Record<string, string[]>>(INITIAL_SELECTED);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
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
  const selectedCount = Object.values(selected).reduce((sum, values) => sum + values.length, 0);

  return (
    <div className="srez-catalog-filters" ref={rootRef}>
      <button
        type="button"
        className={`srez-catalog-filters__trigger ${selectedCount ? 'is-active' : ''}`}
        aria-label={selectedCount ? `Фильтры, выбрано ${selectedCount}` : 'Фильтры'}
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        <Icon name="sliders" size={18} />
        {selectedCount ? <span>{selectedCount}</span> : null}
      </button>

      {open ? (
        <div className="srez-catalog-filters__popover" role="dialog" aria-label="Фильтры мастеров">
          <div className="srez-catalog-filters__top">
            <strong>Фильтры</strong>
            {selectedCount ? <button type="button" onClick={clear}>Сбросить</button> : null}
          </div>

          <div className="srez-catalog-filters__groups">
            {GROUPS.map(group => {
              const values = selected[group.id] ?? [];
              return (
                <section className="srez-catalog-filters__group" key={group.id}>
                  <span className="srez-catalog-filters__label">{group.label}</span>
                  <div className="srez-catalog-filters__options">
                    {group.options.map(option => {
                      const active = values.includes(option);
                      return (
                        <button
                          type="button"
                          className={`srez-catalog-filters__option ${active ? 'is-active' : ''}`}
                          aria-pressed={active}
                          onClick={() => toggleOption(group.id, option)}
                          key={option}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <button type="button" className="srez-catalog-filters__done" onClick={() => setOpen(false)}>Готово</button>
        </div>
      ) : null}
    </div>
  );
}
