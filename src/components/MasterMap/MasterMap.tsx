import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { DirectoryMaster } from '../../data/directoryMasters';

const MOSCOW_CENTER: [number, number] = [37.6173, 55.7558];

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
  return `${count} ${noun} в Москве`;
}

type Props = {
  masters: readonly DirectoryMaster[];
  activeMasterId: string | null;
  onSelect: (masterId: string) => void;
};

export function MasterMap({ masters, activeMasterId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerElementsRef = useRef(new Map<string, HTMLButtonElement>());
  const selectRef = useRef(onSelect);

  useEffect(() => {
    selectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: MOSCOW_CENTER,
      zoom: 10.3,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    let resizeFrame = 0;
    const requestResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => map.resize());
    };
    const resizeObserver = new ResizeObserver(requestResize);
    resizeObserver.observe(containerRef.current);
    requestResize();

    masters.forEach(master => {
      const marker = document.createElement('button');
      marker.type = 'button';
      marker.className = 'srez-master-map__marker';
      marker.setAttribute('aria-label', `${master.name}, рейтинг ${master.rating.toFixed(1)}`);
      const markerLabel = document.createElement('span');
      markerLabel.textContent = master.rating.toFixed(1);
      marker.append(markerLabel);
      marker.addEventListener('click', event => {
        event.stopPropagation();
        selectRef.current(master.id);
      });

      new maplibregl.Marker({ element: marker, anchor: 'bottom' })
        .setLngLat([master.coordinates[0], master.coordinates[1]])
        .addTo(map);

      markerElementsRef.current.set(master.id, marker);
    });

    mapRef.current = map;
    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(resizeFrame);
      map.remove();
      mapRef.current = null;
      markerElementsRef.current.clear();
    };
  }, [masters]);

  useEffect(() => {
    markerElementsRef.current.forEach((element, masterId) => {
      const active = masterId === activeMasterId;
      element.classList.toggle('is-active', active);
      element.setAttribute('aria-pressed', String(active));
    });
  }, [activeMasterId]);

  return (
    <div className="srez-master-map" aria-label="Карта мастеров Москвы">
      <div className="srez-master-map__canvas" ref={containerRef} />
      <div className="srez-master-map__legend" aria-hidden="true">{formatMasterCount(masters.length)}</div>
    </div>
  );
}
