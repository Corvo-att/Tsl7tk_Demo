import React from 'react';
import {
  Wrench,
  Cog,
  CalendarCheck2,
  Fuel,
  ArrowRight,
  Star,
  Route,
  Clock,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from './BadgesAndTabs';
import { formatDistance, formatNumber, pickLocalized, type Lang } from '../../lib/format';
import type { ProviderRecord } from '../../data/types';

export type UtilityTileKind = 'mechanic' | 'parts' | 'booking' | 'fuel';

interface ServiceTileProps {
  kind: UtilityTileKind;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const ServiceTile: React.FC<ServiceTileProps> = ({
  kind,
  title,
  subtitle,
  onClick,
}) => {
  const Icon =
    kind === 'mechanic'
      ? Wrench
      : kind === 'parts'
        ? Cog
        : kind === 'booking'
          ? CalendarCheck2
          : Fuel;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-surface-canvas rounded-2xl p-4 text-start flex flex-col justify-between min-h-[144px] shadow-e1 border border-neutral-slate/15 hover:border-brand-primary/30 active:scale-[0.98] transition cursor-pointer"
    >
      <div>
        <div className="w-10 h-10 rounded-xl bg-surface-pure flex items-center justify-center shadow-e1 mb-3">
          <Icon className="w-6 h-6 text-brand-primary stroke-[2]" />
        </div>
        <h3 className="text-headline-sm text-brand-primary">{title}</h3>
        <p className="text-body-sm text-neutral-slate mt-0.5 line-clamp-2">{subtitle}</p>
      </div>
      <div className="mt-3 flex items-center">
        <span className="w-[28px] h-[28px] rounded-full bg-brand-accent text-surface-pure flex items-center justify-center shadow-e1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
          <ArrowRight className="w-4 h-4 stroke-[2.2] rtl:rotate-180" />
        </span>
      </div>
    </button>
  );
};

interface ProviderCardProps {
  provider: ProviderRecord;
  onClick: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onClick }) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const tagsText = provider.tags
    .map((tag) => pickLocalized(tag, lang))
    .join(' • ');

  return (
    <article
      onClick={onClick}
      className="flex gap-3.5 bg-surface-pure p-4 border-b border-surface-canvas hover:bg-surface-canvas/50 active:bg-surface-canvas transition cursor-pointer rounded-2xl shadow-e1 border border-neutral-slate/15"
    >
      {/* 80x80px Rounded Square (12px radius) Real-World Garage Thumbnail (§5.3) */}
      <div className="w-[80px] h-[80px] rounded-xl overflow-hidden shrink-0 bg-surface-canvas relative">
        <img
          src={provider.thumbnailUrl}
          alt={pickLocalized(provider.name, lang)}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content Column */}
      <div className="flex-1 min-w-0">
        {/* Header Row: Star rating on start, Route icon + distance on end */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1 text-body-sm text-neutral-charcoal font-medium">
            <Star className="w-3.5 h-3.5 fill-status-star text-status-star shrink-0" />
            <span className="font-semibold">{formatNumber(provider.rating, lang, 1)}</span>
            <span className="text-neutral-slate">
              ({formatNumber(provider.reviewCount, lang, 0)})
            </span>
          </div>
          <div className="inline-flex items-center gap-1 text-body-sm text-neutral-slate">
            <Route className="w-3.5 h-3.5 stroke-[2] shrink-0" />
            <span>{formatDistance(provider.distanceKm, lang)}</span>
          </div>
        </div>

        {/* Title & Dot-Separated Tags */}
        <h3 className="text-headline-sm text-brand-primary truncate mt-1">
          {pickLocalized(provider.name, lang)}
        </h3>
        <p className="text-body-sm text-neutral-slate truncate mt-0.5">{tagsText}</p>

        {/* Operating Status */}
        <div className="flex items-center gap-1.5 mt-1.5 text-body-sm">
          <Clock
            className={`w-3.5 h-3.5 stroke-[2] shrink-0 ${
              provider.isOpen ? 'text-status-success' : 'text-brand-accent'
            }`}
          />
          <span
            className={`font-semibold ${
              provider.isOpen ? 'text-status-success' : 'text-brand-accent'
            }`}
          >
            {provider.isOpen ? t('mechanics.openNow') : t('mechanics.closed')}
          </span>
          <span className="text-neutral-slate">•</span>
          <span className="text-neutral-slate truncate">
            {pickLocalized(provider.hours, lang)}
          </span>
        </div>

        {/* Trust Badges Row (§5.3 + §7.5 Demo Badge) */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {provider.isVerified && (
            <StatusBadge variant="verified">{t('mechanics.verified')}</StatusBadge>
          )}
          {provider.isTopRated && (
            <StatusBadge variant="top-rated">{t('mechanics.topRated')}</StatusBadge>
          )}
          <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
        </div>
      </div>
    </article>
  );
};

