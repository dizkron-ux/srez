import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

type Props = { open: boolean; close: () => void; save: () => void };

export function CityModal({ open, close, save }: Props) {
  if (!open) return null;
  return (
    <div className="srez-modal-bg">
      <div className="srez-modal" role="dialog" aria-modal="true" aria-labelledby="srez-city-modal-title">
        <div className="srez-modal-top"><div><span className="srez-eyebrow">Другой город</span><h3 id="srez-city-modal-title">Пока работаем только в Москве</h3></div><button type="button" className="cosmos-icon-button" aria-label="Закрыть" onClick={close}><Icon name="close" size={16} /></button></div>
        <p>Напиши свой город — это поможет понять, где СРЕЗ нужен следующим.</p>
        <div className="srez-city-input"><input aria-label="Город" placeholder="Например, Санкт-Петербург" /><Button onClick={save}>Отправить</Button></div>
      </div>
    </div>
  );
}
