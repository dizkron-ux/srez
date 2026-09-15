import { useEffect, useRef, useState } from 'react';
import type { DragEvent, FormEvent } from 'react';
import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';

const PHRASES = [
  'mullet на волнистые волосы',
  'wolf cut с длинной чёлкой',
  'стрижка без сложной укладки',
  'мастер по кудрявым волосам',
];

type Props = {
  selectedLook?: string | null;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit?: () => void;
};

type PhotoReference = {
  name: string;
  url: string;
};

export function CatalogSearch({ selectedLook, query, onQueryChange, onSubmit }: Props) {
  const [focused, setFocused] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [photo, setPhoto] = useState<PhotoReference | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const rootRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!query && !photoOpen) setPhraseIndex(current => (current + 1) % PHRASES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [query, photoOpen]);

  useEffect(() => () => {
    if (photo?.url) URL.revokeObjectURL(photo.url);
  }, [photo]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  const useFile = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPhoto(current => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return { name: file.name, url };
    });
    setPhotoOpen(false);
    setFocused(true);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    useFile(event.dataTransfer.files?.[0]);
  };

  const removePhoto = () => {
    setPhoto(current => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return null;
    });
  };

  const onBlur = () => {
    window.requestAnimationFrame(() => {
      if (!rootRef.current?.contains(document.activeElement)) setFocused(false);
    });
  };

  const showSearchIcon = !selectedLook && !photo;

  return (
    <form
      ref={rootRef}
      className={`srez-catalog-search ${focused ? 'is-focused' : ''} ${photoOpen ? 'has-panel' : ''}`}
      role="search"
      onSubmit={submit}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
    >
      <div className="srez-catalog-search__tokens">
        {selectedLook ? (
          <div className="srez-catalog-search__scope has-look">
            <span className="srez-catalog-search__thumb"><Media index={0} ratioOverride={1} /></span>
            <span className="srez-catalog-search__scope-label">{selectedLook}</span>
          </div>
        ) : null}

        {photo ? (
          <div className="srez-catalog-search__photo-token">
            <img src={photo.url} alt="" />
            <span>По фото</span>
            <button type="button" onClick={removePhoto} aria-label="Убрать фото из поиска"><Icon name="close" size={12} /></button>
          </div>
        ) : null}
      </div>

      {showSearchIcon ? <Icon name="search" size={18} className="srez-catalog-search__search-icon" /> : null}

      <div className="srez-catalog-search__input-wrap">
        <input
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          aria-label="Поиск мастеров по стрижке, типу волос или стилю"
          placeholder=""
        />
        {!query ? (
          <span className="srez-catalog-search__animated-placeholder" key={phraseIndex} aria-hidden="true">
            {selectedLook ? `Уточнить: ${PHRASES[phraseIndex]}` : `Например, ${PHRASES[phraseIndex]}`}
          </span>
        ) : null}
      </div>

      <button
        type="button"
        className={`srez-catalog-search__icon ${photoOpen ? 'is-active' : ''}`}
        onClick={() => setPhotoOpen(value => !value)}
        aria-label="Найти по фотографии"
        aria-expanded={photoOpen}
      >
        <Icon name="image" size={18} />
      </button>

      {photoOpen ? (
        <div className="srez-catalog-search__visual-panel">
          <div className="srez-catalog-search__visual-head">
            <div>
              <strong>Поиск по фото</strong>
              <span>{selectedLook ? `Фото можно сочетать с ${selectedLook}` : 'Добавь референс — поиск останется в этой строке'}</span>
            </div>
            <button type="button" onClick={() => setPhotoOpen(false)} aria-label="Закрыть"><Icon name="close" size={15} /></button>
          </div>
          <div
            className={`srez-catalog-search__dropzone ${dragActive ? 'is-dragging' : ''}`}
            onDragEnter={event => { event.preventDefault(); setDragActive(true); }}
            onDragOver={event => event.preventDefault()}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
          >
            <Icon name="image" size={20} />
            <strong>Перетащи изображение сюда</strong>
            <span>или выбери файл с устройства</span>
            <button type="button" onClick={() => fileInputRef.current?.click()}>Выбрать фото</button>
          </div>
          <input
            ref={fileInputRef}
            className="srez-catalog-search__file"
            type="file"
            accept="image/*"
            onChange={event => useFile(event.target.files?.[0])}
            tabIndex={-1}
          />
        </div>
      ) : null}
    </form>
  );
}
