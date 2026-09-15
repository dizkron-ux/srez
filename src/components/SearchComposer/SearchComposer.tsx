import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import type { Screen } from '../../types';

type Props = { go: (screen: Screen) => void };

export function SearchComposer({ go }: Props) {
  return (
    <div className="srez-search-row">
      <div className="srez-search-composer">
        <label className="cosmos-search">
          <Icon name="search" size={16} />
          <input aria-label="Поиск по стрижке, типу волос или стилю" placeholder="Например, mullet, mod cut или кудрявые волосы" />
        </label>
        <div className="srez-search-actions">
          <Button variant="ghost" onClick={() => go('Photo')}><Icon name="image" size={15} />Есть фото</Button>
          <Button onClick={() => go('Catalog')}>Найти<Icon name="arrow-right" size={15} /></Button>
        </div>
      </div>
    </div>
  );
}
