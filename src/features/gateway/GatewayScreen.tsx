import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  Smartphone,
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Globe,
  BookOpen,
  FileSpreadsheet,
} from 'lucide-react';
import { Wordmark } from '../../components/ui/Wordmark';
import { StatusBadge } from '../../components/ui/BadgesAndTabs';

export const GatewayScreen: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="min-h-dvh bg-brand-primary text-surface-pure flex flex-col justify-between relative overflow-hidden">
      {/* Diagonal Dark Wine (#790D16) Graphic Ribbons (§6.1 Brand Identity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-16 w-72 h-80 bg-brand-accent/35 rotate-25 rounded-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-24 w-56 h-64 bg-brand-accent/55 rotate-25 rounded-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-brand-accent/20 blur-2xl"
      />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-6 flex items-center justify-between gap-3">
        <Wordmark variant="on-navy" size="lg" />

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-surface-pure/12 text-label-sm text-surface-pure">
            MIS-26/27 – 1 • ERU
          </span>
          <button
            type="button"
            onClick={() => i18n.changeLanguage(isAr ? 'en' : 'ar')}
            className="h-9 px-3.5 rounded-full bg-surface-pure/15 hover:bg-surface-pure/25 text-surface-pure text-label-md inline-flex items-center gap-1.5 transition cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </header>

      {/* Main Mobile-First Chooser Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 my-auto">
        <div className="max-w-xl mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent text-surface-pure text-label-sm mb-3 shadow-e1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>
              {isAr
                ? 'منصة تصليحتك الذكية لخدمات السيارات • GEF 2026'
                : 'Smart Automotive Services Platform • GEF 2026'}
            </span>
          </div>

          <h1 className="text-headline-lg sm:text-[36px] sm:leading-[42px] text-surface-pure font-extrabold">
            {isAr
              ? 'اختر طريقة استعراض مشروع tsl7tk'
              : 'Choose How You Want to Explore tsl7tk'}
          </h1>
          <p className="text-body-md sm:text-body-lg text-on-primary-container mt-2">
            {isAr
              ? 'تصفح ملخص المشروع والنموذج المالي التفاعلي بدلاً من قراءة ملف الـ PDF المكون من ٦٠ صفحة، أو جرب تطبيق الموبايل التفاعلي ونظام تشخيص الأعطال (DSS).'
              : 'Review the interactive project summary & financial model without reading the 60-page PDF, or jump straight into the clickable mobile app & Diagnostic DSS demo.'}
          </p>
        </div>

        {/* 2 Primary Gateway Cards (Mobile-First Stack -> 2 Columns on Tablet/Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* OPTION 1: DOCS (2-Page Executive Summary & Financial Model) */}
          <div
            onClick={() => navigate('/docs')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/docs');
            }}
            className="group text-start bg-surface-pure text-neutral-charcoal rounded-[24px] p-5 sm:p-6 shadow-e2 border-2 border-transparent hover:border-brand-accent transition-all flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary text-surface-pure flex items-center justify-center shadow-e1">
                  <FileText className="w-6 h-6 stroke-[2]" />
                </div>
                <StatusBadge variant="verified">
                  {isAr ? 'ملخص الـ ٦٠ صفحة (صفحتان)' : '2-Page Interactive Docs'}
                </StatusBadge>
              </div>

              <div>
                <span className="text-label-sm uppercase tracking-wider text-neutral-slate block">
                  {isAr
                    ? 'الخيار الأول • الوثائق والنموذج المالي'
                    : 'Option 01 • Project Docs'}
                </span>
                <h2 className="text-headline-md text-brand-primary mt-1">
                  {isAr
                    ? 'تفاصيل المشروع والنموذج المالي (Docs)'
                    : 'Project Details & ROI Model (Docs)'}
                </h2>
                <p className="text-body-md text-neutral-charcoal mt-1.5">
                  {isAr
                    ? 'ملخص شامل للفصل الأول في صفحتين مترابطتين: النموذج المالي ومحاكي التعادل، والقصة البصرية لرحلة الإصلاح.'
                    : 'Interactive Chapter 1 summary across 2 linked pages: the ROI & Break-Even Simulator and the Visual Journey Overview.'}
                </p>
              </div>

              <ul className="space-y-1.5 text-body-sm text-neutral-slate pt-1">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-status-success shrink-0" />
                  <span>
                    {isAr
                      ? 'صفحة ١: محاكي الأرباح واقتصاديات الوحدة والمصادر الـ ١٦'
                      : 'Page 1: Interactive Break-Even Simulator & 16 Citations'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                  <span>
                    {isAr
                      ? 'صفحة ٢: القصة البصرية، مقارنة السوق، ورؤية مصر ٢٠٣٠'
                      : 'Page 2: Visual Story, Comparison Cards & Vision 2030'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-divider space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/docs');
                  }}
                  className="min-h-[38px] px-3 py-1.5 rounded-xl bg-brand-primary text-surface-pure text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-e1 hover:opacity-95 transition cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {isAr ? '١. النموذج المالي' : '1. ROI Model'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/docs/overview');
                  }}
                  className="min-h-[38px] px-3 py-1.5 rounded-xl bg-surface-canvas border border-divider text-brand-primary text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:border-brand-primary transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {isAr ? '٢. القصة البصرية' : '2. Visual Story'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* OPTION 2: DEMO (Interactive Mobile App & Diagnostic DSS) */}
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="group text-start bg-surface-pure text-neutral-charcoal rounded-[24px] p-5 sm:p-6 shadow-e2 border-2 border-brand-accent/40 hover:border-brand-accent transition-all flex flex-col justify-between cursor-pointer active:scale-[0.99]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent text-surface-pure flex items-center justify-center shadow-e1">
                  <Smartphone className="w-6 h-6 stroke-[2]" />
                </div>
                <StatusBadge variant="top-rated">
                  {isAr ? 'تطبيق تفاعلي + DSS' : 'Interactive App + DSS'}
                </StatusBadge>
              </div>

              <div>
                <span className="text-label-sm uppercase tracking-wider text-brand-accent block">
                  {isAr
                    ? 'الخيار الثاني • التطبيق التجريبي'
                    : 'Option 02 • Interactive Demo'}
                </span>
                <h2 className="text-headline-md text-brand-primary mt-1">
                  {isAr
                    ? 'تطبيق الموبايل ومساعد التشخيص (Demo)'
                    : 'Mobile App & Diagnostic DSS (Demo)'}
                </h2>
                <p className="text-body-md text-neutral-charcoal mt-1.5">
                  {isAr
                    ? 'جرب رحلة السائق كاملة: الشات بوت الذكي لتشخيص الأعطال (DSS)، البحث عن الورش، قطع الغيار، خريطة القاهرة، وطوارئ الونش SOS.'
                    : 'Experience the full mobile-first driver flow: AI + Rule-Based Diagnostic DSS chatbot, Cairo mechanics directory, spare parts locator, garage, and SOS.'}
                </p>
              </div>

              <ul className="space-y-1.5 text-body-sm text-neutral-slate pt-1">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>
                    {isAr
                      ? 'شجرة قرارات تشخيص الأعطال (عربي / إنجليزي / فرانكو)'
                      : 'Rule-based DSS chatbot (English, Arabic & Franco)'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                  <span>
                    {isAr
                      ? 'مصمم بالكامل وفق نظام تصميم tsl7tk'
                      : 'Strictly built on the tsl7tk 60/20/10/10 Design System'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-divider flex items-center justify-between">
              <span className="text-label-lg text-brand-accent">
                {isAr ? 'تشغيل التطبيق التفاعلي' : 'Launch Interactive Demo'}
              </span>
              <span className="w-9 h-9 rounded-full bg-brand-accent text-surface-pure flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </span>
            </div>
          </button>
        </div>
      </main>

      {/* Footer Metadata */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-6 text-body-sm text-on-primary-container flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
        <span>
          Egyptian Russian University • Business Technology Dept • Academic Year
          2026–2027
        </span>
        <span>Supervised by Dr. Reham &amp; Dr. Paula</span>
      </footer>
    </div>
  );
};
