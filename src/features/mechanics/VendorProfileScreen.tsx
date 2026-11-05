import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Heart,
  Star,
  Route,
  Clock,
  MapPin,
  ShieldCheck,
  Flag,
} from 'lucide-react';
import { Button, QuickActionSquircle } from '../../components/ui/Button';
import {
  StatusBadge,
  SegmentedTabs,
  AlertBanner,
} from '../../components/ui/BadgesAndTabs';
import { useAppStore } from '../../store/useAppStore';
import {
  formatDistance,
  formatEGP,
  formatNumber,
  pickLocalized,
  type Lang,
} from '../../lib/format';

type VendorTab = 'about' | 'services' | 'reviews';

export const VendorProfileScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const providers = useAppStore((s) => s.providers);
  const favoriteIds = useAppStore((s) => s.favoriteProviderIds);
  const toggleFavorite = useAppStore((s) => s.toggleFavoriteProvider);

  const [activeTab, setActiveTab] = useState<VendorTab>('about');
  const [reportedReviewId, setReportedReviewId] = useState<string | null>(null);

  const provider = providers.find((p) => p.id === id) || providers[0];
  const isFav = favoriteIds.includes(provider.id);

  return (
    <div className="min-h-full bg-surface-pure pb-24">
      {/* §6.3 Full-bleed Hero Header (220px height) with Floating Translucent Back & Favorite Buttons */}
      <div className="relative h-[220px] w-full bg-brand-primary overflow-hidden">
        <img
          src={provider.heroUrl}
          alt={pickLocalized(provider.name, lang)}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-brand-primary/40" />

        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="w-10 h-10 rounded-full bg-neutral-charcoal/45 backdrop-blur-sm text-surface-pure flex items-center justify-center hover:bg-neutral-charcoal/65 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2] rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => toggleFavorite(provider.id)}
            aria-label="Favorite"
            className="w-10 h-10 rounded-full bg-neutral-charcoal/45 backdrop-blur-sm text-surface-pure flex items-center justify-center hover:bg-neutral-charcoal/65 transition cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 stroke-[2.2] ${
                isFav ? 'fill-brand-accent text-brand-accent' : 'text-surface-pure'
              }`}
            />
          </button>
        </div>
      </div>

      {/* §6.3 Overlapping #FFFFFF Sheet (24px top radius) */}
      <div className="relative z-10 -mt-6 bg-surface-pure rounded-t-[24px] px-4 pt-5 pb-6 shadow-e3 space-y-5">
        {/* Vendor Logo Avatar (56x56px, 12px radius) + Title + Rating + Distance */}
        <div className="flex items-start gap-3.5">
          <img
            src={provider.logoUrl}
            alt={pickLocalized(provider.name, lang)}
            className="w-[56px] h-[56px] rounded-xl object-cover shadow-e1 border border-neutral-slate/20 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-headline-md text-brand-primary">
              {pickLocalized(provider.name, lang)}
            </h1>
            <p className="text-body-sm text-neutral-slate mt-0.5">
              {pickLocalized(provider.district, lang)}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-body-sm">
              <span className="inline-flex items-center gap-1 font-semibold text-neutral-charcoal">
                <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                {formatNumber(provider.rating, lang, 1)}
                <span className="text-neutral-slate font-normal">
                  ({formatNumber(provider.reviewCount, lang, 0)})
                </span>
              </span>

              <span className="inline-flex items-center gap-1 text-neutral-slate">
                <Route className="w-3.5 h-3.5" />
                {formatDistance(provider.distanceKm, lang)}
              </span>

              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  provider.isOpen ? 'text-status-success' : 'text-brand-accent'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {provider.isOpen ? t('mechanics.openNow') : t('mechanics.closed')}
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          {provider.isVerified && (
            <StatusBadge variant="verified">{t('mechanics.verified')}</StatusBadge>
          )}
          {provider.isTopRated && (
            <StatusBadge variant="top-rated">{t('mechanics.topRated')}</StatusBadge>
          )}
          <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
        </div>

        {/* §5.5 Unavailable Alert Banner when provider is closed */}
        {!provider.isOpen && (
          <AlertBanner variant="error" title={t('vendor.unavailableAlert')} />
        )}

        {/* §5.1 3-Column Quick Action Squircle Buttons (Call | Chat | Directions) */}
        <div className="flex items-center gap-3">
          <QuickActionSquircle
            action="call"
            label={t('vendor.call')}
            onClick={() => {
              window.location.href = `tel:${provider.phone}`;
            }}
          />
          <QuickActionSquircle
            action="chat"
            label={t('vendor.chat')}
            onClick={() => navigate('/diagnose')}
          />
          <QuickActionSquircle
            action="directions"
            label={t('vendor.directions')}
            onClick={() => navigate(`/map?provider=${provider.id}`)}
          />
        </div>

        {/* §5.4 In-Page Segmented Tabs (About | Services | Reviews) */}
        <SegmentedTabs<VendorTab>
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'about', label: t('vendor.about') },
            {
              id: 'services',
              label: t('vendor.services'),
              count: provider.services.length,
            },
            {
              id: 'reviews',
              label: t('vendor.reviews'),
              count: provider.reviews.length,
            },
          ]}
        />

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="space-y-4 pt-1">
            <div>
              <h2 className="text-headline-sm text-brand-primary mb-1.5">
                {t('vendor.about')}
              </h2>
              <p className="text-body-md text-neutral-charcoal leading-relaxed">
                {pickLocalized(provider.about, lang)}
              </p>
            </div>

            <div className="bg-surface-canvas rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-label-md text-brand-primary block">
                    {t('vendor.workingHours')}
                  </span>
                  <span className="text-body-sm text-neutral-charcoal">
                    {pickLocalized(provider.hours, lang)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-label-md text-brand-primary block">
                    {t('vendor.location')}
                  </span>
                  <span className="text-body-sm text-neutral-charcoal">
                    {pickLocalized(provider.address, lang)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-3 pt-1">
            {provider.services.map((srv) => (
              <div
                key={srv.id}
                className="bg-surface-canvas rounded-2xl p-4 flex items-center justify-between gap-3 border border-neutral-slate/15"
              >
                <div>
                  <h3 className="text-label-lg text-brand-primary">
                    {pickLocalized(srv.name, lang)}
                  </h3>
                  <span className="text-body-sm text-neutral-slate">
                    ~{formatNumber(srv.durationMins, lang, 0)} min
                  </span>
                </div>
                <div className="text-end shrink-0">
                  <span className="text-label-sm text-neutral-slate block">
                    {t('vendor.startingFrom')}
                  </span>
                  <span className="text-label-lg text-brand-accent">
                    {formatEGP(srv.priceFromEgp, lang)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3 pt-1">
            <div className="bg-status-success-bg text-status-success rounded-xl p-3 flex items-center gap-2 text-body-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t('vendor.verifiedReviewsNote')}</span>
            </div>

            {reportedReviewId && (
              <AlertBanner variant="success" title={t('vendor.reportedToast')} />
            )}

            {provider.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-surface-canvas rounded-2xl p-4 space-y-2 border border-neutral-slate/15"
              >
                <div className="flex items-center justify-between">
                  <span className="text-label-lg text-brand-primary">
                    {rev.authorName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-body-sm font-semibold text-neutral-charcoal">
                      <Star className="w-3.5 h-3.5 fill-status-star text-status-star" />
                      {formatNumber(rev.rating, lang, 1)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setReportedReviewId(rev.id)}
                      className="text-body-sm text-neutral-slate hover:text-brand-accent inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Flag className="w-3 h-3" />
                      <span>{t('vendor.reportAbuse')}</span>
                    </button>
                  </div>
                </div>
                <p className="text-body-md text-neutral-charcoal">
                  {pickLocalized(rev.comment, lang)}
                </p>
                <div className="flex items-center justify-between text-body-sm text-status-success font-medium">
                  <span>{pickLocalized(rev.verifiedRequestLabel, lang)}</span>
                  <span className="text-neutral-slate font-normal">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* §6.3 Sticky Full-Width #790D16 "Book a Service" CTA Button */}
      <div className="fixed bottom-[64px] inset-x-0 max-w-[480px] mx-auto z-30 bg-surface-pure/95 backdrop-blur-sm border-t border-divider p-3 shadow-e3">
        <Button
          variant="cta"
          fullWidth
          onClick={() => navigate(`/book/${provider.id}`)}
        >
          {t('vendor.bookService')}
        </Button>
      </div>
    </div>
  );
};

