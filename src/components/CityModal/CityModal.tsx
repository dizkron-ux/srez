import { Button } from '../Button/Button';

type Props = { open: boolean; close: () => void; save: () => void };

export function CityModal({ open, close, save }: Props) {
  if (!open) return null;
  return (
    <div className="srez-modal-bg">
      <div className="srez-modal">
        <div className="srez-modal-top"><div><span className="srez-eyebrow">Другой город</span><h3>Пока работаем только в Москве</h3></div><button className="cosmos-icon-button" onClick={close}>×</button></div>
        <p>Напиши свой город — это поможет понять, где СРЕЗ нужен следующим.</p>
        <div className="srez-city-input"><input placeholder="Например, Санкт-Петербург" /><Button onClick={save}>Отправить</Button></div>
      </div>
    </div>
  );
}
