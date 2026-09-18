import { useLayoutEffect, useRef, useState } from 'react';
import type { DirectoryMaster } from '../../data/directoryMasters';
import { DirectoryMasterCard } from '../DirectoryMasterCard/DirectoryMasterCard';
import { Icon } from '../Icon/Icon';

type Props = {
  masters: readonly DirectoryMaster[];
  onOpen: (master: DirectoryMaster) => void;
};

export function PopularMasterCarousel({ masters, onOpen }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cycleWidthRef = useRef(0);
  const [accessibleCopy, setAccessibleCopy] = useState(1);
  const accessibleCopyRef = useRef(1);

  const updateAccessibleCopy = (copyIndex: number) => {
    if (accessibleCopyRef.current === copyIndex) return;
    accessibleCopyRef.current = copyIndex;
    setAccessibleCopy(copyIndex);
  };

  const measureCycle = () => {
    const track = trackRef.current;
    if (!track || masters.length === 0) return 0;
    const cards = track.querySelectorAll<HTMLElement>('.srez-master-directory-card');
    if (cards.length <= masters.length) return 0;
    return cards[masters.length].offsetLeft - cards[0].offsetLeft;
  };

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const centerOnMiddleCopy = () => {
      const cycleWidth = measureCycle();
      if (!cycleWidth) return;
      const previousCycleWidth = cycleWidthRef.current;
      const progress = previousCycleWidth
        ? ((track.scrollLeft % previousCycleWidth) + previousCycleWidth) % previousCycleWidth / previousCycleWidth
        : 0;
      cycleWidthRef.current = cycleWidth;
      track.scrollLeft = cycleWidth + progress * cycleWidth;
      updateAccessibleCopy(1);
    };

    centerOnMiddleCopy();
    const observer = new ResizeObserver(centerOnMiddleCopy);
    observer.observe(track);
    return () => observer.disconnect();
  }, [masters.length]);

  const keepLoopCentered = () => {
    const track = trackRef.current;
    const cycleWidth = cycleWidthRef.current || measureCycle();
    if (!track || !cycleWidth) return;

    let nextScrollLeft = track.scrollLeft;
    if (track.scrollLeft < cycleWidth * 0.5) {
      nextScrollLeft += cycleWidth;
    } else if (track.scrollLeft > cycleWidth * 1.5) {
      nextScrollLeft -= cycleWidth;
    } else {
      const centeredCopy = Math.max(0, Math.min(2, Math.floor((track.scrollLeft + track.clientWidth / 2) / cycleWidth)));
      updateAccessibleCopy(centeredCopy);
      return;
    }

    const previousBehavior = track.style.scrollBehavior;
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = nextScrollLeft;
    track.style.scrollBehavior = previousBehavior;
    const centeredCopy = Math.max(0, Math.min(2, Math.floor((nextScrollLeft + track.clientWidth / 2) / cycleWidth)));
    updateAccessibleCopy(centeredCopy);
  };

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.82, 760),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="srez-home-master-carousel">
      <div className="srez-home-master-carousel__viewport">
        <div
          ref={trackRef}
          className="srez-home-master-carousel__track"
          role="region"
          aria-roledescription="карусель"
          aria-label="Популярные мастера"
          onScroll={keepLoopCentered}
        >
          {[0, 1, 2].flatMap((copyIndex) =>
            masters.map((master, index) => (
              <DirectoryMasterCard
                master={master}
                index={index}
                instanceId={`carousel-${copyIndex}`}
                accessibilityClone={copyIndex !== accessibleCopy}
                onOpen={() => onOpen(master)}
                key={`${copyIndex}-${master.id}`}
              />
            )),
          )}
        </div>

        <button
          type="button"
          className="srez-home-master-carousel__arrow is-left"
          aria-label="Предыдущие мастера"
          data-tooltip="Предыдущие мастера"
          onClick={() => scroll(-1)}
        >
          <Icon name="arrow-left" size={18} />
        </button>
        <button
          type="button"
          className="srez-home-master-carousel__arrow is-right"
          aria-label="Следующие мастера"
          data-tooltip="Следующие мастера"
          onClick={() => scroll(1)}
        >
          <Icon name="arrow-right" size={18} />
        </button>
      </div>
    </div>
  );
}
