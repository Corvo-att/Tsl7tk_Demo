import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  RotateCcw,
  Wrench,
  Cog,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Globe,
} from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import { Button } from '../../components/ui/Button';
import { StatusBadge, AlertBanner } from '../../components/ui/BadgesAndTabs';
import {
  DSS_ENTRY_CHIPS,
  DSS_NODES,
  matchFreeTextToEntryNode,
  stepDssNode,
  type DssQuestionNode,
  type DssDiagnosisLeaf,
} from './engine';
import { formatEGP, formatNumber, pickLocalized, type Lang } from '../../lib/format';

interface ChatTurn {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  questionNode?: DssQuestionNode;
  diagnosisNode?: DssDiagnosisLeaf;
}

export const DssScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isTyping]);

  const handleReset = () => {
    setTurns([]);
    setActiveQuestionId(null);
    setInputText('');
    setIsTyping(false);
    setFeedbackGiven(null);
  };

  const pushBotNodeWithDelay = (nodeId: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const node = DSS_NODES[nodeId];
      setIsTyping(false);
      if (!node) return;
      if (node.kind === 'question') {
        setActiveQuestionId(node.id);
        setTurns((prev) => [
          ...prev,
          { id: `bot-${Date.now()}`, sender: 'bot', questionNode: node },
        ]);
      } else {
        setActiveQuestionId(null);
        setTurns((prev) => [
          ...prev,
          { id: `bot-${Date.now()}`, sender: 'bot', diagnosisNode: node },
        ]);
      }
    }, 600);
  };

  const handleSelectEntryChip = (entryNodeId: string, labelText: string) => {
    if (isTyping) return;
    setTurns((prev) => [
      ...prev,
      { id: `usr-${Date.now()}`, sender: 'user', text: labelText },
    ]);
    pushBotNodeWithDelay(entryNodeId);
  };

  const handleSelectOption = (questionId: string, optionId: string, labelText: string) => {
    if (isTyping) return;
    setTurns((prev) => [
      ...prev,
      { id: `usr-${Date.now()}`, sender: 'user', text: labelText },
    ]);
    const nextNode = stepDssNode(questionId, optionId);
    pushBotNodeWithDelay(nextNode.id);
  };

  const handleFreeTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;
    setInputText('');

    setTurns((prev) => [
      ...prev,
      { id: `usr-${Date.now()}`, sender: 'user', text: trimmed },
    ]);

    if (activeQuestionId) {
      const currentQ = DSS_NODES[activeQuestionId];
      if (currentQ && currentQ.kind === 'question') {
        // Match first or second option based on simple keyword or default to first option
        const chosenOpt = currentQ.options[0];
        const nextNode = stepDssNode(currentQ.id, chosenOpt.id);
        pushBotNodeWithDelay(nextNode.id);
        return;
      }
    }

    const matchedEntry = matchFreeTextToEntryNode(trimmed);
    pushBotNodeWithDelay(matchedEntry.id);
  };

  const urgencyBadgeVariant = (u: DssDiagnosisLeaf['urgency']) =>
    u === 'critical'
      ? 'urgency-critical'
      : u === 'high'
        ? 'urgency-high'
        : u === 'medium'
          ? 'urgency-medium'
          : 'urgency-low';

  const urgencyLabel = (u: DssDiagnosisLeaf['urgency']) =>
    u === 'critical'
      ? t('dss.urgencyCritical')
      : u === 'high'
        ? t('dss.urgencyHigh')
        : u === 'medium'
          ? t('dss.urgencyMedium')
          : t('dss.urgencyLow');

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-surface-canvas">
      <AppBar
        title={t('dss.title')}
        rightSlot={
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => i18n.changeLanguage(lang === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1 rounded-full bg-surface-pure/15 text-surface-pure text-label-sm flex items-center gap-1 hover:bg-surface-pure/25 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label={t('dss.reset')}
              className="p-2 rounded-full bg-surface-pure/15 text-surface-pure hover:bg-surface-pure/25 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        }
      />

      {/* Sub-banner showing Architecture Rule-Based DSS Badge */}
      <div className="bg-brand-primary/95 text-surface-pure px-4 py-2 flex items-center justify-between border-t border-surface-pure/10">
        <div className="inline-flex items-center gap-1.5 text-label-md">
          <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
          <span>{t('dss.badge')}</span>
        </div>
        <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-28">
        {/* Initial Welcome Bubble + 6 Fault Category Entry Chips */}
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-primary text-surface-pure flex items-center justify-center shrink-0 mt-0.5 shadow-e1">
            <Bot className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="bg-surface-pure rounded-2xl rounded-tl-sm rtl:rounded-tl-2xl rtl:rounded-tr-sm p-4 shadow-e1 border border-neutral-slate/15">
              <p className="text-body-md text-neutral-charcoal">{t('dss.welcome')}</p>
            </div>

            {turns.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {DSS_ENTRY_CHIPS.map((chip) => {
                  const text = pickLocalized(chip.label, lang);
                  return (
                    <button
                      key={chip.categoryKey}
                      type="button"
                      onClick={() => handleSelectEntryChip(chip.entryNodeId, text)}
                      className="px-3.5 py-2 rounded-full bg-surface-pure text-brand-primary border border-brand-primary/25 hover:border-brand-accent hover:bg-brand-accent hover:text-surface-pure text-label-md shadow-e1 transition cursor-pointer active:scale-95"
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Conversation Turns */}
        <AnimatePresence initial={false}>
          {turns.map((turn, idx) => {
            const isLastTurn = idx === turns.length - 1;

            if (turn.sender === 'user') {
              return (
                <motion.div
                  key={turn.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[82%] bg-brand-primary text-surface-pure rounded-2xl rounded-tr-sm rtl:rounded-tr-2xl rtl:rounded-tl-sm px-4 py-3 shadow-e1 text-body-md">
                    {turn.text}
                  </div>
                </motion.div>
              );
            }

            if (turn.questionNode) {
              const q = turn.questionNode;
              return (
                <motion.div
                  key={turn.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-surface-pure flex items-center justify-center shrink-0 mt-0.5 shadow-e1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-2.5">
                    <div className="bg-surface-pure rounded-2xl rounded-tl-sm rtl:rounded-tl-2xl rtl:rounded-tr-sm p-4 shadow-e1 border border-neutral-slate/15">
                      <p className="text-body-md text-neutral-charcoal">
                        {pickLocalized(q.prompt, lang)}
                      </p>
                    </div>
                    {isLastTurn && (
                      <div className="flex flex-col gap-2">
                        {q.options.map((opt) => {
                          const optLabel = pickLocalized(opt.label, lang);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption(q.id, opt.id, optLabel)}
                              className="text-start px-4 py-3 rounded-xl bg-surface-pure border-[1.5px] border-brand-accent/40 hover:border-brand-accent hover:bg-brand-accent hover:text-surface-pure text-brand-primary text-label-lg shadow-e1 transition cursor-pointer active:scale-[0.99]"
                            >
                              {optLabel}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            }

            if (turn.diagnosisNode) {
              const diag = turn.diagnosisNode;
              return (
                <motion.div
                  key={turn.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-pure rounded-2xl p-4 shadow-e2 border-2 border-brand-primary/20 space-y-4"
                >
                  {/* Header + Urgency Pill */}
                  <div className="flex items-start justify-between gap-2 border-b border-divider pb-3">
                    <div>
                      <span className="text-label-sm uppercase tracking-wider text-neutral-slate block">
                        {t('dss.diagnosisHeader')}
                      </span>
                      <h2 className="text-headline-md text-brand-primary mt-0.5">
                        {pickLocalized(diag.title, lang)}
                      </h2>
                    </div>
                    <StatusBadge variant={urgencyBadgeVariant(diag.urgency)}>
                      {urgencyLabel(diag.urgency)}
                    </StatusBadge>
                  </div>

                  <p className="text-body-md text-neutral-charcoal">
                    {pickLocalized(diag.summary, lang)}
                  </p>

                  {/* Top 3 Probable Causes with Horizontal Likelihood Bars */}
                  <div className="space-y-2.5 bg-surface-canvas p-3.5 rounded-xl">
                    <h3 className="text-label-md text-brand-primary">
                      {t('dss.probableCauses')}
                    </h3>
                    {diag.causes.map((cause, cIdx) => (
                      <div key={cIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="font-medium text-neutral-charcoal">
                            {pickLocalized(cause.label, lang)}
                          </span>
                          <span className="font-bold text-brand-primary">
                            {formatNumber(cause.likelihoodPct, lang, 0)}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-surface-pure overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cause.likelihoodPct}%` }}
                            transition={{ duration: 0.5, delay: cIdx * 0.1 }}
                            className={`h-full rounded-full ${
                              cIdx === 0 ? 'bg-brand-accent' : 'bg-brand-primary'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommended Service & Estimated Cairo Cost Range */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-surface-canvas p-3 rounded-xl">
                      <span className="text-label-sm text-neutral-slate block">
                        {t('dss.recommendedService')}
                      </span>
                      <span className="text-label-md text-brand-primary mt-0.5 block">
                        {pickLocalized(diag.recommendedService, lang)}
                      </span>
                    </div>
                    <div className="bg-surface-canvas p-3 rounded-xl">
                      <span className="text-label-sm text-neutral-slate block">
                        {t('dss.estCost')}
                      </span>
                      <span className="text-label-md text-brand-primary mt-0.5 block">
                        {formatEGP(diag.costRangeEgp.min, lang)} –{' '}
                        {formatEGP(diag.costRangeEgp.max, lang)}
                      </span>
                    </div>
                  </div>

                  {/* Mandatory Advisory Disclaimer Banner (§3.2 Gap 2 & §10.3) */}
                  <AlertBanner variant="error" title={t('dss.advisoryBanner')} />

                  {/* Deep-linked Action CTAs */}
                  <div className="space-y-2.5 pt-1">
                    {(diag.urgency === 'critical' || diag.urgency === 'high') && (
                      <Button
                        variant="cta"
                        fullWidth
                        icon={<AlertTriangle className="w-5 h-5" />}
                        onClick={() => navigate('/sos')}
                      >
                        {t('dss.sosCta')}
                      </Button>
                    )}

                    <Button
                      variant={
                        diag.urgency === 'critical' || diag.urgency === 'high'
                          ? 'primary'
                          : 'cta'
                      }
                      fullWidth
                      icon={<Wrench className="w-5 h-5" />}
                      onClick={() =>
                        navigate(`/mechanics?category=${diag.serviceCategory}`)
                      }
                    >
                      {t('dss.findMechanicsCta')}
                    </Button>

                    <Button
                      variant="outline"
                      fullWidth
                      icon={<Cog className="w-5 h-5 text-brand-accent" />}
                      onClick={() =>
                        navigate(`/parts?q=${encodeURIComponent(diag.relatedPartQuery)}`)
                      }
                    >
                      {t('dss.findPartsCta')}
                    </Button>
                  </div>

                  {/* Calibration Feedback Row */}
                  <div className="pt-2 border-t border-divider flex items-center justify-between">
                    {feedbackGiven ? (
                      <span className="text-body-sm text-status-success font-medium">
                        {t('dss.helpfulThanks')}
                      </span>
                    ) : (
                      <>
                        <span className="text-body-sm text-neutral-slate">
                          {t('dss.helpfulPrompt')}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setFeedbackGiven('up')}
                            className="p-2 rounded-lg bg-surface-canvas hover:bg-status-success-bg text-neutral-charcoal hover:text-status-success transition cursor-pointer"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setFeedbackGiven('down')}
                            className="p-2 rounded-lg bg-surface-canvas hover:bg-status-error-bg text-neutral-charcoal hover:text-brand-accent transition cursor-pointer"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-body-sm text-neutral-slate px-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
            <span>{t('dss.typing')}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Sticky Free-Text Symptom Input Bar above BottomNav */}
      <form
        onSubmit={handleFreeTextSubmit}
        className="fixed bottom-[64px] inset-x-0 max-w-[480px] mx-auto z-30 bg-surface-pure border-t border-divider p-3 flex items-center gap-2 shadow-e3"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t('dss.inputPlaceholder')}
          className="flex-1 h-[44px] rounded-xl bg-surface-canvas border border-neutral-slate/30 px-3.5 text-body-md text-neutral-charcoal placeholder:text-neutral-slate focus:outline-none focus:border-brand-primary"
        />
        <button
          type="submit"
          aria-label={t('dss.send')}
          className="h-[44px] px-4 rounded-xl bg-brand-accent text-surface-pure font-semibold flex items-center justify-center shadow-e1 active:scale-95 transition cursor-pointer"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
        </button>
      </form>
    </div>
  );
};

