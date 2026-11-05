import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  MapPin,
  Phone,
  CheckCircle2,
  Truck,
} from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/BadgesAndTabs';
import { useAppStore } from '../../store/useAppStore';

export const SosScreen: React.FC = () => {
  const { t } = useTranslation();
  const createRequest = useAppStore((s) => s.createRequest);
  const vehicles = useAppStore((s) => s.vehicles);
  const activeVehicleId = useAppStore((s) => s.activeVehicleId);

  const [dispatched, setDispatched] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!dispatched) return;
    const t1 = setTimeout(() => setStep(2), 2000);
    const t2 = setTimeout(() => setStep(3), 4500);
    const t3 = setTimeout(() => setStep(4), 8500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [dispatched]);

  const handleDispatch = () => {
    const veh =
      vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];
    createRequest({
      type: 'roadside_sos',
      title: {
        en: 'Roadside SOS: Flatbed Winch Dispatch (Ring Road Maadi)',
        ar: 'طوارئ طريق SOS: ونش إنقاذ (الدائري المعادي)',
      },
      providerId: 'prov-1',
      providerName: {
        en: 'AutoFix Emergency Towing Partner',
        ar: 'ونش إنقاذ أوتو فيكس السريع',
      },
      vehicleName: `${veh.make} ${veh.model} (${veh.year})`,
      priceEstimateEgp: 750,
    });
    setDispatched(true);
    setStep(1);
  };

  const steps = [
    t('sos.step1'),
    t('sos.step2'),
    t('sos.step3'),
    t('sos.step4'),
  ];

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar title={t('sos.title')} backTo="/home" />

      <div className="p-4 space-y-5">
        {/* GPS Location Card */}
        <div className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-status-error-bg text-brand-accent flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-label-sm text-neutral-slate block">
                {t('sos.locationLabel')}
              </span>
              <p className="text-label-lg text-brand-primary mt-0.5">
                {t('sos.locationValue')}
              </p>
            </div>
          </div>
          <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
        </div>

        {!dispatched ? (
          <div className="bg-surface-pure rounded-2xl p-6 shadow-e1 border border-neutral-slate/15 text-center space-y-6">
            <div>
              <h2 className="text-headline-md text-brand-primary">
                {t('sos.subtitle')}
              </h2>
            </div>

            {/* Big Pulsing Dark Wine (#790D16) Emergency Button */}
            <div className="py-4 flex items-center justify-center">
              <button
                type="button"
                onClick={handleDispatch}
                className="relative w-44 h-44 rounded-full bg-brand-accent text-surface-pure shadow-e2 flex flex-col items-center justify-center gap-2 active:scale-95 transition cursor-pointer group"
              >
                <span className="absolute inset-0 rounded-full bg-brand-accent/35 animate-ping pointer-events-none" />
                <AlertTriangle className="w-12 h-12 stroke-[2.2]" />
                <span className="text-headline-md font-extrabold tracking-wide">
                  SOS
                </span>
                <span className="text-label-sm px-3 text-surface-pure/90">
                  {t('sos.pressToDispatch')}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-surface-pure rounded-2xl p-5 shadow-e2 border-2 border-brand-accent/30 space-y-5">
            {/* Tow Truck Driver Card */}
            <div className="bg-brand-primary text-surface-pure rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-accent flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-label-lg text-surface-pure">
                    {t('sos.driverName')}
                  </h3>
                  <p className="text-body-sm text-on-primary-container">
                    {t('sos.truckPlate')}
                  </p>
                </div>
              </div>
              <a
                href="tel:+201002345678"
                className="w-10 h-10 rounded-xl bg-surface-pure text-brand-primary flex items-center justify-center shadow-e1"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            {/* 4-Step Live ETA Progress Tracker */}
            <div className="space-y-3">
              {steps.map((label, idx) => {
                const sNum = idx + 1;
                const done = step >= sNum;
                const current = step === sNum;
                return (
                  <div
                    key={sNum}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      done
                        ? 'bg-status-success-bg/70 border-status-success/30 text-neutral-charcoal'
                        : 'bg-surface-canvas border-transparent text-neutral-slate'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 ${
                        done ? 'text-status-success' : 'text-neutral-slate'
                      } ${current ? 'animate-bounce' : ''}`}
                    />
                    <span className="text-label-md">{label}</span>
                  </div>
                );
              })}
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setDispatched(false);
                setStep(1);
              }}
            >
              {t('sos.cancelSos')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

