import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Wrench,
  Cog,
  AlertTriangle,
  Palette,
  Globe,
  Smartphone,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { BottomNav } from '../components/ui/Navigation';
import { Wordmark } from '../components/ui/Wordmark';

export const AppShell: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    {
      path: '/diagnose',
      label:
        i18n.language === 'ar'
          ? '⭐ مساعد تشخيص الأعطال (DSS)'
          : '⭐ Diagnostic DSS Chatbot Demo',
      icon: Sparkles,
      highlight: true,
    },
    {
      path: '/mechanics',
      label:
        i18n.language === 'ar'
          ? 'دليل الورش والميكانيكية'
          : 'Mechanics Directory & Filters',
      icon: Wrench,
    },
    {
      path: '/parts',
      label:
        i18n.language === 'ar'
          ? 'البحث عن قطع الغيار والتوصيل'
          : 'Spare Parts Locator & Delivery',
      icon: Cog,
    },
    {
      path: '/sos',
      label:
        i18n.language === 'ar'
          ? 'إنقاذ الطريق السريع (SOS)'
          : 'Emergency Roadside SOS Tracker',
      icon: AlertTriangle,
    },
    {
      path: '/styleguide',
      label:
        i18n.language === 'ar'
          ? 'معرض نظام التصميم (Styleguide)'
          : 'Design System & Token Showcase',
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-dvh bg-brand-primary lg:flex lg:items-start lg:justify-center lg:gap-10 lg:px-8 lg:py-6 relative overflow-x-hidden">
      {/* Desktop Backdrop Diagonal Dark Wine Ribbons */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none fixed -left-24 -bottom-24 w-96 h-96 rounded-full bg-brand-accent/25 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none fixed -right-20 -top-20 w-96 h-96 rounded-full bg-brand-accent/30 blur-2xl"
      />

      {/* Desktop Presentation Sidebar (Visible on >= 1024px) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[340px] lg:sticky lg:top-8 text-surface-pure space-y-5 z-10">
        <div className="bg-surface-pure/8 backdrop-blur-md rounded-2xl p-5 border border-surface-pure/15 space-y-3">
          <Wordmark variant="on-navy" size="lg" />
          <p className="text-body-md text-on-primary-container">
            {t('brand.tagline')} — {t('brand.descriptor')}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-2.5 py-1 rounded-full bg-surface-pure/15 hover:bg-surface-pure/25 text-surface-pure text-label-sm inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 rtl:rotate-180" />
              <span>{i18n.language === 'ar' ? 'شاشة البداية' : 'Start Screen'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/docs')}
              className="px-2.5 py-1 rounded-full bg-brand-accent text-surface-pure text-label-sm inline-flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>{i18n.language === 'ar' ? 'وثائق المشروع (Docs)' : 'Project Docs'}</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Scenarios Switcher */}
        <div className="bg-surface-pure/8 backdrop-blur-md rounded-2xl p-4 border border-surface-pure/15 space-y-2">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-label-sm uppercase tracking-wider text-on-primary-container flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>
                {i18n.language === 'ar'
                  ? 'سيناريوهات العرض السريع'
                  : 'Interactive Demo Flows'}
              </span>
            </span>
            <button
              type="button"
              onClick={() =>
                i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
              }
              className="px-2.5 py-1 rounded-full bg-brand-accent text-surface-pure text-label-sm inline-flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>

          {quickLinks.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`w-full text-start px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 text-label-md transition cursor-pointer ${
                  active
                    ? 'bg-brand-accent text-surface-pure shadow-e1'
                    : item.highlight
                      ? 'bg-surface-pure/15 text-surface-pure hover:bg-brand-accent/80'
                      : 'text-on-primary-container hover:bg-surface-pure/10 hover:text-surface-pure'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile-First Viewport Container (360-480px) */}
      <div className="w-full max-w-[480px] mx-auto min-h-dvh bg-surface-canvas text-neutral-charcoal flex flex-col relative shadow-e2 lg:rounded-[28px] lg:overflow-hidden lg:border-[6px] lg:border-surface-pure/15">
        <main className="flex-1 pb-[64px]">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

