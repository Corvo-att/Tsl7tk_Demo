import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, Route, ExternalLink, Wrench } from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { FilterChip, StatusBadge } from '../../components/ui/BadgesAndTabs';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { formatDistance, formatNumber, pickLocalized, type Lang } from '../../lib/format';
import type { ProviderRecord } from '../../data/types';

export const CairoMapScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const providers = useAppStore((s) => s.providers);
  const initialId = searchParams.get('provider');

  const [typeFilter, setTypeFilter] = useState<'all' | 'mechanic' | 'parts_seller'>(
    'all'
  );
  const [selectedProvider, setSelectedProvider] = useState<ProviderRecord>(
    () => providers.find((p) => p.id === initialId) || providers[0]
  );

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const filteredProviders = providers.filter((p) => {
    if (typeFilter === 'all') return true;
    if (typeFilter === 'mechanic') return p.type === 'mechanic' || p.type === 'both';
    return p.type === 'parts_seller' || p.type === 'both';
  });

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [30.0444, 31.2757],
      zoom: 12,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    markersLayerRef.current = layerGroup;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    filteredProviders.forEach((prov) => {
      const isSelected = prov.id === selectedProvider?.id;
      const bg = isSelected ? '#790D16' : '#17365D';
      const size = isSelected ? 38 : 30;

      const icon = L.divIcon({
        className: 'custom-tsl7tk-pin',
        html: `<div style="
          width:${size}px;
          height:${size}px;
          border-radius:9999px;
          background:${bg};
          color:#FFFFFF;
          border:2.5px solid #FFFFFF;
          box-shadow:0 4px 12px rgba(23,54,93,0.35);
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:800;
          font-size:12px;
        ">${prov.rating}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([prov.lat, prov.lng], { icon });
      marker.on('click', () => {
        setSelectedProvider(prov);
      });
      marker.addTo(layerGroup);
    });

    if (selectedProvider) {
      map.panTo([selectedProvider.lat, selectedProvider.lng], { animate: true });
    }
  }, [filteredProviders, selectedProvider]);

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] bg-surface-canvas relative">
      <AppBar title={t('map.title')} backTo="/home" />

      {/* Floating Filter Strip over Map */}
      <div className="bg-surface-pure px-4 py-2.5 border-b border-divider flex items-center gap-2 overflow-x-auto no-scrollbar z-20 shadow-e1">
        <FilterChip
          active={typeFilter === 'all'}
          onClick={() => setTypeFilter('all')}
        >
          {t('map.bothFilter')}
        </FilterChip>
        <FilterChip
          active={typeFilter === 'mechanic'}
          onClick={() => setTypeFilter('mechanic')}
        >
          {t('map.mechanicsFilter')}
        </FilterChip>
        <FilterChip
          active={typeFilter === 'parts_seller'}
          onClick={() => setTypeFilter('parts_seller')}
        >
          {t('map.partsFilter')}
        </FilterChip>
      </div>

      {/* Leaflet Map Canvas (Always LTR for map tiles) */}
      <div dir="ltr" ref={mapContainerRef} className="flex-1 w-full z-10" />

      {/* Overlapping Bottom-Sheet Provider Preview Card */}
      {selectedProvider && (
        <div className="bg-surface-pure rounded-t-[24px] p-4 shadow-e3 border-t border-divider z-20 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={selectedProvider.logoUrl}
                alt={pickLocalized(selectedProvider.name, lang)}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h2 className="text-headline-sm text-brand-primary truncate">
                  {pickLocalized(selectedProvider.name, lang)}
                </h2>
                <p className="text-body-sm text-neutral-slate truncate">
                  {pickLocalized(selectedProvider.address, lang)}
                </p>
                <div className="flex items-center gap-3 mt-1 text-body-sm">
                  <span className="inline-flex items-center gap-1 font-semibold text-neutral-charcoal">
                    <Star className="w-3.5 h-3.5 fill-status-star text-status-star" />
                    {formatNumber(selectedProvider.rating, lang, 1)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-neutral-slate">
                    <Route className="w-3.5 h-3.5" />
                    {formatDistance(selectedProvider.distanceKm, lang)}
                  </span>
                </div>
              </div>
            </div>
            <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Button
              variant="cta"
              icon={<Wrench className="w-4 h-4" />}
              onClick={() => navigate(`/mechanics/${selectedProvider.id}`)}
            >
              {t('map.viewProfile')}
            </Button>
            <Button
              variant="outline"
              icon={<ExternalLink className="w-4 h-4 text-brand-accent" />}
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${selectedProvider.lat},${selectedProvider.lng}`,
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            >
              {t('map.openDirections')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

