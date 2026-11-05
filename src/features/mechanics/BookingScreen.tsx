import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { SelectField, TextAreaField } from '../../components/ui/FormControls';
import { Button } from '../../components/ui/Button';
import { AlertBanner } from '../../components/ui/BadgesAndTabs';
import { useAppStore } from '../../store/useAppStore';
import { formatEGP, pickLocalized, type Lang } from '../../lib/format';

export const BookingScreen: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const providers = useAppStore((s) => s.providers);
  const vehicles = useAppStore((s) => s.vehicles);
  const activeVehicleId = useAppStore((s) => s.activeVehicleId);
  const createRequest = useAppStore((s) => s.createRequest);

  const provider =
    providers.find((p) => p.id === providerId) || providers[0];

  const [selectedVehicleId, setSelectedVehicleId] = useState(
    activeVehicleId || vehicles[0]?.id || ''
  );
  const [selectedServiceId, setSelectedServiceId] = useState(
    provider.services[0]?.id || 'srv-general'
  );
  const [preferredDate, setPreferredDate] = useState('2026-11-07T11:00');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const chosenService = provider.services.find(
    (s) => s.id === selectedServiceId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const veh =
      vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
    const srvName = chosenService
      ? chosenService.name
      : { en: 'General Diagnostic & Inspection', ar: 'فحص وصيانة عامة' };

    createRequest({
      type: 'service',
      title: {
        en: `Service: ${srvName.en}`,
        ar: `صيانة: ${srvName.ar}`,
      },
      providerId: provider.id,
      providerName: provider.name,
      vehicleName: `${veh.make} ${veh.model} (${veh.year})`,
      priceEstimateEgp: chosenService ? chosenService.priceFromEgp : 500,
      notes,
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar title={t('booking.title')} />

      <div className="p-4 space-y-4">
        {/* Selected Workshop Summary Card */}
        <div className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 flex items-center gap-3">
          <img
            src={provider.logoUrl}
            alt={pickLocalized(provider.name, lang)}
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div>
            <h2 className="text-headline-sm text-brand-primary">
              {pickLocalized(provider.name, lang)}
            </h2>
            <p className="text-body-sm text-neutral-slate">
              {pickLocalized(provider.district, lang)}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-surface-pure rounded-2xl p-5 shadow-e1 space-y-4">
            <AlertBanner
              variant="success"
              title={t('booking.confirmedTitle')}
              body={t('booking.confirmedBody')}
            />
            <Button
              variant="cta"
              fullWidth
              icon={<CheckCircle2 className="w-5 h-5" />}
              onClick={() => navigate('/requests')}
            >
              {t('booking.viewRequests')}
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-surface-pure rounded-2xl p-4 shadow-e1 space-y-4 border border-neutral-slate/15"
          >
            <SelectField
              label={t('booking.selectVehicle')}
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.make} {v.model} ({v.year}) — {v.plate}
                </option>
              ))}
            </SelectField>

            <SelectField
              label={t('booking.selectService')}
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              {provider.services.length > 0 ? (
                provider.services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {pickLocalized(s.name, lang)} ({formatEGP(s.priceFromEgp, lang)})
                  </option>
                ))
              ) : (
                <option value="srv-general">
                  {lang === 'ar'
                    ? 'فحص وصيانة ميكانيكية شاملة (٥٠٠ ج.م)'
                    : 'General Mechanical Inspection (EGP 500)'}
                </option>
              )}
            </SelectField>

            <label className="block w-full">
              <span className="block text-label-md text-brand-primary mb-1.5">
                {t('booking.preferredDate')}
              </span>
              <div className="relative flex items-center">
                <input
                  type="datetime-local"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-4 text-body-lg text-neutral-charcoal focus:outline-none focus:border-brand-primary"
                />
                <Calendar className="w-4 h-4 text-brand-primary pointer-events-none absolute end-4" />
              </div>
            </label>

            <TextAreaField
              label={t('booking.notesLabel')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('booking.notesPlaceholder')}
            />

            <Button type="submit" variant="cta" fullWidth>
              {t('booking.submit')}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

