import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Smartphone,
  Sparkles,
  X,
  Copy,
  Check,
  FileSpreadsheet,
  BookOpen,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { Wordmark } from '../../components/ui/Wordmark';

interface DssScenario {
  title: string;
  shortTitle: string;
  symptomAr: string;
  symptomEn: string;
  faultCat: string;
  urgency: string;
  providerMatch: string;
  dispatch: string;
}

const DSS_SCENARIOS: DssScenario[] = [
  {
    title: '01. Bridge Traffic Overheat',
    shortTitle: '01. Overheat',
    symptomAr: '«العربية بتسخن في الزحمة والمؤشر بيعدي النص»',
    symptomEn:
      'Engine temperature gauge rising above midpoint in slow 6th of October Bridge traffic.',
    faultCat:
      'Cooling System Thermal Fault (Thermostat / Fan Relay / Water Pump)',
    urgency:
      'High Priority · Avoid driving to prevent EGP 10,000+ cylinder head warp',
    providerMatch:
      '4 Verified Cooling Workshops within 2.3 km (Nasr City) · OEM Thermostat: EGP 680 (Updated 2h ago)',
    dispatch:
      '1-Tap Request to Provider + Optional Bosta 2-Hr Courier (EGP 97) or Tow SOS',
  },
  {
    title: '02. Front Brake Grinding',
    shortTitle: '02. Brakes',
    symptomAr: '«صوت صفارة واحتكاك مع الفرامل ورعشة في الدركسيون»',
    symptomEn:
      'Metallic grinding noise when braking accompanied by steering wheel vibration.',
    faultCat: 'Front Brake Pad Wear & Rotor Surface Runout (Rule #B-02)',
    urgency: 'Medium Priority · Inspect within 50 km to protect brake discs',
    providerMatch:
      '6 Verified Brake Centers within 1.8 km (Heliopolis) · Front Pads SKU: EGP 1,150 (Verified Stock)',
    dispatch: 'Book Workshop Slot + Reserve Part Quote (Locked for 4 hours)',
  },
  {
    title: '03. Dead Battery / No Crank',
    shortTitle: '03. Battery SOS',
    symptomAr: '«العربية مش بتدور الصبح خالص والتابلوه بيرعش»',
    symptomEn:
      'No engine crank on morning ignition; rapid clicking sound and dimming dashboard.',
    faultCat:
      '12V Battery Voltage Drop (<11.8V) or Alternator Charging Fault (Rule #E-01)',
    urgency: 'Immediate Roadside SOS · Vehicle immobilized at current GPS pin',
    providerMatch:
      'Nearest Verified SOS Unit: 11 mins away · 70Ah Battery Delivered: EGP 3,450 (12-mo warranty)',
    dispatch:
      'Instant GPS Roadside SOS Dispatch (EGP 25 platform commission)',
  },
];

const COMPETITOR_SEGMENTS = [
  {
    name: 'TSL7TK (تصليحتك)',
    sub: 'End-to-end Cairo pilot marketplace',
    badge: 'Unified OS',
    highlight: true,
    dss: 'Yes (AI + Rule Tree)',
    catalog: 'Both Parts & Mechanics',
    reviews: 'Job-Locked Reviews',
    fulfillment: 'SOS Tow + Courier',
    garage: 'Full Garage & Fuel Log',
  },
  {
    name: 'Ringaat & Dynamu',
    sub: 'Multi-Seller Parts Marketplaces',
    highlight: false,
    dss: 'None',
    catalog: 'Parts Only',
    reviews: 'WhatsApp / Basic',
    fulfillment: 'Parts Shipping Only',
    garage: 'Mileage Only',
  },
  {
    name: 'EgyCarParts & N Auto Express',
    sub: 'Single-Vendor Online Parts Stores',
    highlight: false,
    dss: 'None',
    catalog: 'Fixed Store Only',
    reviews: 'None',
    fulfillment: 'Store Delivery',
    garage: 'None',
  },
  {
    name: 'Sayyn (صيّن)',
    sub: 'Service Centers & Tow Network (600+ Centers)',
    highlight: false,
    dss: 'None',
    catalog: 'Services Only',
    reviews: 'Yes (Service)',
    fulfillment: 'Towing Only',
    garage: 'Service Record',
  },
  {
    name: 'Dawar, Engazny & 3arabawy',
    sub: 'Map Discovery & Classifieds (50k+ DL)',
    highlight: false,
    dss: 'None',
    catalog: 'Unverified Ads',
    reviews: 'None',
    fulfillment: 'None',
    garage: 'None',
  },
];

export const ProjectDocsScreen: React.FC = () => {
  const navigate = useNavigate();

  // 1. DSS Scenario State
  const [dssIdx, setDssIdx] = useState(0);

  // 2. Unit Economics Tab State
  const [econTab, setEconTab] = useState<'driver' | 'provider'>('driver');

  // 3. ROI Simulator State
  const [simProviders, setSimProviders] = useState(80);
  const [simRequests, setSimRequests] = useState(400);
  const [opexBasis, setOpexBasis] = useState<'audited' | 'proposal'>('audited');

  // 4. Collapsible References State
  const [showRefs, setShowRefs] = useState(true);

  // 5. Dealroom Modal State
  const [dealroomOpen, setDealroomOpen] = useState(false);
  const [investorName, setInvestorName] = useState('');
  const [modalStatusMsg, setModalStatusMsg] = useState<string | null>(null);

  // Simulator Calculations
  const saasRev = simProviders * 225;
  const commRev = simRequests * 25;
  const totalRev = saasRev + commRev;

  let opex = 17236;
  if (opexBasis === 'audited') {
    const smsCost = 540;
    const paymobFee = Math.round(totalRev * 0.0275 + simProviders * 3);
    const contingency = Math.round((smsCost + paymobFee) * 0.1);
    opex = 17236 + smsCost + paymobFee + contingency;
  }

  const net = totalRev - opex;
  const margin = totalRev > 0 ? ((net / totalRev) * 100).toFixed(1) : '0.0';
  const capex = 34430;
  const saasPct = totalRev > 0 ? Math.round((saasRev / totalRev) * 100) : 50;
  const commPct = 100 - saasPct;
  const regProviders = simProviders * 10;
  const poiShare = ((regProviders / 1654) * 100).toFixed(1);
  const somShare = ((simRequests / 14200) * 100).toFixed(1);

  const applyPreset = (p: number, r: number) => {
    setSimProviders(p);
    setSimRequests(r);
  };

  const handleCopyPitchSummary = () => {
    const summary = `TSL7TK (MIS-26/27-1) — GEF 2026 Executive Summary:
• Market: $1.72B Egypt Automotive Aftermarket (2026); 11.05M vehicles (2.84M Cairo).
• Solution: Unified Mobile OS (Flutter/PostGIS) + Arabic LLM/Rule-Based Diagnostic DSS + Verified Mechanics/Parts + Bosta/Mylerz Courier & Tow SOS.
• User Value: Saves drivers EGP 6,300/yr + 20 hrs; generates EGP 42,000/yr value for providers (15.5x ROI).
• Economics: One-off CAPEX EGP 34,430 | Audited Full OPEX EGP 18,809/mo | Base Case Revenue EGP 28,000/mo (3.7 mo payback).`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
    }
    setModalStatusMsg('✓ One-page investor memo copied to clipboard.');
  };

  const handleLogInterest = () => {
    const clean = investorName.trim() || 'Investor';
    setModalStatusMsg(
      `✓ Registered interest for ${clean}. Ready for GEF 2026 New Cairo Dealroom.`
    );
  };

  const activeScenario = DSS_SCENARIOS[dssIdx];

  return (
    <div
      dir="ltr"
      className="min-h-dvh bg-canvas text-neutral-charcoal selection:bg-brand-primary selection:text-surface-pure pb-20 sm:pb-8"
    >
      {/* MOBILE-FIRST STICKY DOCS HEADER (2-Row Layout on Mobile so elements never collide) */}
      <header className="sticky top-0 z-50 bg-surface-pure/95 backdrop-blur-md border-b border-hairline shadow-e1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Row 1: Brand + Primary Actions */}
          <div className="h-14 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => navigate('/')}
                aria-label="Back to Start"
                className="w-9 h-9 shrink-0 rounded-xl bg-subtle hover:bg-hairline text-brand-primary flex items-center justify-center transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              </button>
              <Wordmark variant="on-light" size="sm" />
              <span className="hidden md:inline-block text-[11px] font-mono text-muted border-l border-hairline pl-2.5">
                MIS-26/27-1 · Docs
              </span>
            </div>

            {/* Desktop Center 2-Page Switcher */}
            <div className="hidden sm:inline-flex items-center p-1 rounded-xl bg-subtle border border-hairline">
              <button
                type="button"
                onClick={() => navigate('/docs')}
                className="min-h-[34px] px-3 py-1 rounded-lg text-xs font-semibold bg-brand-primary text-surface-pure shadow-e1 inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>1. Investor &amp; ROI Model</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/docs/overview')}
                className="min-h-[34px] px-3 py-1 rounded-lg text-xs font-medium text-slate hover:text-ink inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>2. Story &amp; Overview</span>
              </button>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setModalStatusMsg(null);
                  setDealroomOpen(true);
                }}
                className="min-h-[38px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-subtle hover:bg-hairline text-ink text-xs font-semibold inline-flex items-center gap-1.5 border border-hairline transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-brand-primary" />
                <span className="hidden md:inline">Investor Memo</span>
                <span className="md:hidden">Memo</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-xl bg-brand-accent hover:opacity-95 text-surface-pure text-xs font-semibold shadow-e1 transition cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>App Demo</span>
              </button>
            </div>
          </div>

          {/* Row 2 (Mobile Only): Full-Width 2-Page Segmented Switcher */}
          <div className="sm:hidden pb-2.5">
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-subtle border border-hairline">
              <button
                type="button"
                onClick={() => navigate('/docs')}
                className="min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-primary text-surface-pure shadow-e1 inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">1. ROI Model</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/docs/overview')}
                className="min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">2. Story &amp; Overview</span>
              </button>
            </div>
          </div>

          {/* Row 3: Horizontal Quick-Jump Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-hairline text-xs font-medium text-slate">
            <a
              href="#dss-preview"
              className="shrink-0 px-3 py-1 rounded-full bg-subtle text-ink font-semibold"
            >
              1. Live DSS
            </a>
            <a
              href="#gaps"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-subtle"
            >
              2. Market Gaps
            </a>
            <a
              href="#economics"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-subtle"
            >
              3. Value Math
            </a>
            <a
              href="#simulator"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-subtle"
            >
              4. ROI Simulator
            </a>
            <a
              href="#audit"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-subtle"
            >
              5. 2026 Audit
            </a>
            <a
              href="#references"
              className="shrink-0 px-3 py-1 rounded-full hover:bg-subtle"
            >
              6. 16 Sources
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 divide-y divide-hairline">
        {/* 1. HERO SECTION */}
        <section className="py-7 sm:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-hairline text-[11px] font-mono text-slate mb-4 shadow-e1">
              <span className="w-2 h-2 rounded-full bg-positive" />
              <span>Docs Page 1 of 2 · GEF 2026 · Project MIS-26/27-1</span>
            </div>

            <h1 className="text-2xl sm:text-5xl font-display font-extrabold tracking-tight text-ink leading-[1.14] mb-4">
              The Operating System for Egypt’s Automotive Aftermarket.
            </h1>

            <p className="text-sm sm:text-lg text-slate leading-relaxed mb-6">
              <strong className="font-semibold text-ink">
                TSL7TK (تصليحتك)
              </strong>{' '}
              connects Cairo’s{' '}
              <span className="font-mono text-ink font-medium">2.84M</span>{' '}
              licensed vehicles to verified mechanics, timestamped spare parts,
              a hybrid{' '}
              <span className="text-ink font-medium">
                Arabic LLM + Rule-Based Diagnostic DSS
              </span>
              , and on-demand courier &amp; roadside SOS in one unified
              flow—with zero inventory or fleet CAPEX.
            </p>

            {/* Primary Touch-Friendly CTA Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-8">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="min-h-[46px] px-5 py-3 rounded-xl bg-brand-accent hover:opacity-95 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-e2 transition cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Try Interactive Mobile App &amp; DSS Demo</span>
              </button>
              <a
                href="#simulator"
                className="min-h-[46px] px-5 py-3 rounded-xl bg-ink hover:opacity-95 text-white text-sm font-medium flex items-center justify-center gap-2 transition"
              >
                <span>Explore Interactive Financial Model</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => navigate('/docs/overview')}
                className="min-h-[46px] px-4 py-3 rounded-xl bg-white hover:bg-subtle text-ink border border-hairline text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-brand-accent" />
                <span>Page 2: Visual Story &amp; Overview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4-Cell Macro KPI Grid (2x2 on Mobile, 4-Col on Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-5 shadow-e1">
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                Egypt Aftermarket
              </div>
              <div className="text-xl sm:text-3xl font-bold font-mono tracking-tight text-ink">
                $1.72B
              </div>
              <div className="text-[11px] sm:text-xs text-slate mt-1">
                <span className="font-mono text-ink font-medium">
                  ~EGP 89.4B
                </span>{' '}
                ·{' '}
                <span className="text-positive font-mono font-medium">
                  6.22% CAGR
                </span>
              </div>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-5 shadow-e1">
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                Licensed Fleet
              </div>
              <div className="text-xl sm:text-3xl font-bold font-mono tracking-tight text-ink">
                11.05M
              </div>
              <div className="text-[11px] sm:text-xs text-slate mt-1">
                <span className="font-mono text-ink font-medium">
                  2.84M Cairo
                </span>{' '}
                (25.7%) · 14.2k SOM
              </div>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-5 shadow-e1">
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                Audited Pilot OPEX
              </div>
              <div className="text-xl sm:text-3xl font-bold font-mono tracking-tight text-ink">
                EGP 18.8k
                <span className="text-xs font-normal text-muted">/mo</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate mt-1">
                <span className="text-positive font-mono font-medium">
                  3.7 mo payback
                </span>{' '}
                on 34.4k CAPEX
              </div>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-5 shadow-e1">
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                Cairo Supply POIs
              </div>
              <div className="text-xl sm:text-3xl font-bold font-mono tracking-tight text-ink">
                1,654+
              </div>
              <div className="text-[11px] sm:text-xs text-slate mt-1">
                Formal POIs{' '}
                <span className="font-mono text-ink font-medium">+ ~3,500</span>{' '}
                informal
              </div>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE DIAGNOSTIC DSS PREVIEW */}
        <section id="dss-preview" className="py-10 sm:py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-1.5">
                01 · Product Architecture
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-ink">
                From Symptom to Verified Repair in One Flow
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-xs sm:text-sm text-slate max-w-md">
                Drivers rarely know the exact part number when a car breaks
                down. Our hybrid{' '}
                <strong className="text-ink font-medium">
                  LLM Intake + Deterministic Rule Tree
                </strong>{' '}
                bridges the diagnostic gap safely.
              </p>
              <button
                type="button"
                onClick={() => navigate('/diagnose')}
                className="self-start sm:self-auto shrink-0 min-h-[40px] px-4 py-2 rounded-xl bg-brand-accent text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-e1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Live DSS Chatbot</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-hairline rounded-2xl overflow-hidden shadow-e1">
            {/* Scenario Pills Bar (3 Equal Columns on Mobile & Desktop) */}
            <div className="p-3 sm:p-4 bg-subtle/60 border-b border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-[11px] font-mono text-muted uppercase">
                Select Real Cairo Driver Scenario:
              </span>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {DSS_SCENARIOS.map((sc, i) => (
                  <button
                    key={sc.title}
                    type="button"
                    onClick={() => setDssIdx(i)}
                    className={`min-h-[38px] px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold text-center transition cursor-pointer ${
                      dssIdx === i
                        ? 'bg-ink text-white shadow-e1'
                        : 'bg-white text-slate border border-hairline hover:text-ink'
                    }`}
                  >
                    <span className="sm:hidden">{sc.shortTitle}</span>
                    <span className="hidden sm:inline">{sc.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4-Step Output Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
              <div className="p-4 sm:p-5">
                <div className="text-[11px] font-mono text-muted uppercase mb-1.5">
                  A · Arabic / Franco Intake
                </div>
                <div
                  dir="rtl"
                  className="text-sm font-bold text-ink mb-1.5 text-right font-body"
                >
                  {activeScenario.symptomAr}
                </div>
                <p className="text-xs text-slate leading-relaxed">
                  {activeScenario.symptomEn}
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-[11px] font-mono text-muted uppercase mb-1.5">
                  B · Rule-Based DSS Output
                </div>
                <div className="text-xs font-mono font-semibold text-ink mb-1">
                  {activeScenario.faultCat}
                </div>
                <p className="text-xs text-brand-accent font-medium leading-relaxed">
                  {activeScenario.urgency}
                </p>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-[11px] font-mono text-muted uppercase mb-1.5">
                  C · PostGIS Provider &amp; Part Quote
                </div>
                <p className="text-xs text-ink font-medium leading-relaxed">
                  {activeScenario.providerMatch}
                </p>
              </div>
              <div className="p-4 sm:p-5 bg-subtle/30">
                <div className="text-[11px] font-mono text-positive uppercase mb-1.5">
                  D · Unified Fulfillment
                </div>
                <p className="text-xs text-ink font-medium leading-relaxed">
                  {activeScenario.dispatch}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-3 bg-subtle/40 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-muted">
              <span>
                <strong className="text-ink font-medium">
                  Safety Guardrail:
                </strong>{' '}
                LLM extracts symptoms only; diagnosis is strictly governed by
                mechanic-validated rules.
              </span>
              <span className="font-mono text-ink shrink-0">
                PostgreSQL + PostGIS + pg_trgm
              </span>
            </div>
          </div>
        </section>

        {/* 3. THE 7 MARKET GAPS & COMPETITOR MATRIX */}
        <section id="gaps" className="py-10 sm:py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-1.5">
                02 · Competitive Landscape (Section 3 Analysis)
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-ink">
                Why 10 Reviewed Platforms Leave the Journey Broken
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate max-w-md">
              Existing solutions force Egyptian drivers to juggle multiple apps,
              WhatsApp groups, and unverified street shops to complete a single
              repair.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="p-4 bg-white border border-hairline rounded-xl shadow-e1">
              <div className="text-[11px] font-mono text-brand-accent font-semibold mb-1">
                GAP 01 &amp; 02
              </div>
              <div className="text-sm font-bold text-ink">
                No Problem-to-Part Flow or Diagnostic DSS
              </div>
              <p className="text-xs text-slate mt-1 leading-relaxed">
                0 of 10 competitors help a driver diagnose a fault before
                ordering a part or booking a mechanic.
              </p>
            </div>
            <div className="p-4 bg-white border border-hairline rounded-xl shadow-e1">
              <div className="text-[11px] font-mono text-brand-accent font-semibold mb-1">
                GAP 03 &amp; 04
              </div>
              <div className="text-sm font-bold text-ink">
                Unverified Listings &amp; Unlinked Reviews
              </div>
              <p className="text-xs text-slate mt-1 leading-relaxed">
                TSL7TK locks reviews strictly to completed requests and shows
                visible price/stock timestamps.
              </p>
            </div>
            <div className="p-4 bg-white border border-hairline rounded-xl shadow-e1">
              <div className="text-[11px] font-mono text-brand-accent font-semibold mb-1">
                GAP 05
              </div>
              <div className="text-sm font-bold text-ink">
                Fragmented Retention Tools
              </div>
              <p className="text-xs text-slate mt-1 leading-relaxed">
                Personal vehicle garage, mileage reminders, and L/100km fuel
                logs keep drivers active between repairs.
              </p>
            </div>
            <div className="p-4 bg-white border border-hairline rounded-xl shadow-e1">
              <div className="text-[11px] font-mono text-brand-accent font-semibold mb-1">
                GAP 06 &amp; 07
              </div>
              <div className="text-sm font-bold text-ink">
                Siloed SOS &amp; Courier Fulfillment
              </div>
              <p className="text-xs text-slate mt-1 leading-relaxed">
                Unifies Cairo tow operators and Bosta/Mylerz parts delivery
                inside the same transaction flow.
              </p>
            </div>
          </div>

          {/* MOBILE COMPETITOR CARDS (< md) — Zero horizontal table scrolling */}
          <div className="md:hidden space-y-3">
            {COMPETITOR_SEGMENTS.map((seg) => (
              <div
                key={seg.name}
                className={`rounded-2xl p-4 border shadow-e1 ${
                  seg.highlight
                    ? 'bg-brand-primary text-surface-pure border-brand-primary'
                    : 'bg-white text-ink border-hairline'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="font-bold text-sm flex items-center gap-2">
                      <span>{seg.name}</span>
                      {seg.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-accent text-white">
                          {seg.badge}
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${
                        seg.highlight ? 'text-on-primary-container' : 'text-muted'
                      }`}
                    >
                      {seg.sub}
                    </div>
                  </div>
                  {seg.highlight && (
                    <CheckCircle2 className="w-5 h-5 text-tertiary-fixed shrink-0" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={`p-2.5 rounded-xl ${
                      seg.highlight ? 'bg-surface-pure/10' : 'bg-subtle'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono uppercase block ${
                        seg.highlight ? 'text-on-primary-container' : 'text-muted'
                      }`}
                    >
                      Diagnostic DSS
                    </span>
                    <span className="font-semibold mt-0.5 block">
                      {seg.dss}
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl ${
                      seg.highlight ? 'bg-surface-pure/10' : 'bg-subtle'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono uppercase block ${
                        seg.highlight ? 'text-on-primary-container' : 'text-muted'
                      }`}
                    >
                      Parts + Mechanics
                    </span>
                    <span className="font-semibold mt-0.5 block">
                      {seg.catalog}
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl ${
                      seg.highlight ? 'bg-surface-pure/10' : 'bg-subtle'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono uppercase block ${
                        seg.highlight ? 'text-on-primary-container' : 'text-muted'
                      }`}
                    >
                      SOS Tow + Courier
                    </span>
                    <span className="font-semibold mt-0.5 block">
                      {seg.fulfillment}
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl ${
                      seg.highlight ? 'bg-surface-pure/10' : 'bg-subtle'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono uppercase block ${
                        seg.highlight ? 'text-on-primary-container' : 'text-muted'
                      }`}
                    >
                      Reviews &amp; Garage
                    </span>
                    <span className="font-semibold mt-0.5 block">
                      {seg.reviews}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP COMPETITOR MATRIX TABLE (>= md) */}
          <div className="hidden md:block bg-white border border-hairline rounded-2xl overflow-hidden shadow-e1">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-hairline bg-subtle/50 text-[11px] font-mono uppercase text-muted">
                  <th className="py-3.5 px-5">Platform Segment</th>
                  <th className="py-3.5 px-3 text-center">Diagnostic DSS</th>
                  <th className="py-3.5 px-3 text-center">Parts + Mechanics</th>
                  <th className="py-3.5 px-3 text-center">
                    Job-Locked Reviews
                  </th>
                  <th className="py-3.5 px-3 text-center">SOS Tow + Courier</th>
                  <th className="py-3.5 px-3 text-center">
                    Fuel &amp; Garage Log
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr className="bg-subtle/40 font-medium text-ink">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink">
                        TSL7TK (تصليحتك)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-accent text-white">
                        Unified OS
                      </span>
                    </div>
                    <div className="text-xs text-muted font-normal mt-0.5">
                      End-to-end Cairo pilot marketplace
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center text-positive font-mono">
                    ● Yes
                  </td>
                  <td className="py-4 px-3 text-center text-positive font-mono">
                    ● Both
                  </td>
                  <td className="py-4 px-3 text-center text-positive font-mono">
                    ● Yes
                  </td>
                  <td className="py-4 px-3 text-center text-positive font-mono">
                    ● Both
                  </td>
                  <td className="py-4 px-3 text-center text-positive font-mono">
                    ● Yes
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-ink">
                      Ringaat &amp; Dynamu
                    </div>
                    <div className="text-xs text-muted">
                      Multi-Seller Parts Marketplaces
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Parts Only
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    WhatsApp / Basic
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Parts Shipping
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Mileage Only
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-ink">
                      EgyCarParts &amp; N Auto Express
                    </div>
                    <div className="text-xs text-muted">
                      Single-Vendor Online Parts Stores
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Fixed Store
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Store Delivery
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-ink">Sayyn (صيّن)</div>
                    <div className="text-xs text-muted">
                      Service Centers &amp; Tow Network (600+ Centers)
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Services Only
                  </td>
                  <td className="py-3.5 px-3 text-center text-positive font-mono">
                    ● Yes
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Towing Only
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Service Record
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-ink">
                      Dawar, Engazny &amp; 3arabawy
                    </div>
                    <div className="text-xs text-muted">
                      Map Discovery &amp; General Classifieds (50k+ DL)
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate">
                    Unverified Ads
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted font-mono">
                    —
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. VALIDATED UNIT ECONOMICS */}
        <section id="economics" className="py-10 sm:py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-1.5">
                03 · Sourced Unit Economics (Section 7.4 Validated)
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-ink">
                Quantified Value for Both Sides of the Market
              </h2>
            </div>

            {/* Full-Width 2-Column Switcher on Mobile so text never overflows */}
            <div className="grid grid-cols-2 w-full sm:w-auto p-1 rounded-xl bg-subtle border border-hairline">
              <button
                type="button"
                onClick={() => setEconTab('driver')}
                className={`min-h-[40px] px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  econTab === 'driver'
                    ? 'bg-white text-ink shadow-e1'
                    : 'text-slate hover:text-ink'
                }`}
              >
                Driver · EGP 6,300/yr
              </button>
              <button
                type="button"
                onClick={() => setEconTab('provider')}
                className={`min-h-[40px] px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  econTab === 'provider'
                    ? 'bg-white text-ink shadow-e1'
                    : 'text-slate hover:text-ink'
                }`}
              >
                Provider · EGP 42,000/yr
              </button>
            </div>
          </div>

          {econTab === 'driver' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              <div className="bg-white border border-hairline rounded-2xl p-5 flex flex-col justify-between shadow-e1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2.5">
                    <span>01 · FUEL EFFICIENCY</span>
                    <span className="text-ink font-semibold">47.6%</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-ink">
                    EGP 3,000
                    <span className="text-xs font-normal text-muted">/yr</span>
                  </div>
                  <div className="text-sm font-semibold text-ink mt-1">
                    Fuel Tracking &amp; Maintenance
                  </div>
                  <p className="text-xs text-slate mt-2 leading-relaxed">
                    Benchmarked against Egypt’s{' '}
                    <strong className="text-ink">
                      March 2026 fuel price of EGP 22.25/L
                    </strong>{' '}
                    (Octane 92) [12].
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-hairline text-[11px] font-mono text-muted">
                  18,000 km/yr @ 9.5L/100km = 1,710L (EGP 38,047). 7.9%
                  efficiency gain via timely plug/filter alerts saves 135L ={' '}
                  <span className="text-positive font-semibold">
                    EGP 3,003/yr
                  </span>
                  .
                </div>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-5 flex flex-col justify-between shadow-e1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2.5">
                    <span>02 · PREVENTATIVE CARE</span>
                    <span className="text-ink font-semibold">23.8%</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-ink">
                    EGP 1,500
                    <span className="text-xs font-normal text-muted">/yr</span>
                  </div>
                  <div className="text-sm font-semibold text-ink mt-1">
                    Avoided Secondary Repairs
                  </div>
                  <p className="text-xs text-slate mt-2 leading-relaxed">
                    Early DSS symptom triage &amp; mileage reminders prevent
                    cascading mechanical failures.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-hairline text-[11px] font-mono text-muted">
                  Prevents 1 major secondary failure every 4–5 yrs (e.g., warped
                  head gasket or scored rotors costing EGP 8k–15k) ={' '}
                  <span className="text-positive font-semibold">
                    EGP 1,500/yr
                  </span>
                  .
                </div>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-5 flex flex-col justify-between shadow-e1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2.5">
                    <span>03 · PRICE TRANSPARENCY</span>
                    <span className="text-ink font-semibold">19.0%</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-ink">
                    EGP 1,200
                    <span className="text-xs font-normal text-muted">/yr</span>
                  </div>
                  <div className="text-sm font-semibold text-ink mt-1">
                    Multi-Seller Parts Comparison
                  </div>
                  <p className="text-xs text-slate mt-2 leading-relaxed">
                    Eliminates the 15%–25% arbitrary street markup across
                    Cairo’s El-Tawfikia &amp; El-Harafeyeen markets.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-hairline text-[11px] font-mono text-muted">
                  Avg annual parts spend of EGP 6,000–8,000 × ~17% price
                  comparison savings ={' '}
                  <span className="text-positive font-semibold">
                    EGP 1,200/yr
                  </span>
                  .
                </div>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-5 flex flex-col justify-between shadow-e1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2.5">
                    <span>04 · TIME &amp; MOBILITY</span>
                    <span className="text-ink font-semibold">+20 HRS/YR</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-ink">
                    EGP 600
                    <span className="text-xs font-normal text-muted">/yr</span>
                  </div>
                  <div className="text-sm font-semibold text-ink mt-1">
                    Eliminated Wasted Search Trips
                  </div>
                  <p className="text-xs text-slate mt-2 leading-relaxed">
                    In-app stock confirmation and courier delivery replace
                    cross-city physical parts hunting.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-hairline text-[11px] font-mono text-muted">
                  Saves 5–6 dry-run Cairo trips/yr (~27L Octane 92 × EGP 22.25 ={' '}
                  <span className="text-positive font-semibold">
                    EGP 600.75
                  </span>
                  ) + <span className="text-ink font-semibold">20 hrs</span>{' '}
                  saved.
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="bg-white border border-hairline rounded-2xl p-5 sm:p-6 shadow-e1">
                <div className="text-xs font-mono text-muted mb-2">
                  01 · INCREMENTAL WORKSHOP / PARTS REVENUE
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-ink">
                  EGP 36,000
                  <span className="text-sm font-normal text-muted">/yr</span>
                </div>
                <div className="text-sm font-semibold text-ink mt-1">
                  Just 2–3 New Jobs Per Month
                </div>
                <p className="text-xs text-slate mt-2 leading-relaxed">
                  Equals <strong className="text-ink">EGP 3,000/month</strong>{' '}
                  in net new business. With typical Cairo brake, suspension, or
                  periodic maintenance tickets ranging from EGP 1,000 to EGP
                  2,500, a provider needs fewer than 1 extra customer per week.
                </p>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-5 sm:p-6 shadow-e1">
                <div className="text-xs font-mono text-muted mb-2">
                  02 · MARKETING &amp; BROKER COST REDUCTION
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-ink">
                  EGP 6,000
                  <span className="text-sm font-normal text-muted">/yr</span>
                </div>
                <div className="text-sm font-semibold text-ink mt-1">
                  Saves EGP 500/mo + 10 Hours/mo
                </div>
                <p className="text-xs text-slate mt-2 leading-relaxed">
                  Replaces inefficient Facebook ad boosts and informal street
                  broker commissions (<em>samsara</em>) while saving 10
                  hours/month of manual WhatsApp quoting.
                </p>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-5 sm:p-6 shadow-e1">
                <div className="text-xs font-mono text-positive mb-2">
                  03 · NET PROVIDER RETURN ON INVESTMENT
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-positive">
                  15.5x ROI
                </div>
                <div className="text-sm font-semibold text-ink mt-1">
                  EGP 42,000 Value vs. EGP 2,700 Cost
                </div>
                <p className="text-xs text-slate mt-2 leading-relaxed">
                  Assuming a 50/50 split between Listing Boosts (
                  <span className="font-mono">EGP 150/mo</span>) and Pro
                  Subscriptions (<span className="font-mono">EGP 300/mo</span>),
                  the average paying provider spends{' '}
                  <strong className="text-ink">
                    EGP 225/mo (EGP 2,700/yr)
                  </strong>
                  —creating a 15.5x value multiple.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* 5. INTERACTIVE BREAK-EVEN & PAYBACK SIMULATOR */}
        <section id="simulator" className="py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-1.5">
                04 · Interactive Financial Model (Section 10.5)
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-ink">
                Pilot Break-Even &amp; CAPEX Payback Simulator
              </h2>
            </div>

            {/* 2x2 Grid on Mobile, 4-Col on Tablet/Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Conservative (40P)', p: 40, r: 200 },
                { label: 'Base Case (80P)', p: 80, r: 400 },
                { label: 'Optimistic (150P)', p: 150, r: 800 },
                { label: 'Cairo Scale (350P)', p: 350, r: 1800 },
              ].map((preset) => {
                const isCurrent =
                  simProviders === preset.p && simRequests === preset.r;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset.p, preset.r)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-mono text-center transition cursor-pointer ${
                      isCurrent
                        ? 'bg-ink text-white font-semibold shadow-e1'
                        : 'bg-white hover:bg-subtle text-slate border border-hairline'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Controls Card */}
            <div className="lg:col-span-5 bg-white border border-hairline rounded-2xl p-4 sm:p-6 space-y-5 shadow-e1">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mb-2">
                  <label htmlFor="simProviders" className="font-medium text-ink">
                    Paying Providers (Cairo)
                  </label>
                  <span className="font-mono font-bold text-ink shrink-0">
                    {simProviders} Providers
                  </span>
                </div>
                <input
                  type="range"
                  id="simProviders"
                  min={20}
                  max={400}
                  step={5}
                  value={simProviders}
                  onChange={(e) => setSimProviders(Number(e.target.value))}
                  className="w-full tsl7tk-range"
                />
                <div className="flex justify-between text-[11px] font-mono text-muted mt-1.5">
                  <span>20</span>
                  <span>Avg ARPU: EGP 225/mo</span>
                  <span>400</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mb-2">
                  <label htmlFor="simRequests" className="font-medium text-ink">
                    Completed Delivery &amp; SOS / mo
                  </label>
                  <span className="font-mono font-bold text-ink shrink-0">
                    {simRequests.toLocaleString()} Req
                  </span>
                </div>
                <input
                  type="range"
                  id="simRequests"
                  min={50}
                  max={2500}
                  step={25}
                  value={simRequests}
                  onChange={(e) => setSimRequests(Number(e.target.value))}
                  className="w-full tsl7tk-range"
                />
                <div className="flex justify-between text-[11px] font-mono text-muted mt-1.5">
                  <span>50</span>
                  <span>Commission: EGP 25 / req</span>
                  <span>2,500</span>
                </div>
              </div>

              <div className="pt-4 border-t border-hairline">
                <div className="text-[11px] font-mono uppercase text-muted mb-2">
                  Operating Cost Basis (Table 10.8):
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-subtle rounded-xl border border-hairline">
                  <button
                    type="button"
                    onClick={() => setOpexBasis('audited')}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      opexBasis === 'audited'
                        ? 'bg-white text-ink shadow-e1'
                        : 'text-slate hover:text-ink'
                    }`}
                  >
                    2026 Audited OPEX
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpexBasis('proposal')}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      opexBasis === 'proposal'
                        ? 'bg-white text-ink shadow-e1'
                        : 'text-slate hover:text-ink'
                    }`}
                  >
                    Proposal Baseline
                  </button>
                </div>
                <p className="text-[11px] text-muted mt-2 leading-relaxed">
                  {opexBasis === 'audited'
                    ? 'Includes base EGP 17,236/mo + local SMS OTP (EGP 540/mo) + Paymob MDR fees + 10% contingency.'
                    : 'Uses the exact lower-bound Table 10.8 figure from the academic proposal (EGP 17,236/mo).'}
                </p>
              </div>
            </div>

            {/* Right Live Readout Card */}
            <div className="lg:col-span-7 bg-white border border-hairline rounded-2xl p-4 sm:p-6 space-y-5 shadow-e1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-subtle/60 border border-hairline">
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted uppercase">
                    Gross Revenue
                  </div>
                  <div className="text-base sm:text-xl font-bold font-mono text-ink mt-1">
                    EGP {totalRev.toLocaleString()}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted">
                    ~${Math.round(totalRev / 52).toLocaleString()} / mo
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-subtle/60 border border-hairline">
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted uppercase">
                    Monthly OPEX
                  </div>
                  <div className="text-base sm:text-xl font-bold font-mono text-ink mt-1">
                    EGP {opex.toLocaleString()}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted">
                    {opexBasis === 'audited' ? 'Full Audited' : 'Proposal Base'}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-subtle/60 border border-hairline">
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted uppercase">
                    Net Monthly
                  </div>
                  <div
                    className={`text-base sm:text-xl font-bold font-mono mt-1 ${
                      net > 0 ? 'text-positive' : 'text-brand-accent'
                    }`}
                  >
                    {net > 0
                      ? `+EGP ${net.toLocaleString()}`
                      : `-EGP ${Math.abs(net).toLocaleString()}`}
                  </div>
                  <div
                    className={`text-[10px] sm:text-[11px] font-mono ${
                      net > 0 ? 'text-positive' : 'text-brand-accent'
                    }`}
                  >
                    {margin}% Margin
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-subtle/60 border border-hairline">
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted uppercase">
                    CAPEX Payback
                  </div>
                  <div className="text-base sm:text-xl font-bold font-mono text-ink mt-1">
                    {net > 0 ? `${(capex / net).toFixed(1)} Mos` : 'Below BEP'}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted">
                    On EGP 34,430
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono mb-1.5">
                    <span className="text-slate">
                      Revenue Mix (Subscriptions vs. Commissions)
                    </span>
                    <span className="text-ink font-semibold">
                      {saasPct}% SaaS · {commPct}% Comm
                    </span>
                  </div>
                  <div className="w-full h-3 bg-subtle rounded-full overflow-hidden flex border border-hairline">
                    <div
                      className="bg-ink h-full transition-all duration-200"
                      style={{ width: `${saasPct}%` }}
                    />
                    <div
                      className="bg-brand-accent h-full transition-all duration-200"
                      style={{ width: `${commPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-muted mt-1.5">
                    <span>Provider Fees: EGP {saasRev.toLocaleString()}</span>
                    <span>Request Fees: EGP {commRev.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-subtle/50 border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                  <div>
                    <span className="text-slate">
                      Implied Registered Supply (at 10% paid conversion):
                    </span>{' '}
                    <strong className="font-mono text-ink">
                      {regProviders.toLocaleString()} Providers ({poiShare}% of
                      formal POIs)
                    </strong>
                  </div>
                  <span className="font-mono text-muted shrink-0">
                    {somShare}% of 14,200 Pilot SOM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RESOLVED PROPOSAL PLACEHOLDERS (2026 MARKET AUDIT CARDS) */}
        <section id="audit" className="py-10 sm:py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-1.5">
                05 · Due Diligence Audit (Closing Chapter 1 Placeholders)
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-ink">
                All 4 Missing Proposal Numbers — Sourced &amp; Priced
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate max-w-md">
              Sections 10.2 and 10.5 (Table 10.8) left four bracketed items{' '}
              <code className="font-mono text-xs bg-subtle px-1.5 py-0.5 rounded text-ink">
                [to be confirmed]
              </code>
              . Below are the verified 2026 Egyptian market figures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-6 shadow-e1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-mono text-muted">
                  SECTION 10.2 · [number of providers]
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-subtle text-ink">
                  1,654 Formal + ~3.5k Informal
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink">
                1. Cairo Serviceable Provider Count
              </h3>
              <p className="text-xs text-slate mt-2 leading-relaxed">
                According to the{' '}
                <strong className="text-ink">
                  2026 PoiData.io Cairo Governorate Census
                </strong>{' '}
                [13], Cairo has{' '}
                <strong className="font-mono text-ink">1,487</strong> mapped Car
                Repair &amp; Maintenance POIs and{' '}
                <strong className="font-mono text-ink">167</strong> Auto Parts
                Market POIs (
                <strong className="font-mono text-ink">1,654</strong> formal
                locations), plus{' '}
                <strong className="font-mono text-ink">~3,500–4,500</strong>{' '}
                informal workshops in dense clusters (El-Harafeyeen,
                El-Tawfikia, Maadi).
              </p>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-6 shadow-e1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-mono text-muted">
                  TABLE 10.8 · [to be estimated]
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-subtle text-ink">
                  EGP 540 / month
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink">
                2. SMS OTP Gateway Cost (Egypt Local Routes)
              </h3>
              <p className="text-xs text-slate mt-2 leading-relaxed">
                Using domestic NTRA-licensed SMS gateways (
                <strong className="text-ink">
                  WhySMS Egypt / SMSMisr 2026
                </strong>{' '}
                [14]) costs{' '}
                <strong className="font-mono text-ink">
                  EGP 0.27 to EGP 0.35 per SMS
                </strong>{' '}
                (EGP 2,700 for a 10,000-SMS bundle). Budgeting 2,000 OTP
                verifications/month adds just{' '}
                <strong className="font-mono text-ink">EGP 540/month</strong>.
              </p>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-6 shadow-e1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-mono text-muted">
                  TABLE 10.8 · [per transaction]
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-subtle text-ink">
                  ~EGP 890 / month (Base)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink">
                3. Payment Gateway MDR (Paymob / Fawry / InstaPay)
              </h3>
              <p className="text-xs text-slate mt-2 leading-relaxed">
                Standard 2026 Egyptian fintech processing rates (
                <strong className="text-ink">Paymob / Kashier</strong> [15]) are{' '}
                <strong className="font-mono text-ink">2.75% + EGP 3.00</strong>{' '}
                per local card/wallet transaction (~EGP 890/mo on Base Case
                revenue of EGP 28,000), while{' '}
                <strong className="text-ink">
                  InstaPay transfers and Cash on Delivery carry 0% MDR
                </strong>
                .
              </p>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-4 sm:p-6 shadow-e1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-mono text-muted">
                  TABLE 10.8 · [to be confirmed]
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-subtle text-positive">
                  EGP 0 Fixed API Fee
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink">
                4. Courier (Bosta / Mylerz) &amp; Tow Partner APIs
              </h3>
              <p className="text-xs text-slate mt-2 leading-relaxed">
                Both <strong className="text-ink">Bosta</strong> (EGP 97
                intra-Cairo shipping) and{' '}
                <strong className="text-ink">Mylerz</strong> provide{' '}
                <strong className="text-ink">
                  free REST API integration (EGP 0/mo fixed cost)
                </strong>{' '}
                [16]. Delivery and Cairo towing fees (
                <strong className="font-mono text-ink">EGP 500–900/tow</strong>)
                are passed through to the customer while TSL7TK nets{' '}
                <strong className="font-mono text-positive">
                  EGP 25/request
                </strong>
                .
              </p>
            </div>
          </div>
        </section>

        {/* 7. TECH STACK, GTM ROADMAP, TEAM & 16 REFERENCES */}
        <section id="references" className="py-10 sm:py-14 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="bg-white border border-hairline rounded-2xl p-5 shadow-e1">
              <div className="text-[11px] font-mono uppercase text-muted mb-1.5">
                Technical Stack (Section 10.3)
              </div>
              <h3 className="text-sm font-bold text-ink mb-1.5">
                Zero-Cost Prototype · Scalable Pilot
              </h3>
              <p className="text-xs text-slate leading-relaxed">
                Built on <strong className="text-ink">Flutter &amp; Dart</strong>{' '}
                (Android-first, full RTL Arabic),{' '}
                <strong className="text-ink">PostgreSQL + PostGIS</strong> on
                Supabase,{' '}
                <strong className="text-ink">Firebase Cloud Messaging</strong>,
                and Google Maps deep links. Graduation prototype runs at{' '}
                <strong className="font-mono text-ink">EGP 0</strong> direct
                tool cost.
              </p>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-5 shadow-e1">
              <div className="text-[11px] font-mono uppercase text-muted mb-1.5">
                Go-To-Market (Section 11)
              </div>
              <h3 className="text-sm font-bold text-ink mb-1.5">
                Supply-First in Dense Cairo Zones
              </h3>
              <p className="text-xs text-slate leading-relaxed">
                Seed 150–800 verified providers across 3–5 high-density Cairo
                clusters via assisted CSV upload &amp; field onboarding (
                <strong className="font-mono text-ink">EGP 5,000/mo</strong>{' '}
                marketing budget), then unlock driver demand via ERU beta, QR
                shop stickers, and WhatsApp links.
              </p>
            </div>

            <div className="bg-white border border-hairline rounded-2xl p-5 shadow-e1">
              <div className="text-[11px] font-mono uppercase text-muted mb-1.5">
                Founding Team · ERU (MIS-26/27-1)
              </div>
              <h3 className="text-sm font-bold text-ink mb-1.5">
                Egyptian Russian University
              </h3>
              <p className="text-xs text-slate leading-relaxed">
                <strong className="text-ink">Team:</strong> Khaled Ashraf
                (234002), Shahd Hassan (234036), Mohamed Mohab (234043), Shahd
                Moamen (234106), Ahmed Mohamed (234306).
                <br />
                <strong className="text-ink">Supervisors:</strong> Dr. Reham
                &amp; Dr. Paula.
              </p>
            </div>
          </div>

          <div className="bg-white border border-hairline rounded-2xl overflow-hidden shadow-e1">
            <button
              type="button"
              onClick={() => setShowRefs((prev) => !prev)}
              className="w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-subtle/50 transition cursor-pointer"
            >
              <div>
                <span className="text-[11px] font-mono uppercase text-muted block">
                  Complete Bibliography &amp; Market Verification
                </span>
                <span className="text-xs sm:text-sm font-bold text-ink">
                  All 16 Verified References (Proposal [1–12] + 2026 Audit
                  [11–16])
                </span>
              </div>
              <span className="shrink-0 text-xs font-mono text-slate px-2.5 py-1 rounded bg-subtle">
                {showRefs ? 'Hide ↑' : 'Show 16 ↓'}
              </span>
            </button>

            {showRefs && (
              <div className="p-4 sm:p-5 border-t border-hairline grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate font-mono">
                <div>
                  [1]{' '}
                  <strong className="text-ink">
                    Ahram Online / CAPMAS (2025):
                  </strong>{' '}
                  Licensed vehicles in Egypt surged 6% to 11.05M in 2025 (Cairo:
                  2.84M).{' '}
                  <a
                    href="https://english.ahram.org.eg/NewsContentMulti/566385/Multimedia.aspx"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [2]{' '}
                  <strong className="text-ink">Amwal Al Ghad / CAPMAS:</strong>{' '}
                  Egypt&apos;s licensed vehicles reach 9.95M at end of 2023.{' '}
                  <a
                    href="https://en.amwalalghad.com/?p=157402"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [3] <strong className="text-ink">DataReportal (2026):</strong>{' '}
                  Digital 2026: Egypt (98.2M internet users, 82.7% penetration).{' '}
                  <a
                    href="https://datareportal.com/reports/digital-2026-egypt"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [4]{' '}
                  <strong className="text-ink">
                    Arab Finance / IDSC (2026):
                  </strong>{' '}
                  Egypt&apos;s mobile internet users hit 92.6M in Dec 2025.{' '}
                  <a
                    href="https://arabfinance.com/en/news/newdetails/idsc-reports-egypt-mobile-and-broadband-internet-subscription-data-for-december-2025"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [5] <strong className="text-ink">Supabase (2026):</strong>{' '}
                  Pricing &amp; Free Tier Quotas (500 MB DB, 50,000 MAU).{' '}
                  <a
                    href="https://supabase.com/pricing"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [6]{' '}
                  <strong className="text-ink">
                    Google for Developers (2026):
                  </strong>{' '}
                  Google Maps Platform Core Services Pricing List.{' '}
                  <a
                    href="https://developers.google.com/maps/billing-and-pricing/pricing"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [7] <strong className="text-ink">NHTSA vPIC (2026):</strong>{' '}
                  Vehicle Product Information Catalog VIN API.{' '}
                  <a
                    href="https://vpic.nhtsa.dot.gov/index.html"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [8]{' '}
                  <strong className="text-ink">Dellarocas, C. (2003):</strong>{' '}
                  The Digitization of Word of Mouth, Management Science 49(10).
                </div>
                <div>
                  [9] <strong className="text-ink">PlayCode (2026):</strong> App
                  Store ($99/yr) &amp; Google Play ($25) publishing fees.{' '}
                  <a
                    href="https://playcode.io/blog/how-much-does-it-cost-to-publish-an-app"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [10]{' '}
                  <strong className="text-ink">
                    Al Tamimi / Soliman Hashish:
                  </strong>{' '}
                  Egypt Personal Data Protection Law No. 151 of 2020.{' '}
                  <a
                    href="https://www.tamimi.com/news/from-policy-to-practice-egypt-issues-executive-regulations-of-the-personal-data-protection-law"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [11]{' '}
                  <strong className="text-ink">
                    Mordor Intelligence (2026):
                  </strong>{' '}
                  Egypt Automotive Aftermarket Size ($1.72B in 2026, 6.22% CAGR
                  to $2.33B by 2031).{' '}
                  <a
                    href="https://www.mordorintelligence.com/industry-reports/egypt-automotive-aftermarket"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [12]{' '}
                  <strong className="text-ink">
                    Daily News Egypt (March 2026):
                  </strong>{' '}
                  Fuel Automatic Pricing Committee (Octane 92: EGP 22.25/L,
                  Octane 95: EGP 24.25/L).{' '}
                  <a
                    href="https://www.dailynewsegypt.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [13]{' '}
                  <strong className="text-ink">
                    PoiData.io Cairo Census (2026):
                  </strong>{' '}
                  1,487 Car Repair POIs + 167 Auto Parts Markets in Cairo
                  Governorate.{' '}
                  <a
                    href="https://poidata.io/report/car-repair-and-maintenance/egypt/cairo-governorate"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [14]{' '}
                  <strong className="text-ink">WhySMS Egypt (2026):</strong>{' '}
                  Domestic Bulk SMS OTP Pricing (EGP 0.27–0.35/SMS).{' '}
                  <a
                    href="https://whysms.com/en/prices/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [15]{' '}
                  <strong className="text-ink">Paymob Egypt (2026):</strong>{' '}
                  Standard Merchant Discount Rates (2.75% + EGP 3.00).{' '}
                  <a
                    href="https://paymob.com/en/pricing"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
                <div>
                  [16]{' '}
                  <strong className="text-ink">
                    Bosta &amp; Mylerz Egypt (2026):
                  </strong>{' '}
                  E-Commerce Rate Cards (Bosta EGP 97 intra-Cairo; Free REST
                  APIs).{' '}
                  <a
                    href="https://bosta.co/en-eg/pricing"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-accent"
                  >
                    Link
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* NEXT DOCS PAGE BANNER (Navigate to Docs Page 2: Visual Story & Overview) */}
          <div className="bg-brand-primary text-surface-pure rounded-2xl p-5 sm:p-6 shadow-e2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-secondary-container block">
                Docs Page 2 of 2 · Next Document
              </span>
              <h3 className="text-lg sm:text-xl font-display font-bold mt-1">
                From breakdown to fixed, in one app — Visual Story &amp; Overview
              </h3>
              <p className="text-xs text-on-primary-container mt-1">
                View the 5-stage breakdown journey, comparison cards, revenue
                scenarios, and Egypt Vision 2030 SDG alignment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/docs/overview')}
              className="shrink-0 min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-accent hover:opacity-95 text-surface-pure text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-e1 transition cursor-pointer"
            >
              <span>Go to Docs Page 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <footer className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
            <div>
              TSL7TK (تصليحتك) · Smart Automotive Services Platform · Global
              Entrepreneurship Festival (GEF) 2026
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="text-brand-accent font-semibold underline cursor-pointer"
              >
                Launch Mobile App Demo →
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalStatusMsg(null);
                  setDealroomOpen(true);
                }}
                className="text-ink font-medium underline hover:text-brand-accent cursor-pointer"
              >
                Copy One-Page Investor Memo →
              </button>
            </div>
          </footer>
        </section>
      </main>

      {/* STICKY MOBILE BOTTOM PAGE SWITCHER BAR */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-pure/95 backdrop-blur-md border-t border-hairline px-4 py-2.5 flex items-center justify-between gap-2 shadow-e3">
        <button
          type="button"
          onClick={() => navigate('/docs/overview')}
          className="flex-1 min-h-[42px] px-3 py-2 rounded-xl bg-subtle border border-hairline text-ink text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
          <span>Page 2: Visual Story</span>
          <ArrowRight className="w-3.5 h-3.5" />
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

      {/* DEALROOM INVESTOR MEMO MODAL */}
      {dealroomOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-charcoal/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-hairline p-5 sm:p-6 shadow-e2">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-[11px] font-mono uppercase text-muted block">
                  GEF 2026 · New Cairo Dealroom
                </span>
                <h3 className="text-base sm:text-lg font-bold text-ink">
                  TSL7TK Pilot Investment Summary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDealroomOpen(false)}
                className="w-8 h-8 rounded-lg bg-subtle text-slate hover:text-ink flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 p-3.5 sm:p-4 rounded-xl bg-subtle/70 border border-hairline text-xs font-mono text-ink space-y-1.5">
              <div>
                • <strong>Market:</strong> $1.72B Egypt Aftermarket (2.84M Cairo
                vehicles)
              </div>
              <div>
                • <strong>One-Off Pilot Setup CAPEX:</strong> EGP 34,430 (~$662)
              </div>
              <div>
                • <strong>Audited Monthly OPEX:</strong> EGP 18,809/mo (~$362/mo)
              </div>
              <div>
                • <strong>Base Case Revenue:</strong> EGP 28,000/mo (3.7 mo
                payback)
              </div>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={investorName}
                onChange={(e) => setInvestorName(e.target.value)}
                placeholder="Your Name / Fund"
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-white border border-hairline text-sm text-ink focus:border-ink outline-none"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleLogInterest}
                  className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-ink hover:opacity-95 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Request Pilot Deck &amp; Meeting
                </button>
                <button
                  type="button"
                  onClick={handleCopyPitchSummary}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-subtle hover:bg-hairline text-ink font-mono text-xs font-medium inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {modalStatusMsg ? (
                    <Check className="w-3.5 h-3.5 text-positive" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Memo</span>
                </button>
              </div>
              {modalStatusMsg && (
                <div className="text-xs font-mono text-positive bg-subtle border border-hairline rounded-lg p-2.5 text-center">
                  {modalStatusMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
