import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Fuel, Plus, TrendingDown } from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/BadgesAndTabs';
import { useAppStore } from '../../store/useAppStore';
import { formatEGP, formatNumber, type Lang } from '../../lib/format';

export const FuelLogScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const fuelEntries = useAppStore((s) => s.fuelEntries);
  const activeVehicleId = useAppStore((s) => s.activeVehicleId);
  const addFuelEntry = useAppStore((s) => s.addFuelEntry);

  const vehicleEntries = fuelEntries
    .filter((e) => e.vehicleId === activeVehicleId)
    .sort((a, b) => a.odometerKm - b.odometerKm);

  const lastOdo =
    vehicleEntries[vehicleEntries.length - 1]?.odometerKm || 79550;

  const [odometerKm, setOdometerKm] = useState(String(lastOdo + 380));
  const [liters, setLiters] = useState('32');
  const [costEgp, setCostEgp] = useState('480');

  const avgConsumption =
    vehicleEntries.length >= 2
      ? Number(
          (
            vehicleEntries.reduce(
              (acc, e) => acc + (e.consumptionLPer100Km || 8.2),
              0
            ) / vehicleEntries.length
          ).toFixed(1)
        )
      : null;

  const totalSpend = vehicleEntries.reduce((acc, e) => acc + e.costEgp, 0);

  const handleAddFuel = (e: React.FormEvent) => {
    e.preventDefault();
    const odo = Number(odometerKm);
    const lit = Number(liters);
    const cost = Number(costEgp);
    if (!odo || !lit || !cost) return;
    addFuelEntry({ odometerKm: odo, liters: lit, costEgp: cost });
    setOdometerKm(String(odo + 390));
  };

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar title={t('fuel.title')} backTo="/garage" />

      <div className="p-4 space-y-4">
        {/* Summary KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-brand-primary text-surface-pure rounded-2xl p-4 shadow-e1">
            <span className="text-label-sm text-on-primary-container block">
              {t('fuel.avgConsumption')}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-headline-lg">
                {avgConsumption !== null
                  ? formatNumber(avgConsumption, lang, 1)
                  : '—'}
              </span>
              <span className="text-body-sm text-on-primary-container">
                L / 100km
              </span>
            </div>
          </div>

          <div className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15">
            <span className="text-label-sm text-neutral-slate block">
              {t('fuel.totalSpent')}
            </span>
            <span className="text-headline-md text-brand-accent mt-1 block">
              {formatEGP(totalSpend, lang)}
            </span>
          </div>
        </div>

        {/* Recharts Consumption Trend Line/Area Chart */}
        <div className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-status-success" />
              <h2 className="text-headline-sm text-brand-primary">
                {t('fuel.chartTitle')}
              </h2>
            </div>
            <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
          </div>

          {vehicleEntries.length < 2 ? (
            <p className="text-body-sm text-neutral-slate py-6 text-center">
              {t('fuel.needMoreEntries')}
            </p>
          ) : (
            <div dir="ltr" className="h-[190px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={vehicleEntries}
                  margin={{ top: 8, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="wineFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#790D16" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#790D16" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#8A9AA6' }}
                  />
                  <YAxis
                    domain={[6, 11]}
                    tick={{ fontSize: 11, fill: '#8A9AA6' }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="consumptionLPer100Km"
                    stroke="#790D16"
                    strokeWidth={2.5}
                    fill="url(#wineFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Log New Fuel Fill-up Form */}
        <form
          onSubmit={handleAddFuel}
          className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 space-y-3"
        >
          <h3 className="text-headline-sm text-brand-primary flex items-center gap-2">
            <Fuel className="w-4 h-4 text-brand-accent" />
            <span>{t('fuel.addEntry')}</span>
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            <label className="block">
              <span className="text-label-sm text-neutral-slate block mb-1">
                {t('fuel.odometer')}
              </span>
              <input
                type="number"
                required
                value={odometerKm}
                onChange={(e) => setOdometerKm(e.target.value)}
                className="w-full h-[44px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-3 text-body-md"
              />
            </label>
            <label className="block">
              <span className="text-label-sm text-neutral-slate block mb-1">
                {t('fuel.liters')}
              </span>
              <input
                type="number"
                required
                value={liters}
                onChange={(e) => setLiters(e.target.value)}
                className="w-full h-[44px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-3 text-body-md"
              />
            </label>
            <label className="block">
              <span className="text-label-sm text-neutral-slate block mb-1">
                {t('fuel.totalCost')}
              </span>
              <input
                type="number"
                required
                value={costEgp}
                onChange={(e) => setCostEgp(e.target.value)}
                className="w-full h-[44px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-3 text-body-md"
              />
            </label>
          </div>

          <Button
            type="submit"
            variant="cta"
            fullWidth
            icon={<Plus className="w-4 h-4" />}
          >
            {t('fuel.saveEntry')}
          </Button>
        </form>

        {/* Recent Fuel Fill-up Entries */}
        <div className="space-y-2">
          {[...vehicleEntries].reverse().map((entry) => (
            <div
              key={entry.id}
              className="bg-surface-pure rounded-xl p-3.5 shadow-e1 border border-neutral-slate/15 flex items-center justify-between"
            >
              <div>
                <span className="text-label-lg text-brand-primary block">
                  {formatNumber(entry.odometerKm, lang, 0)} km •{' '}
                  {formatNumber(entry.liters, lang, 0)} L
                </span>
                <span className="text-body-sm text-neutral-slate">
                  {entry.date}
                </span>
              </div>
              <div className="text-end">
                <span className="text-label-lg text-brand-accent block">
                  {formatEGP(entry.costEgp, lang)}
                </span>
                {entry.consumptionLPer100Km && (
                  <span className="text-body-sm text-status-success font-medium">
                    {formatNumber(entry.consumptionLPer100Km, lang, 1)} L/100km
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

