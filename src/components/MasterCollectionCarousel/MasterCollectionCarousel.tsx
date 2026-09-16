import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { MasterCollection } from '../../data/masterCollections';
import { Icon } from '../Icon/Icon';
import { Media } from '../Media/Media';

type Props = {
  collections: readonly MasterCollection[];
  selectedLookId?: string | null;
  onSelect: (collection: MasterCollection) => void;
};

function formatMasterCount(count: number) {
  const lastTwo = count % 100;
  const last = count % 10;
  const noun = lastTwo >= 11 && lastTwo <= 14
    ? 'мастеров'
    : last === 1
      ? 'мастер'
      : last >= 2 && last <= 4
        ? 'мастера'
        : 'мастеров';

  return `${count} ${noun}`;
}

export function MasterCollectionCarousel({ collections, selectedLookId = null, onSelect }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 2);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    return () => observer.disconnect();
  }, [collections.length]);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.82, 760),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const track = event.currentTarget;
    dragRef.current = { active: true, moved: false, startX: event.clientX, startScroll: track.scrollLeft };
    setIsDragging(true);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = event.clientX - dragRef.current.startX;
    if (!dragRef.current.moved && Math.abs(delta) > 4) {
      dragRef.current.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (dragRef.current.moved) event.preventDefault();
    event.currentTarget.scrollLeft = dragRef.current.startScroll - delta;
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    suppressClickRef.current = dragRef.current.moved;
    dragRef.current.active = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    window.requestAnimationFrame(() => { suppressClickRef.current = false; });
  };

  const select = (collection: MasterCollection) => {
    if (suppressClickRef.current) return;
    onSelect(collection);
  };

  return (
    <section className="srez-master-collections" aria-label="Подборки мастеров">
      <div className="srez-master-collections__viewport">
        <div
          ref={trackRef}
          className={`srez-master-collections__track ${isDragging ? 'is-dragging' : ''}`}
          role="region"
          aria-roledescription="карусель"
          aria-label="Подборки мастеров по типам стрижек"
          onScroll={updateScrollState}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          {collections.map(collection => {
            const selected = collection.lookId === selectedLookId;
            return (
              <button
                type="button"
                className={`srez-master-collection-card ${selected ? 'is-selected' : ''}`}
                aria-pressed={selected}
                onClick={() => select(collection)}
                key={collection.id}
              >
                <span className="srez-master-collection-card__visual" aria-hidden="true">
                  {collection.media.map((mediaIndex, index) => (
                    <span className="srez-master-collection-card__panel" key={`${collection.id}-${mediaIndex}-${index}`}>
                      <Media index={mediaIndex} ratioOverride={1} />
                    </span>
                  ))}
                </span>
                <span className="srez-master-collection-card__caption">
                  <strong>{collection.title}</strong>
                  <span>{formatMasterCount(collection.masterCount)}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="srez-master-collections__arrow is-left"
          aria-label="Предыдущие подборки"
          disabled={!canScrollLeft}
          onClick={() => scroll(-1)}
        >
          <Icon name="arrow-left" size={18} />
        </button>
        <button
          type="button"
          className="srez-master-collections__arrow is-right"
          aria-label="Следующие подборки"
          disabled={!canScrollRight}
          onClick={() => scroll(1)}
        >
          <Icon name="arrow-right" size={18} />
        </button>
      </div>
    </section>
  );
}
