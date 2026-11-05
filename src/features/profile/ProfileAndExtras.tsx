import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Bell,
  Palette,
  RotateCcw,
  LogIn,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { Wordmark } from '../../components/ui/Wordmark';
import { Button, QuickActionSquircle } from '../../components/ui/Button';
import {
  SearchBar,
  SelectField,
  TextAreaField,
  ToggleSwitch,
} from '../../components/ui/FormControls';
import {
  StatusBadge,
  FilterChip,
  AlertBanner,
} from '../../components/ui/BadgesAndTabs';
import { useAppStore } from '../../store/useAppStore';
import { formatRelativeMinutes, pickLocalized, type Lang } from '../../lib/format';

export const ProfileScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const resetDemoData = useAppStore((s) => s.resetDemoData);
  const [resetDone, setResetDone] = useState(false);

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar title={t('profile.title')} backTo="/home" />

      <div className="p-4 space-y-4">
        {/* Driver Identity Card */}
        <div className="bg-brand-primary text-surface-pure rounded-2xl p-4 shadow-e1 flex items-center justify-between">
          <div>
            <span className="text-label-sm text-secondary-container uppercase">
              {t('brand.pilotCity')}
            </span>
            <h2 className="text-headline-md mt-0.5">Khaled Ashraf</h2>
            <p className="text-body-sm text-on-primary-container">
              +20 100 234 5678 • Hyundai Elantra AD
            </p>
          </div>
          <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
        </div>

        {/* Chapter 1 §7.4 Estimated Annual Driver Value Card */}
        <div className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-status-success-bg text-status-success flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-label-sm text-neutral-slate block">
                {t('profile.savedSummary')}
              </span>
              <span className="text-headline-sm text-status-success">
                {t('profile.savedAmount')}
              </span>
            </div>
          </div>
        </div>

        {resetDone && (
          <AlertBanner
            variant="success"
            title={
              i18n.language === 'ar'
                ? 'تمت إعادة ضبط البيانات التجريبية بنجاح'
                : 'Demo store reset to initial seed data!'
            }
          />
        )}

        {/* Settings & Showcase Links */}
        <div className="bg-surface-pure rounded-2xl shadow-e1 border border-neutral-slate/15 divide-y divide-divider overflow-hidden">
          <button
            type="button"
            onClick={() =>
              i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
            }
            className="w-full p-4 flex items-center justify-between hover:bg-surface-canvas transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-brand-primary" />
              <span className="text-label-lg text-neutral-charcoal">
                {t('profile.language')}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-brand-accent text-surface-pure text-label-sm">
              {i18n.language === 'ar' ? 'العربية (RTL)' : 'English (LTR)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className="w-full p-4 flex items-center justify-between hover:bg-surface-canvas transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-brand-primary" />
              <span className="text-label-lg text-neutral-charcoal">
                {t('profile.notifications')}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-slate rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full p-4 flex items-center justify-between hover:bg-surface-canvas transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogIn className="w-5 h-5 text-brand-primary" />
              <span className="text-label-lg text-neutral-charcoal">
                {t('profile.authScreen')}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-slate rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/styleguide')}
            className="w-full p-4 flex items-center justify-between hover:bg-surface-canvas transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-brand-accent" />
              <span className="text-label-lg text-brand-primary">
                {t('profile.styleguide')}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-slate rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => {
              resetDemoData();
              setResetDone(true);
            }}
            className="w-full p-4 flex items-center justify-between hover:bg-surface-canvas transition cursor-pointer text-brand-accent"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5" />
              <span className="text-label-lg">{t('profile.resetDemo')}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export const NotificationsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const notifications = useAppStore((s) => s.notifications);
  const markAllRead = useAppStore((s) => s.markAllNotificationsRead);

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar
        title={t('profile.notifications')}
        backTo="/home"
        rightSlot={
          <button
            type="button"
            onClick={markAllRead}
            className="text-label-sm text-surface-pure/90 underline cursor-pointer"
          >
            ✓
          </button>
        }
      />

      <div className="p-4 space-y-2.5">
        {notifications.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => {
              markAllRead();
              navigate(n.linkTo);
            }}
            className={`w-full text-start p-4 rounded-2xl shadow-e1 border transition cursor-pointer ${
              n.read
                ? 'bg-surface-pure border-neutral-slate/15'
                : 'bg-surface-pure border-brand-accent/40'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-label-lg text-brand-primary">
                {pickLocalized(n.title, lang)}
              </h3>
              <span className="text-body-sm text-neutral-slate">
                {formatRelativeMinutes(n.minutesAgo, lang)}
              </span>
            </div>
            <p className="text-body-sm text-neutral-charcoal mt-1">
              {pickLocalized(n.body, lang)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [remember, setRemember] = useState(true);

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar title={t('auth.signIn')} backTo="/profile" />
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/home');
          }}
          className="bg-surface-pure rounded-2xl p-5 shadow-e1 border border-neutral-slate/15 space-y-4"
        >
          <div className="text-center space-y-1 pb-2">
            <Wordmark variant="on-light" size="lg" className="justify-center" />
            <h2 className="text-headline-md text-brand-primary pt-2">
              {t('auth.loginTitle')}
            </h2>
          </div>

          <label className="block">
            <span className="text-label-md text-brand-primary block mb-1.5">
              {t('auth.email')}
            </span>
            <input
              type="text"
              defaultValue="+20 100 234 5678"
              className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-4 text-body-lg"
            />
          </label>

          <label className="block">
            <span className="text-label-md text-brand-primary block mb-1.5">
              {t('auth.password')}
            </span>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-4 text-body-lg"
            />
          </label>

          {/* §5.2 Toggle Switch ("Remember me") in Dark Wine (#790D16) */}
          <div className="pt-1">
            <ToggleSwitch
              checked={remember}
              onChange={setRemember}
              label={t('auth.rememberMe')}
            />
          </div>

          <Button type="submit" variant="cta" fullWidth>
            {t('auth.signIn')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export const StyleguideScreen: React.FC = () => {
  const [toggleState, setToggleState] = useState(true);

  const swatches = [
    { name: 'Oxford Navy (Primary 60%)', hex: '#17365D', cls: 'bg-brand-primary text-surface-pure' },
    { name: 'Dark Wine (Accent 10%)', hex: '#790D16', cls: 'bg-brand-accent text-surface-pure' },
    { name: 'Platinum Canvas (20%)', hex: '#F4F6F9', cls: 'bg-surface-canvas text-neutral-charcoal border border-neutral-slate/30' },
    { name: 'Cool Steel Neutral (5%)', hex: '#8A9AA6', cls: 'bg-neutral-slate text-surface-pure' },
    { name: 'Jet Charcoal Ink (5%)', hex: '#1F2937', cls: 'bg-neutral-charcoal text-surface-pure' },
    { name: 'Pure Surface', hex: '#FFFFFF', cls: 'bg-surface-pure text-neutral-charcoal border border-neutral-slate/30' },
  ];

  return (
    <div className="min-h-full bg-surface-canvas pb-10">
      <AppBar title="tsl7tk Design System Showcase" backTo="/profile" />

      <div className="p-4 space-y-6">
        {/* 1. Brand Wordmark & Logo Mark */}
        <section className="bg-surface-pure rounded-2xl p-4 shadow-e1 space-y-3">
          <h2 className="text-headline-sm text-brand-primary">
            1. Brand Wordmark &amp; Automotive Wrench Logo
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Wordmark variant="on-light" size="md" />
            <div className="bg-brand-primary p-3 rounded-xl">
              <Wordmark variant="on-navy" size="md" />
            </div>
          </div>
        </section>

        {/* 2. 60/20/10/10 Color Palette */}
        <section className="bg-surface-pure rounded-2xl p-4 shadow-e1 space-y-3">
          <h2 className="text-headline-sm text-brand-primary">
            2. Core Color System (60 / 20 / 10 / 10 Rule)
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {swatches.map((s) => (
              <div key={s.hex} className={`p-3 rounded-xl ${s.cls}`}>
                <span className="text-label-md block">{s.name}</span>
                <span className="font-mono text-body-sm opacity-90">{s.hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Typography Scale */}
        <section className="bg-surface-pure rounded-2xl p-4 shadow-e1 space-y-2">
          <h2 className="text-headline-sm text-brand-primary">
            3. Typographic Scale (Plus Jakarta Sans &amp; Inter)
          </h2>
          <p className="text-display-brand text-brand-primary">display-brand (28px / 800)</p>
          <p className="text-headline-lg text-brand-primary">headline-lg (26px / 700)</p>
          <p className="text-headline-md text-brand-primary">headline-md (20px / 700)</p>
          <p className="text-headline-sm text-brand-primary">headline-sm (17px / 600)</p>
          <p className="text-body-lg">body-lg (16px / 400 Inter)</p>
          <p className="text-body-md">body-md (14px / 400 Inter)</p>
          <p className="text-body-sm text-neutral-slate">body-sm (12px / 400 Inter)</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <span className="text-label-lg text-brand-primary">label-lg (14px/600)</span>
            <span className="text-label-md text-brand-accent">label-md (12px/600)</span>
            <span className="text-label-sm text-neutral-slate">label-sm (10px/700)</span>
          </div>
        </section>

        {/* 4. Buttons & Quick Actions */}
        <section className="bg-surface-pure rounded-2xl p-4 shadow-e1 space-y-3">
          <h2 className="text-headline-sm text-brand-primary">
            4. Buttons &amp; Quick Action Squircles (§5.1)
          </h2>
          <Button variant="primary" fullWidth>Primary Button (#17365D)</Button>
          <Button variant="cta" fullWidth>High-Priority CTA (#790D16)</Button>
          <Button variant="outline" fullWidth>Outline Button</Button>
          <Button variant="text-link">Text Link Action</Button>
          <div className="flex gap-3 pt-2">
            <QuickActionSquircle action="call" label="Call" />
            <QuickActionSquircle action="chat" label="Chat" />
            <QuickActionSquircle action="directions" label="Directions" />
          </div>
        </section>

        {/* 5. Form Controls, Chips & Alerts */}
        <section className="bg-surface-pure rounded-2xl p-4 shadow-e1 space-y-3">
          <h2 className="text-headline-sm text-brand-primary">
            5. Inputs, Badges, Chips &amp; Alerts (§5.2–5.5)
          </h2>
          <SearchBar surface="on-white" placeholder="Search mechanics, services, parts..." />
          <SelectField label="Select Vehicle">
            <option>Hyundai Elantra AD (2019)</option>
          </SelectField>
          <TextAreaField label="Multiline Notes" placeholder="Describe symptoms..." />
          <ToggleSwitch
            checked={toggleState}
            onChange={setToggleState}
            label="Remember me (#790D16 Active Track)"
          />
          <div className="flex flex-wrap gap-2 pt-1">
            <FilterChip active>Nearby</FilterChip>
            <FilterChip hasDropdown>Rating</FilterChip>
            <StatusBadge variant="verified">Verified</StatusBadge>
            <StatusBadge variant="top-rated">Top Rated</StatusBadge>
            <StatusBadge variant="demo">Demo data</StatusBadge>
          </div>
          <AlertBanner variant="success" title="Request confirmed!" body="Provider has been notified." />
          <AlertBanner variant="error" title="This provider is currently unavailable" />
        </section>
      </div>
    </div>
  );
};

