import { Button } from '../Button/Button';
import type { Screen } from '../../types';

type Props = { go: (screen: Screen) => void };

export function SearchComposer({ go }: Props) {
  return (
    <div className="srez-search-row">
      <div className="srez-search-composer">
        <label className="cosmos-search">
          <span>⌕</span>
          <input placeholder="Например, mullet, mod cut или кудрявые волосы" />
        </label>
        <div className="srez-search-actions">
          <Button variant="ghost" onClick={() => go('Photo')}>▧ Есть фото</Button>
          <Button onClick={() => go('Catalog')}>Найти →</Button>
        </div>
      </div>
    </div>
  );
}
