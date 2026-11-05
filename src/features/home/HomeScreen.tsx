import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Bell,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Globe,
  Car,
  FileText,
} from 'lucide-react';
import { Wordmark } from '../../components/ui/Wordmark';
import { SearchBar } from '../../components/ui/FormControls';
import { ServiceTile, ProviderCard } from '../../components/ui/Cards';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';

export const HomeScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const providers = useAppStore((s) => s.providers);
  const notifications = useAppStore((s) => s.notifications);
  const vehicles = useAppStore((s) => s.vehicles);
  const activeVehicleId = useAppStore((s) => s.activeVehicleId);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeVehicle =
    vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

  const handleHeroSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      navigate(`/mechanics?q=${encodeURIComponent(q)}`);
    } else {
      navigate('/mechanics');
    }
  };

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      {/* §6.1 Deep #17365D Header with Diagonal #790D16 Graphic Ribbons */}
      <section className="relative bg-brand-primary text-surface-pure pt-5 pb-12 px-4 overflow-hidden">
        {/* Diagonal Dark Wine (#790D16) Graphic Ribbons */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-10 w-52 h-64 bg-brand-accent/35 rotate-25 rounded-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-16 w-40 h-52 bg-brand-accent/60 rotate-25 rounded-2xl"
        />

        {/* Top Bar: Wordmark + Language Switcher + Notification Bell */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div>
            <Wordmark variant="on-navy" size="md" />
            <p className="text-body-sm text-on-primary-container mt-1">
              {t('brand.tagline')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/docs')}
              className="h-9 px-3 rounded-full bg-brand-accent hover:opacity-95 text-surface-pure text-label-md flex items-center gap-1.5 shadow-e1 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{i18n.language === 'ar' ? 'الوثائق' : 'Docs'}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
              }
              className="h-9 px-3 rounded-full bg-surface-pure/12 hover:bg-surface-pure/20 text-surface-pure text-label-md flex items-center gap-1.5 transition cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/notifications')}
              aria-label={t('profile.notifications')}
              className="relative w-10 h-10 rounded-full bg-surface-pure/12 hover:bg-surface-pure/20 flex items-center justify-center transition cursor-pointer"
            >
              <Bell className="w-5 h-5 text-surface-pure stroke-[2]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 end-1.5 w-2.5 h-2.5 rounded-full bg-brand-accent ring-2 ring-brand-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Active Garage Vehicle Pill */}
        {activeVehicle && (
          <button
            type="button"
            onClick={() => navigate('/garage')}
            className="relative z-10 mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-pure/10 hover:bg-surface-pure/18 text-body-sm text-surface-pure transition cursor-pointer"
          >
            <Car className="w-4 h-4 text-secondary-container" />
            <span>
              {activeVehicle.make} {activeVehicle.model} ({activeVehicle.year})
            </span>
            <span className="text-on-primary-container">•</span>
            <span className="text-label-sm uppercase text-secondary-container">
              {t('brand.pilotCity')}
            </span>
          </button>
        )}

        {/* Headline Prompt ("What does your car need today?") */}
        <h1 className="relative z-10 text-headline-lg text-surface-pure mt-4 max-w-[300px]">
          {t('home.heroPrompt')}
        </h1>

        {/* Floating Search Bar (§5.2) */}
        <div className="relative z-10 mt-4">
          <SearchBar
            surface="on-navy"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearchSubmit={handleHeroSearch}
            placeholder={t('home.searchPlaceholder')}
          />
        </div>
      </section>

      {/* §6.1 Overlapping #FFFFFF Rounded Top Sheet (24px top radius) */}
      <section className="relative z-20 -mt-6 bg-surface-pure rounded-t-[24px] px-4 pt-5 pb-6 shadow-e3 space-y-6">
        {/* 2x2 Home Utility Service Grid (§5.3) */}
        <div className="grid grid-cols-2 gap-3">
          <ServiceTile
            kind="mechanic"
            title={t('home.findMechanicTitle')}
            subtitle={t('home.findMechanicSub')}
            onClick={() => navigate('/mechanics')}
          />
          <ServiceTile
            kind="parts"
            title={t('home.sparePartsTitle')}
            subtitle={t('home.sparePartsSub')}
            onClick={() => navigate('/parts')}
          />
          <ServiceTile
            kind="booking"
            title={t('home.bookServiceTitle')}
            subtitle={t('home.bookServiceSub')}
            onClick={() => navigate('/book/prov-1')}
          />
          <ServiceTile
            kind="fuel"
            title={t('home.fuelLogTitle')}
            subtitle={t('home.fuelLogSub')}
            onClick={() => navigate('/garage/fuel')}
          />
        </div>

        {/* Headline Feature Showcase: Diagnostic DSS Chatbot Card */}
        <div className="relative overflow-hidden rounded-2xl bg-brand-primary text-surface-pure p-4 shadow-e2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-8 -bottom-8 w-36 h-36 rounded-full bg-brand-accent/45"
          />
          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-accent text-surface-pure text-label-sm">
              <Sparkles className="w-3 h-3" />
              <span>{t('home.dssBannerBadge')}</span>
            </span>
            <h2 className="text-headline-md text-surface-pure">
              {t('home.dssBannerTitle')}
            </h2>
            <p className="text-body-sm text-on-primary-container">
              {t('home.dssBannerSub')}
            </p>
            <div className="pt-1">
              <Button
                variant="cta"
                fullWidth
                onClick={() => navigate('/diagnose')}
                icon={<Sparkles className="w-4 h-4" />}
              >
                {t('home.dssBannerCta')}
              </Button>
            </div>
          </div>
        </div>

        {/* Emergency Roadside Assistance SOS Banner */}
        <div className="rounded-2xl bg-status-error-bg border border-brand-accent/25 p-4 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-accent text-surface-pure flex items-center justify-center shrink-0 shadow-e1">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-headline-sm text-brand-accent">
                {t('home.sosTitle')}
              </h3>
              <p className="text-body-sm text-neutral-charcoal mt-0.5">
                {t('home.sosSub')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/sos')}
            className="px-4 h-10 rounded-xl bg-brand-accent text-surface-pure text-label-lg shrink-0 shadow-e1 active:scale-95 transition cursor-pointer"
          >
            {t('home.sosButton')}
          </button>
        </div>

        {/* Top Verified Cairo Mechanics Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm text-brand-primary">
              {t('home.nearbyHeader')}
            </h2>
            <button
              type="button"
              onClick={() => navigate('/mechanics')}
              className="inline-flex items-center gap-1 text-brand-accent text-label-md cursor-pointer"
            >
              <span>{t('home.seeAll')}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-3">
            {providers
              .filter((p) => p.type !== 'parts_seller')
              .slice(0, 3)
              .map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onClick={() => navigate(`/mechanics/${provider.id}`)}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

