import type { FormEvent } from 'react';
import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';

type Props = {
  selectedLook?: string | null;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit?: () => void;
  onPhoto: () => void;
};

export function CatalogSearch({ selectedLook, query, onQueryChange, onSubmit, onPhoto }: Props) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className="srez-catalog-search" role="search" onSubmit={submit}>
      <div className={`srez-catalog-search__scope ${selectedLook ? 'has-look' : ''}`}>
        {selectedLook ? (
          <span className="srez-catalog-search__thumb"><Media index={0} ratioOverride={1} /></span>
        ) : (
          <span className="srez-catalog-search__scope-mark">С</span>
        )}
        <span className="srez-catalog-search__scope-label">{selectedLook ?? 'Мастера'}</span>
      </div>
      <input
        value={query}
        onChange={event => onQueryChange(event.target.value)}
        aria-label="Поиск мастеров по стрижке, типу волос или стилю"
        placeholder={selectedLook ? `Искать внутри ${selectedLook}…` : 'Поиск по стрижке, типу волос или стилю…'}
      />
      <button type="button" className="srez-catalog-search__icon" onClick={onPhoto} aria-label="Найти по фотографии">
        <Icon name="image" size={18} />
      </button>
    </form>
  );
}
