import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  FileSpreadsheet,
  BookOpen,
  AlertTriangle,
  Bot,
  ShieldCheck,
  PackageSearch,
  Truck,
  CheckCircle2,
  Wrench,
  Sparkles,
  TrendingUp,
  MapPin,
  Layers,
  Target,
  Cpu,
} from 'lucide-react';
import { Wordmark } from '../../components/ui/Wordmark';

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Breakdown',
    sub: 'SOS button',
    icon: AlertTriangle,
    accent: true,
  },
  {
    step: '02',
    title: 'Diagnosis',
    sub: 'AI + Rule DSS',
    icon: Bot,
    accent: false,
  },
  {
    step: '03',
    title: 'Verified provider',
    sub: 'Nearby, rated',
    icon: ShieldCheck,
    accent: false,
  },
  {
    step: '04',
    title: 'Right part',
    sub: 'Compare sellers',
    icon: PackageSearch,
    accent: false,
  },
  {
    step: '05',
    title: 'Delivered & reviewed',
    sub: 'Tracked request',
    icon: Truck,
    accent: false,
  },
];

const COMPARISON_ROWS = [
  {
    criterion: 'Main focus',
    parts: 'Finding and buying parts',
    service: 'Finding or booking providers',
    tsl7tk: 'The whole repair journey',
  },
  {
    criterion: 'Starts from',
    parts: 'A part you already know',
    service: 'A shop on a map',
    tsl7tk: 'The problem itself (symptom intake)',
  },
  {
    criterion: 'Fault guidance',
    parts: 'Not documented',
    service: 'Not documented',
    tsl7tk: 'Chatbot with rule-based diagnostic DSS',
  },
  {
    criterion: 'Trust & verification',
    parts: 'Merchant ratings only',
    service: 'Basic star ratings',
    tsl7tk: 'Admin-verified providers, job-locked reviews & stock timestamps',
  },
  {
    criterion: 'Garage & fuel log',
    parts: 'Partly (mileage only)',
    service: 'Partly (service record)',
    tsl7tk: 'Multi-vehicle garage, maintenance alerts & L/100km fuel tracking',
  },
];

const REVENUE_SCENARIOS = [
  {
    name: 'Conservative',
    providers: '40 providers · 200 req/mo',
    amount: 14000,
    pct: 26,
    delta: '-EGP 3,236 vs cost',
    tone: 'navy' as const,
  },
  {
    name: 'Base Case',
    providers: '80 providers · 400 req/mo',
    amount: 28000,
    pct: 52,
    delta: '+EGP 10,764 surplus',
    tone: 'navy' as const,
    highlight: true,
  },
  {
    name: 'Optimistic',
    providers: '150 providers · 800 req/mo',
    amount: 53750,
    pct: 100,
    delta: '+EGP 36,514 surplus',
    tone: 'success' as const,
  },
  {
    name: 'Monthly Cost',
    providers: 'Proposal baseline OPEX',
    amount: 17236,
    pct: 32,
    delta: 'Break-even benchmark',
    tone: 'wine' as const,
  },
];

export const ProjectOverviewDocsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      dir="ltr"
      className="min-h-dvh bg-surface-canvas text-neutral-charcoal selection:bg-brand-primary selection:text-surface-pure pb-20 sm:pb-8"
    >
      {/* MOBILE-FIRST STICKY DOCS HEADER (2-Row Layout on Mobile so elements never collide) */}
      <header className="sticky top-0 z-50 bg-surface-pure/95 backdrop-blur-md border-b border-divider shadow-e1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Row 1: Brand + Primary Demo Action */}
          <div className="h-14 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => navigate('/')}
                aria-label="Back to Start"
                className="w-9 h-9 shrink-0 rounded-xl bg-surface-canvas hover:bg-divider text-brand-primary flex items-center justify-center transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              </button>
              <Wordmark variant="on-light" size="sm" />
              <span className="hidden md:inline-block text-[11px] font-mono text-neutral-slate border-l border-divider pl-2.5">
                MIS-26/27-1 · Docs
              </span>
            </div>

            {/* Desktop Center Switcher */}
            <div className="hidden sm:inline-flex items-center p-1 rounded-xl bg-surface-canvas border border-divider">
              <button
                type="button"
                onClick={() => navigate('/docs')}
                className="min-h-[34px] px-3 py-1 rounded-lg text-xs font-medium text-neutral-charcoal hover:text-brand-primary inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>1. Investor &amp; ROI Model</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/docs/overview')}
                className="min-h-[34px] px-3 py-1 rounded-lg text-xs font-semibold bg-brand-primary text-surface-pure shadow-e1 inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>2. Story &amp; Overview</span>
              </button>
            </div>

            {/* Right CTA */}
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3.5 py-1.5 rounded-xl bg-brand-accent hover:opacity-95 text-surface-pure text-xs font-semibold shadow-e1 transition cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>App Demo</span>
            </button>
          </div>

          {/* Row 2 (Mobile Only): Full-Width 2-Page Segmented Switcher */}
          <div className="sm:hidden pb-2.5">
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-surface-canvas border border-divider">
              <button
                type="button"
                onClick={() => navigate('/docs')}
                className="min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-charcoal inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">1. ROI Model</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/docs/overview')}
                className="min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-primary text-surface-pure shadow-e1 inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">2. Story &amp; Overview</span>
              </button>
            </div>
          </div>

          {/* Row 3: Horizontal Quick-Jump Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-divider text-xs font-medium text-neutral-slate">
            <a
              href="#journey"
              className="shrink-0 px-3 py-1 rounded-full bg-surface-canvas text-brand-primary font-semibold"
            >
              1. Journey
            </a>
            <a
              href="#problem"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-surface-canvas hover:text-brand-primary"
            >
              2. Problem
            </a>
            <a
              href="#flow"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-surface-canvas hover:text-brand-primary"
            >
              3. 5-Step Flow
            </a>
            <a
              href="#why-it-wins"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-surface-canvas hover:text-brand-primary"
            >
              4. Why It Wins
            </a>
            <a
              href="#model"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-surface-canvas hover:text-brand-primary"
            >
              5. Revenue &amp; Break-Even
            </a>
            <a
              href="#pilot"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-surface-canvas hover:text-brand-primary"
            >
              6. Cairo Pilot
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="space-y-2">
        {/* 1. HERO + RESPONSIVE JOURNEY FLOW + 4 MACRO STATS */}
        <section
          id="journey"
          className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-10 sm:pb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-pure border border-divider text-[11px] font-mono text-brand-primary mb-4 shadow-e1">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            <span>Docs Page 2 of 2 · Executive Visual Story</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-brand-primary leading-[1.1] tracking-tight max-w-[16ch]">
            From breakdown to fixed, in one app.
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-[56ch] mt-3 sm:mt-4 mb-6 leading-relaxed">
            Car owners in Egypt lose time and money hunting for a mechanic, a
            trustworthy part, and help on the roadside.{' '}
            <strong className="text-brand-primary font-semibold">TSL7TK</strong>{' '}
            puts all three in one place, starting in Cairo.
          </p>

          {/* Touch-Friendly Mobile-First CTA Stack */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="min-h-[46px] px-5 py-3 rounded-xl bg-brand-accent text-surface-pure font-semibold text-sm shadow-e1 hover:opacity-95 inline-flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Try Interactive Mobile Demo</span>
            </button>
            <a
              href="#model"
              className="min-h-[46px] px-5 py-3 rounded-xl bg-brand-primary text-surface-pure font-semibold text-sm inline-flex items-center justify-center gap-2 hover:opacity-95 transition"
            >
              <span>See the Business Model</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/docs')}
              className="min-h-[46px] px-4 py-3 rounded-xl bg-surface-pure border border-divider text-brand-primary font-semibold text-sm hover:border-brand-primary inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Page 1: Interactive ROI Simulator</span>
            </button>
          </div>

          {/* RESPONSIVE JOURNEY ROUTE CARD (No horizontal clipping or awkward scroll) */}
          <div
            className="mt-8 sm:mt-10 bg-surface-pure border border-divider rounded-2xl p-4 sm:p-6 shadow-e1"
            role="region"
            aria-label="Unified 5-step repair journey from breakdown to review"
          >
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-divider">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-slate">
                End-to-End Platform Journey
              </span>
              <span className="text-xs font-semibold text-brand-accent bg-status-error-bg px-2.5 py-0.5 rounded-full">
                5 Connected Stages
              </span>
            </div>

            {/* Mobile Vertical / 2-Col Connected Flow (< md) & Desktop 5-Col Track (>= md) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative">
              {JOURNEY_STEPS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className={`relative rounded-xl p-3.5 border transition ${
                      item.accent
                        ? 'bg-brand-primary text-surface-pure border-brand-primary shadow-e1'
                        : 'bg-surface-canvas/70 text-neutral-charcoal border-divider'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          item.accent
                            ? 'bg-brand-accent text-surface-pure'
                            : 'bg-surface-pure text-brand-primary border border-divider'
                        }`}
                      >
                        STEP {item.step}
                      </span>
                      <Icon
                        className={`w-4 h-4 ${
                          item.accent ? 'text-surface-pure' : 'text-brand-accent'
                        }`}
                      />
                    </div>
                    <div
                      className={`font-display font-bold text-sm ${
                        item.accent ? 'text-surface-pure' : 'text-brand-primary'
                      }`}
                    >
                      {item.title}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${
                        item.accent
                          ? 'text-on-primary-container'
                          : 'text-neutral-slate'
                      }`}
                    >
                      {item.sub}
                    </div>
                    {idx < JOURNEY_STEPS.length - 1 && (
                      <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-surface-pure border border-divider items-center justify-center text-brand-accent">
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 MACRO STATS GRID (2x2 on Mobile, 4-Col on Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div className="bg-surface-pure border border-divider rounded-2xl p-4 sm:p-5 shadow-e1">
              <b className="block font-display font-extrabold text-2xl sm:text-4xl text-brand-primary tracking-tight">
                11.05M
              </b>
              <span className="text-xs sm:text-sm text-on-surface-variant mt-1 block">
                licensed vehicles in Egypt (2025 CAPMAS)
              </span>
            </div>
            <div className="bg-surface-pure border border-divider rounded-2xl p-4 sm:p-5 shadow-e1">
              <b className="block font-display font-extrabold text-2xl sm:text-4xl text-brand-primary tracking-tight">
                2.84M
              </b>
              <span className="text-xs sm:text-sm text-on-surface-variant mt-1 block">
                vehicles in Cairo, our pilot city (25.7%)
              </span>
            </div>
            <div className="bg-surface-pure border border-divider rounded-2xl p-4 sm:p-5 shadow-e1">
              <b className="block font-display font-extrabold text-2xl sm:text-4xl text-brand-primary tracking-tight">
                82.7%
              </b>
              <span className="text-xs sm:text-sm text-on-surface-variant mt-1 block">
                of Egyptians online — mobile-first works
              </span>
            </div>
            <div className="bg-surface-pure border border-divider rounded-2xl p-4 sm:p-5 shadow-e1">
              <b className="block font-display font-extrabold text-2xl sm:text-4xl text-status-success tracking-tight">
                +6.0%
              </b>
              <span className="text-xs sm:text-sm text-on-surface-variant mt-1 block">
                annual fleet growth in latest CAPMAS year
              </span>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM SECTION */}
        <section
          id="problem"
          className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-divider"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-slate mb-2">
            01 · The Market Problem
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-brand-primary">
            Fixing a car in Cairo means calling around.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-[60ch] mt-2">
            Drivers piece together help from street shops, phone calls, and
            social groups. The tools that exist each solve only one isolated
            slice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-6">
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <div className="w-10 h-10 rounded-xl bg-status-error-bg text-brand-accent flex items-center justify-center mb-3">
                <PackageSearch className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-primary mb-1.5">
                Hard to find parts
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Drivers ask seller after seller, with little proof a part is
                original or what it should fairly cost.
              </p>
            </div>

            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <div className="w-10 h-10 rounded-xl bg-surface-canvas text-brand-primary flex items-center justify-center mb-3">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-primary mb-1.5">
                Hard to trust providers
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                No easy way to check whether a mechanic or workshop is
                reliable, open right now, or genuinely rated.
              </p>
            </div>

            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <div className="w-10 h-10 rounded-xl bg-status-warning-bg text-status-warning flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-primary mb-1.5">
                Stranded when it breaks
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                In a roadside breakdown, drivers struggle to understand the
                fault and dispatch nearby towing or parts fast.
              </p>
            </div>
          </div>
        </section>

        {/* 3. 5-STEP TIMELINE */}
        <section
          id="flow"
          className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-divider"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-slate mb-2">
                02 · Product Solution
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-brand-primary">
                One flow from problem to part.
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant mt-1.5">
                Describe the symptom in Arabic or English and the app does the
                legwork.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/diagnose')}
              className="self-start sm:self-auto shrink-0 min-h-[40px] px-4 py-2 rounded-xl bg-brand-accent text-surface-pure text-xs font-semibold inline-flex items-center gap-1.5 shadow-e1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Live DSS Chatbot</span>
            </button>
          </div>

          <ol className="list-none space-y-3 sm:space-y-4">
            {[
              {
                num: '01',
                title: 'Ask the chatbot',
                desc: 'An AI chatbot in Arabic and English asks follow-ups. A rule-based diagnostic engine, validated by mechanics, suggests likely causes. Advice only — always confirmed by a provider.',
              },
              {
                num: '02',
                title: 'Find a verified provider nearby',
                desc: 'PostGIS location search, verified badges, real ratings, working hours, and one-tap Google Maps directions.',
              },
              {
                num: '03',
                title: 'Request the part or service',
                desc: 'The provider accepts or declines in-app. The driver tracks live status updates and receives push notifications.',
              },
              {
                num: '04',
                title: 'Get it delivered, or call roadside help',
                desc: 'Courier (Bosta / Mylerz) and Cairo tow partners handle the physical side. TSL7TK runs no fleet and holds no inventory.',
              },
              {
                num: '05',
                title: 'Review after the job is done',
                desc: 'Reviews unlock strictly after completed requests, backed by abuse reporting and admin moderation.',
              },
            ].map((step) => (
              <li
                key={step.num}
                className="bg-surface-pure border border-divider rounded-2xl p-4 sm:p-5 shadow-e1 flex items-start gap-3.5 sm:gap-4"
              >
                <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-primary text-surface-pure font-mono font-bold text-xs flex items-center justify-center">
                  {step.num}
                </span>
                <div className="min-w-0">
                  <b className="block font-display font-bold text-base sm:text-lg text-brand-primary">
                    {step.title}
                  </b>
                  <span className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1 block">
                    {step.desc}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. FULL-BLEED OXFORD NAVY COMPARISON BAND (Mobile Cards + Desktop Table) */}
        <section
          id="why-it-wins"
          className="bg-brand-primary text-surface-pure py-12 sm:py-16"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-on-primary-container mb-2">
              03 · Competitive Advantage
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-surface-pure">
              Why it wins: integration and trust.
            </h2>
            <p className="text-sm sm:text-base text-on-primary-container max-w-[60ch] mt-2">
              We don’t try to beat anyone on catalogue size or tow-truck count.
              Existing apps typically cover one slice of the repair journey. We
              connect them.
            </p>

            {/* MOBILE VIEW (< md): Stacked Comparison Cards (Zero horizontal scrolling!) */}
            <div className="md:hidden space-y-3 mt-6">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.criterion}
                  className="bg-surface-pure text-neutral-charcoal rounded-2xl p-4 shadow-e2 border border-divider"
                >
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-slate mb-2">
                    {row.criterion}
                  </div>
                  <div className="p-3 rounded-xl bg-status-warning-bg/70 border border-brand-accent/20 mb-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-brand-accent mb-0.5">
                      <span>TSL7TK (Unified OS)</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                    </div>
                    <div className="text-sm font-semibold text-brand-primary">
                      {row.tsl7tk}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-surface-canvas">
                      <span className="text-[10px] font-mono uppercase text-neutral-slate block">
                        Parts Marketplaces
                      </span>
                      <span className="text-neutral-charcoal font-medium mt-0.5 block">
                        {row.parts}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-canvas">
                      <span className="text-[10px] font-mono uppercase text-neutral-slate block">
                        Service / Discovery
                      </span>
                      <span className="text-neutral-charcoal font-medium mt-0.5 block">
                        {row.service}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW (>= md): Structured Comparison Table */}
            <div className="hidden md:block mt-8 bg-surface-pure text-neutral-charcoal rounded-2xl overflow-hidden shadow-e2 border border-divider">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-divider text-left font-semibold text-brand-primary bg-surface-canvas/60">
                    <th className="p-4">Dimension</th>
                    <th className="p-4">Parts marketplaces</th>
                    <th className="p-4">Service &amp; discovery apps</th>
                    <th className="p-4 bg-status-warning-bg text-brand-accent font-bold">
                      TSL7TK (تصليحتك)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.criterion}>
                      <td className="p-4 font-semibold text-brand-primary">
                        {row.criterion}
                      </td>
                      <td className="p-4 text-on-surface-variant">
                        {row.parts}
                      </td>
                      <td className="p-4 text-on-surface-variant">
                        {row.service}
                      </td>
                      <td className="p-4 bg-status-warning-bg/50 font-semibold text-brand-primary">
                        {row.tsl7tk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs sm:text-sm text-on-primary-container mt-4 max-w-[75ch]">
              Based on public documentation of ten platforms (including Sayyn,
              Ringaat, Dynamu, Dawar, and EgyCarParts). “Not documented” means
              we found no public evidence, not proof that the feature is absent.
            </p>
          </div>
        </section>

        {/* 5. BUSINESS MODEL & BREAK-EVEN SCENARIOS */}
        <section
          id="model"
          className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-slate mb-2">
            04 · Monetization &amp; Financial Feasibility
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-brand-primary">
            Free for drivers. Providers pay for results.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-[60ch] mt-2">
            Drivers never pay to use the app. Revenue comes from workshops and
            parts sellers who receive high-intent leads.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mt-6">
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <span className="text-[11px] font-mono uppercase text-neutral-slate">
                Stream 01 · Visibility
              </span>
              <h3 className="font-display font-extrabold text-2xl text-brand-primary mt-1 mb-1">
                EGP 150
                <span className="text-xs font-normal text-neutral-slate">
                  /mo
                </span>
              </h3>
              <p className="text-sm text-on-surface-variant">
                Listing boost per promoted listing per month.
              </p>
            </div>
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <span className="text-[11px] font-mono uppercase text-neutral-slate">
                Stream 02 · SaaS Tools
              </span>
              <h3 className="font-display font-extrabold text-2xl text-brand-primary mt-1 mb-1">
                EGP 300
                <span className="text-xs font-normal text-neutral-slate">
                  /mo
                </span>
              </h3>
              <p className="text-sm text-on-surface-variant">
                Pro subscription for provider analytics &amp; catalog tools.
              </p>
            </div>
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <span className="text-[11px] font-mono uppercase text-neutral-slate">
                Stream 03 · Fulfillment
              </span>
              <h3 className="font-display font-extrabold text-2xl text-brand-accent mt-1 mb-1">
                EGP 25
                <span className="text-xs font-normal text-neutral-slate">
                  /job
                </span>
              </h3>
              <p className="text-sm text-on-surface-variant">
                Commission per completed delivery or roadside SOS request.
              </p>
            </div>
          </div>

          {/* BREAK-EVEN CHART CARD (Clean on both Mobile & Desktop, zero clipping!) */}
          <div className="mt-8 bg-surface-pure border border-divider rounded-2xl p-5 sm:p-6 shadow-e1">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-divider">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-primary">
                  Break-even looks reachable.
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Monthly operating cost is{' '}
                  <strong className="text-brand-accent font-mono">
                    EGP 17,236
                  </strong>
                  . Compare it against monthly revenue across three pilot
                  scenarios:
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/docs')}
                className="self-start sm:self-auto shrink-0 text-xs font-semibold text-brand-accent hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Open Interactive Slider Simulator →</span>
              </button>
            </div>

            {/* Mobile Horizontal Progress Bars (< sm) so labels never squish */}
            <div className="sm:hidden space-y-3.5 mt-5">
              {REVENUE_SCENARIOS.map((sc) => {
                const barColor =
                  sc.tone === 'success'
                    ? 'bg-status-success'
                    : sc.tone === 'wine'
                    ? 'bg-brand-accent'
                    : 'bg-brand-primary';
                return (
                  <div
                    key={sc.name}
                    className={`p-3.5 rounded-xl border ${
                      sc.highlight
                        ? 'bg-surface-canvas border-brand-primary'
                        : 'bg-surface-pure border-divider'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-brand-primary">
                        {sc.name}
                      </span>
                      <span className="font-mono font-bold text-sm text-brand-primary">
                        EGP {sc.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-divider/60 rounded-full overflow-hidden my-1.5">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${sc.pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-slate">
                      <span>{sc.providers}</span>
                      <span className="font-mono font-medium text-neutral-charcoal">
                        {sc.delta}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tablet/Desktop Vertical Bar Chart (>= sm) with explicit fixed-height track so 100% never overflows */}
            <div className="hidden sm:grid grid-cols-4 gap-6 mt-6 pt-4">
              {REVENUE_SCENARIOS.map((sc) => {
                const barColor =
                  sc.tone === 'success'
                    ? 'bg-status-success'
                    : sc.tone === 'wine'
                    ? 'bg-brand-accent'
                    : 'bg-brand-primary';
                const textColor =
                  sc.tone === 'success'
                    ? 'text-status-success'
                    : sc.tone === 'wine'
                    ? 'text-brand-accent'
                    : 'text-brand-primary';
                return (
                  <div key={sc.name} className="flex flex-col items-center">
                    <div
                      className={`font-mono font-bold text-base mb-2 ${textColor}`}
                    >
                      EGP {sc.amount.toLocaleString()}
                    </div>
                    {/* Dedicated 160px Bar Track */}
                    <div className="w-full h-40 bg-surface-canvas rounded-xl border border-divider px-4 pt-2 flex items-end justify-center">
                      <div
                        className={`w-full max-w-[96px] rounded-t-lg transition-all ${barColor}`}
                        style={{ height: `${sc.pct}%` }}
                      />
                    </div>
                    <div className="text-center mt-2.5">
                      <div className="font-display font-bold text-sm text-brand-primary">
                        {sc.name}
                      </div>
                      <div className="text-xs text-neutral-slate mt-0.5">
                        {sc.providers}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-charcoal mt-1 px-2 py-0.5 rounded bg-surface-canvas">
                        {sc.delta}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mt-6">
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <h3 className="font-display font-extrabold text-2xl text-brand-primary mb-1">
                33 to 77
              </h3>
              <p className="text-sm text-on-surface-variant">
                Paying providers needed to break even, depending on monthly
                commission volume.
              </p>
            </div>
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <h3 className="font-display font-extrabold text-2xl text-status-success mb-1">
                +EGP 10,764
              </h3>
              <p className="text-sm text-on-surface-variant">
                Monthly surplus in the base case. One-off setup costs of EGP
                34,430 are recovered in ~3.2 to 3.7 months.
              </p>
            </div>
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <h3 className="font-display font-extrabold text-2xl text-brand-primary mb-1">
                EGP 0
              </h3>
              <p className="text-sm text-on-surface-variant">
                Direct software tool cost of the graduation prototype, built on
                free cloud tiers.
              </p>
            </div>
          </div>
        </section>

        {/* 6. CAIRO PILOT STRATEGY */}
        <section
          id="pilot"
          className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-divider"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-slate mb-2">
            05 · Rollout Strategy
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-brand-primary">
            The Cairo pilot: win supply first.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-[60ch] mt-2">
            A marketplace is worthless if one side is empty. We seed verified
            providers in dense Cairo zones before pulling in drivers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-6">
            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <div className="flex items-center gap-2 text-brand-primary font-display font-bold text-base sm:text-lg mb-1.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                <h3>Pilot first, Android first</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                3 to 5 dense Cairo zones (Nasr City, Heliopolis, El-Harafeyeen,
                Maadi). MVP: accounts, garage, search, requests, reviews, admin.
                Free until each zone has real density.
              </p>
            </div>

            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <div className="flex items-center gap-2 text-brand-primary font-display font-bold text-base sm:text-lg mb-1.5">
                <Layers className="w-4 h-4 text-brand-accent shrink-0" />
                <h3>Then the advanced layers</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Chatbot and DSS on mechanic-validated fault categories, then
                roadside and delivery through partners, iOS, and more Cairo
                zones.
              </p>
            </div>

            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <div className="flex items-center gap-2 text-brand-primary font-display font-bold text-base sm:text-lg mb-1.5">
                <Cpu className="w-4 h-4 text-brand-accent shrink-0" />
                <h3>Built to scale cheaply</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Flutter app, PostgreSQL with PostGIS, Google Maps, local payment
                gateways. Bilingual Arabic (RTL) and English (LTR) from day one.
              </p>
            </div>

            <div className="bg-surface-pure border border-divider rounded-2xl p-5 shadow-e1">
              <div className="flex items-center gap-2 text-brand-primary font-display font-bold text-base sm:text-lg mb-1.5">
                <Target className="w-4 h-4 text-brand-accent shrink-0" />
                <h3>Our north-star metric</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Completed requests per month. The base case needs about 400
                completed requests across Cairo.
              </p>
            </div>
          </div>
        </section>

        {/* 7. EGYPT VISION 2030 & SDG CHIPS */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-primary">
            Cleaner roads, stronger small businesses.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-[60ch] mt-2">
            TSL7TK supports Egypt Vision 2030 by moving a trust-based offline
            market onto a structured digital platform.
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-5">
            {[
              'SDG 3 · Road safety',
              'SDG 8 · Decent work',
              'SDG 9 · Innovation',
              'SDG 11 · Sustainable cities',
              'SDG 12 · Reuse of parts',
              'SDG 13 · Lower fuel use',
            ].map((sdg) => (
              <span
                key={sdg}
                className="border border-divider bg-surface-pure px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-brand-primary shadow-e1 text-center"
              >
                {sdg}
              </span>
            ))}
          </div>
        </section>

        {/* 8. CTA BAND */}
        <section
          id="ask"
          className="bg-brand-accent text-surface-pure py-10 sm:py-14"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-surface-pure">
              Help us launch in Cairo.
            </h2>
            <p className="text-sm sm:text-base text-surface-pure/90 max-w-[60ch] mt-2.5 leading-relaxed">
              We’re looking for a sponsor and early partners: funding for the
              paid pilot (one-off EGP 34,430 and about EGP 17,236 per month),
              tow and courier partners, and workshops willing to join first.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/docs')}
                className="min-h-[46px] px-5 py-3 rounded-xl bg-surface-pure text-brand-primary font-semibold text-sm shadow-e1 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Page 1: Investor &amp; ROI Simulator</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="min-h-[46px] px-5 py-3 rounded-xl bg-brand-primary text-surface-pure font-semibold text-sm shadow-e1 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Launch Interactive Mobile App Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-xs sm:text-sm text-neutral-slate leading-relaxed">
        <p>
          <b className="text-brand-primary">TSL7TK (تصليحتك)</b> — Smart
          Automotive Services Platform. Egyptian Russian University, Faculty of
          Management, Economics and Business Technology. Project MIS-26/27 – 1.
          <br />
          Team: Khaled Ashraf, Shahd Hassan, Mohamed Mohab, Shahd Moamen, Ahmed
          Mohamed. Supervised by Dr. Reham and Dr. Paula.
          <br />
          Market data: CAPMAS via Ahram Online, DataReportal. Financials are
          estimates from the project feasibility study.
        </p>
      </footer>

      {/* STICKY MOBILE BOTTOM PAGE SWITCHER BAR */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-pure/95 backdrop-blur-md border-t border-divider px-4 py-2.5 flex items-center justify-between gap-2 shadow-e3">
        <button
          type="button"
          onClick={() => navigate('/docs')}
          className="flex-1 min-h-[42px] px-3 py-2 rounded-xl bg-surface-canvas border border-divider text-brand-primary text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Page 1: ROI Model</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex-1 min-h-[42px] px-3 py-2 rounded-xl bg-brand-accent text-surface-pure text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-e1 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Try App Demo</span>
        </button>
      </div>
    </div>
  );
};
