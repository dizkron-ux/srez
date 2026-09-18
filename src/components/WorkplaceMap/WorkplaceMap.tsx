import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Workplace } from '../../types';
import { Icon } from '../Icon/Icon';

type Props = { workplace: Workplace };

export function WorkplaceMap({ workplace }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [workplace.coordinates[0], workplace.coordinates[1]],
      zoom: 14.4,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    const marker = document.createElement('div');
    marker.className = 'srez-workplace-map__marker';
    marker.textContent = workplace.logo;
    marker.setAttribute('aria-label', workplace.name);

    new maplibregl.Marker({ element: marker, anchor: 'center' })
      .setLngLat([workplace.coordinates[0], workplace.coordinates[1]])
      .addTo(map);

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);
    requestAnimationFrame(() => map.resize());

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, [workplace]);

  return (
    <div className="srez-workplace-map" aria-label={`Карта: ${workplace.name}`}>
      <div className="srez-workplace-map__canvas" ref={containerRef} />
      <div className="srez-workplace-map__meta">
        <span><strong>{workplace.name}</strong><small>{workplace.address}</small></span>
        <a href={workplace.mapUrl} target="_blank" rel="noreferrer">
          Открыть в Яндекс Картах <Icon name="arrow-up-right" size={13} />
        </a>
      </div>
    </div>
  );
}
