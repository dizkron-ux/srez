import { useEffect, useRef } from 'react';
import { Icon } from '../Icon/Icon';

type Props = {
  open: boolean;
  close: () => void;
  save: () => void;
};

export function CityPopover({ open, close, save }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      if (rootRef.current?.contains(target) || target.closest('[aria-controls="srez-city-popover"]')) return;
      close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, open]);

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      id="srez-city-popover"
      className="srez-city-popover"
      role="dialog"
      aria-modal="false"
      aria-labelledby="srez-city-popover-title"
    >
      <div className="srez-city-popover__topline">
        <span className="srez-kicker">Другой город</span>
        <button className="srez-city-popover__close" type="button" onClick={close} aria-label="Закрыть выбор города" data-tooltip="Закрыть">
          <Icon name="close" size={20} />
        </button>
      </div>
      <h2 id="srez-city-popover-title">Пока работаем только в Москве</h2>
      <p>Напиши свой город — это поможет понять, куда запускаться дальше.</p>
      <div className="srez-city-popover__form">
        <input className="srez-city-popover__input" placeholder="Например, Санкт-Петербург" aria-label="Город" />
        <button className="srez-city-popover__submit" type="button" onClick={save}>Отправить</button>
      </div>
    </div>
  );
}
