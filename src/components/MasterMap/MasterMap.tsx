import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { DirectoryMaster } from '../../data/directoryMasters';

const MOSCOW_CENTER: [number, number] = [37.6173, 55.7558];

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

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);
    requestAnimationFrame(() => map.resize());

    masters.forEach(master => {
      const marker = document.createElement('button');
      marker.type = 'button';
      marker.className = 'srez-master-map__marker';
      marker.setAttribute('aria-label', `${master.name}, рейтинг ${master.rating.toFixed(1)}`);
      marker.innerHTML = `<span>${master.rating.toFixed(1)}</span>`;
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
      <div className="srez-master-map__legend" aria-hidden="true">32 мастера в Москве</div>
    </div>
  );
}
