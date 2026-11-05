import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Truck,
  Clock,
  Route,
  MapPin,
  Recycle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { SearchBar } from '../../components/ui/FormControls';
import {
  FilterChip,
  StatusBadge,
  AlertBanner,
} from '../../components/ui/BadgesAndTabs';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import {
  formatDistance,
  formatEGP,
  formatRelativeMinutes,
  pickLocalized,
  type Lang,
} from '../../lib/format';
import type { SparePartRecord, PartSellerOffer } from '../../data/types';

export const PartsLocatorScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id: routePartId } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const parts = useAppStore((s) => s.parts);
  const vehicles = useAppStore((s) => s.vehicles);
  const activeVehicleId = useAppStore((s) => s.activeVehicleId);
  const createRequest = useAppStore((s) => s.createRequest);

  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [conditionFilter, setConditionFilter] = useState<'all' | 'new' | 'used'>(
    'all'
  );
  const [selectedOffer, setSelectedOffer] = useState<{
    part: SparePartRecord;
    offer: PartSellerOffer;
  } | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState(
    'Abbas El-Akkad St, Building 42, Nasr City, Cairo'
  );
  const [deliverySuccess, setDeliverySuccess] = useState(false);

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      if (routePartId && part.id !== routePartId) return false;
      if (
        conditionFilter !== 'all' &&
        !part.offers.some((o) => o.condition === conditionFilter)
      ) {
        return false;
      }
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        return (
          part.partNumber.toLowerCase().includes(q) ||
          part.name.en.toLowerCase().includes(q) ||
          part.name.ar.toLowerCase().includes(q) ||
          part.compatibleModels.some((m) => m.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [parts, routePartId, conditionFilter, query]);

  const handleConfirmDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer) return;
    const veh =
      vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

    createRequest({
      type: 'part_delivery',
      title: {
        en: `Part Delivery: ${selectedOffer.part.name.en} (${selectedOffer.part.partNumber})`,
        ar: `توصيل قطعة: ${selectedOffer.part.name.ar} (${selectedOffer.part.partNumber})`,
      },
      providerId: selectedOffer.offer.providerId,
      providerName: selectedOffer.offer.providerName,
      vehicleName: `${veh.make} ${veh.model} (${veh.year})`,
      priceEstimateEgp: selectedOffer.offer.priceEgp,
      notes: deliveryAddress,
    });

    setSelectedOffer(null);
    setDeliverySuccess(true);
  };

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar title={t('parts.title')} backTo="/home" />

      {/* Sticky Search & Condition Filter Bar */}
      <div className="sticky top-[56px] z-20 bg-surface-pure px-4 py-3 border-b border-divider shadow-e1 space-y-2.5">
        <SearchBar
          surface="on-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('parts.searchPlaceholder')}
        />

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <FilterChip
            active={conditionFilter === 'all'}
            onClick={() => setConditionFilter('all')}
          >
            {t('parts.conditionAll')}
          </FilterChip>
          <FilterChip
            active={conditionFilter === 'new'}
            onClick={() => setConditionFilter('new')}
          >
            {t('parts.conditionNew')}
          </FilterChip>
          <FilterChip
            active={conditionFilter === 'used'}
            onClick={() => setConditionFilter('used')}
          >
            {t('parts.conditionUsed')}
          </FilterChip>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Connector Platform Inventory Disclaimer (§7.5) */}
        <div className="bg-surface-pure rounded-xl p-3 border border-neutral-slate/20 flex items-center gap-2.5 text-body-sm text-neutral-slate">
          <Info className="w-4 h-4 text-brand-primary shrink-0" />
          <span>{t('parts.disclaimer')}</span>
        </div>

        {deliverySuccess && (
          <div className="bg-surface-pure rounded-2xl p-4 shadow-e1 space-y-3">
            <AlertBanner
              variant="success"
              title={t('booking.confirmedTitle')}
              body={t('parts.deliveryNote')}
            />
            <Button
              variant="cta"
              fullWidth
              icon={<CheckCircle2 className="w-4 h-4" />}
              onClick={() => navigate('/requests')}
            >
              {t('booking.viewRequests')}
            </Button>
          </div>
        )}

        {/* Parts & Competing Cairo Sellers List */}
        {filteredParts.map((part) => {
          const visibleOffers = part.offers.filter(
            (o) => conditionFilter === 'all' || o.condition === conditionFilter
          );

          return (
            <article
              key={part.id}
              className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 space-y-3.5"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={part.imageUrl}
                  alt={pickLocalized(part.name, lang)}
                  className="w-[72px] h-[72px] rounded-xl object-cover shrink-0 bg-surface-canvas"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-label-sm px-2 py-0.5 rounded bg-surface-canvas text-brand-primary">
                      {t('parts.partNumber')}: {part.partNumber}
                    </span>
                    <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
                  </div>
                  <h2 className="text-headline-sm text-brand-primary mt-1">
                    {pickLocalized(part.name, lang)}
                  </h2>
                  <p className="text-body-sm text-neutral-slate mt-0.5">
                    {t('parts.compatibleWith')}: {part.compatibleModels.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Seller Offers with Visible Last-Update Timestamps (§7.5 & §8.7) */}
              <div className="space-y-2 pt-2 border-t border-divider">
                <span className="text-label-sm text-neutral-slate uppercase tracking-wider block">
                  {t('parts.nearestSellers')}
                </span>

                {visibleOffers.map((offer, idx) => (
                  <div
                    key={`${offer.providerId}-${offer.condition}-${idx}`}
                    className="bg-surface-canvas rounded-xl p-3 flex flex-col gap-2.5 border border-neutral-slate/15"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-label-lg text-brand-primary">
                            {pickLocalized(offer.providerName, lang)}
                          </span>
                          {offer.isVerified && (
                            <StatusBadge variant="verified">
                              {t('mechanics.verified')}
                            </StatusBadge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-body-sm text-neutral-slate mt-1">
                          <span className="inline-flex items-center gap-1">
                            <Route className="w-3.5 h-3.5" />
                            {formatDistance(offer.distanceKm, lang)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-status-success font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {formatRelativeMinutes(offer.updatedMinutesAgo, lang)}
                          </span>
                        </div>
                      </div>

                      <div className="text-end shrink-0">
                        <span className="text-headline-sm text-brand-accent block">
                          {formatEGP(offer.priceEgp, lang)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm mt-1 ${offer.condition === 'new'
                              ? 'bg-status-success-bg text-status-success'
                              : 'bg-status-warning-bg text-status-warning'
                            }`}
                        >
                          {offer.condition === 'used' && (
                            <Recycle className="w-3 h-3" />
                          )}
                          {offer.condition === 'new'
                            ? t('parts.new')
                            : t('parts.used')}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="cta"
                      fullWidth
                      icon={<Truck className="w-4 h-4" />}
                      onClick={() => setSelectedOffer({ part, offer })}
                    >
                      {t('parts.requestDelivery')}
                    </Button>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* Spare-Part Delivery Request Bottom Sheet Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-neutral-charcoal/60 backdrop-blur-xs flex items-end justify-center p-4">
          <form
            onSubmit={handleConfirmDelivery}
            className="w-full max-w-[448px] bg-surface-pure rounded-2xl p-5 shadow-e2 space-y-4"
          >
            <h3 className="text-headline-md text-brand-primary">
              {t('parts.deliveryModalTitle')}
            </h3>

            <div className="bg-surface-canvas rounded-xl p-3 space-y-1">
              <p className="text-label-lg text-brand-primary">
                {pickLocalized(selectedOffer.part.name, lang)}
              </p>
              <p className="text-body-sm text-neutral-slate">
                {pickLocalized(selectedOffer.offer.providerName, lang)} •{' '}
                <strong className="text-brand-accent">
                  {formatEGP(selectedOffer.offer.priceEgp, lang)}
                </strong>
              </p>
            </div>

            <label className="block w-full">
              <span className="block text-label-md text-brand-primary mb-1.5">
                {t('parts.deliveryAddress')}
              </span>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-brand-accent absolute start-3.5" />
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 ps-10 pe-4 text-body-md text-neutral-charcoal focus:outline-none focus:border-brand-primary"
                />
              </div>
            </label>

            <p className="text-body-sm text-neutral-slate">
              {t('parts.deliveryNote')}
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline-slate"
                onClick={() => setSelectedOffer(null)}
              >
                ✕
              </Button>
              <Button type="submit" variant="cta" fullWidth>
                {t('parts.confirmDelivery')}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

