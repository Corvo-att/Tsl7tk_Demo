import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CarFront,
  Plus,
  Fuel,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/BadgesAndTabs';
import { useAppStore } from '../../store/useAppStore';
import { formatNumber, pickLocalized, type Lang } from '../../lib/format';

export const GarageScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const vehicles = useAppStore((s) => s.vehicles);
  const activeVehicleId = useAppStore((s) => s.activeVehicleId);
  const setActiveVehicle = useAppStore((s) => s.setActiveVehicle);
  const addVehicle = useAppStore((s) => s.addVehicle);
  const maintenance = useAppStore((s) => s.maintenance);

  const [showAddModal, setShowAddModal] = useState(false);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [mileage, setMileage] = useState('32000');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make.trim() || !model.trim()) return;
    addVehicle({
      make: make.trim(),
      model: model.trim(),
      year: Number(year) || 2022,
      plate: 'ق هـ ر ٩١٢٤',
      mileageKm: Number(mileage) || 30000,
    });
    setMake('');
    setModel('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar
        title={t('garage.title')}
        backTo="/home"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-9 px-3 rounded-full bg-brand-accent text-surface-pure text-label-md inline-flex items-center gap-1 shadow-e1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('garage.addVehicle')}</span>
          </button>
        }
      />

      <div className="p-4 space-y-5">
        {/* Stored Vehicles Horizontal Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm text-brand-primary">
              {t('garage.myVehicles')}
            </h2>
            <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
          </div>

          <div className="space-y-2.5">
            {vehicles.map((veh) => {
              const isActive = veh.id === activeVehicleId;
              return (
                <button
                  key={veh.id}
                  type="button"
                  onClick={() => setActiveVehicle(veh.id)}
                  className={`w-full text-start p-4 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-surface-pure border-brand-primary shadow-e2'
                      : 'bg-surface-pure text-neutral-charcoal border-neutral-slate/20 shadow-e1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-surface-pure/15 text-surface-pure'
                          : 'bg-surface-canvas text-brand-primary'
                      }`}
                    >
                      <CarFront className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-headline-sm ${
                            isActive ? 'text-surface-pure' : 'text-brand-primary'
                          }`}
                        >
                          {veh.make} {veh.model} ({veh.year})
                        </h3>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-brand-accent text-surface-pure text-label-sm">
                            {t('garage.activeVehicle')}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-body-sm mt-0.5 ${
                          isActive ? 'text-on-primary-container' : 'text-neutral-slate'
                        }`}
                      >
                        {veh.plate} • {t('garage.mileage')}:{' '}
                        {formatNumber(veh.mileageKm, lang, 0)} km
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Open Fuel Log CTA Button */}
        <Button
          variant="cta"
          fullWidth
          icon={<Fuel className="w-5 h-5" />}
          onClick={() => navigate('/garage/fuel')}
        >
          {t('garage.fuelLogBtn')}
        </Button>

        {/* Maintenance & Reminders Timeline (§8.2 Maintenance Management) */}
        <div className="space-y-3">
          <h2 className="text-headline-sm text-brand-primary">
            {t('garage.maintenanceTitle')}
          </h2>

          {maintenance.map((item) => {
            const isOverdue = item.status === 'overdue';
            const isDone = item.status === 'completed';

            return (
              <div
                key={item.id}
                className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isOverdue
                          ? 'bg-status-error-bg text-brand-accent'
                          : isDone
                            ? 'bg-status-success-bg text-status-success'
                            : 'bg-status-warning-bg text-status-warning'
                      }`}
                    >
                      {isOverdue ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : isDone ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </span>
                    <div>
                      <h3 className="text-label-lg text-brand-primary">
                        {pickLocalized(item.title, lang)}
                      </h3>
                      <p className="text-body-sm text-neutral-slate mt-0.5">
                        {t('garage.completedOn')}: {item.lastDoneDate} (
                        {formatNumber(item.lastDoneKm, lang, 0)} km)
                      </p>
                    </div>
                  </div>

                  <StatusBadge
                    variant={
                      isOverdue
                        ? 'urgency-critical'
                        : isDone
                          ? 'verified'
                          : 'top-rated'
                    }
                  >
                    {isOverdue
                      ? `${t('garage.overdue')} ${formatNumber(
                          Math.abs(item.dueInKm),
                          lang,
                          0
                        )} km`
                      : `${t('garage.dueIn')} ${formatNumber(
                          item.dueInKm,
                          lang,
                          0
                        )} km`}
                  </StatusBadge>
                </div>

                {!isDone && (
                  <Button
                    variant="outline"
                    fullWidth
                    icon={<Wrench className="w-4 h-4 text-brand-accent" />}
                    onClick={() => navigate('/book/prov-1')}
                  >
                    {t('vendor.bookService')}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-neutral-charcoal/60 backdrop-blur-xs flex items-end justify-center p-4">
          <form
            onSubmit={handleAddVehicle}
            className="w-full max-w-[448px] bg-surface-pure rounded-2xl p-5 shadow-e2 space-y-3.5"
          >
            <h3 className="text-headline-md text-brand-primary">
              {t('garage.addVehicle')}
            </h3>

            <input
              type="text"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
              placeholder={t('garage.make')}
              className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-4 text-body-md"
            />
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder={t('garage.model')}
              className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-4 text-body-md"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={t('garage.year')}
                className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-4 text-body-md"
              />
              <input
                type="number"
                required
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder={t('garage.mileage')}
                className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-4 text-body-md"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                variant="outline-slate"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </Button>
              <Button type="submit" variant="cta" fullWidth>
                {t('garage.saveVehicle')}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

