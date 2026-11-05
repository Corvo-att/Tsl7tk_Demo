import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2,
  Clock,
  XCircle,
  Star,
  Wrench,
  Package,
  AlertTriangle,
} from 'lucide-react';
import { AppBar } from '../../components/ui/Navigation';
import {
  SegmentedTabs,
  StatusBadge,
} from '../../components/ui/BadgesAndTabs';
import { Button } from '../../components/ui/Button';
import { TextAreaField } from '../../components/ui/FormControls';
import { useAppStore } from '../../store/useAppStore';
import { formatEGP, pickLocalized, type Lang } from '../../lib/format';
import type { CustomerRequest } from '../../data/types';

type ReqTab = 'active' | 'completed' | 'cancelled';

export const RequestsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const requests = useAppStore((s) => s.requests);
  const updateRequestStatus = useAppStore((s) => s.updateRequestStatus);
  const submitReview = useAppStore((s) => s.submitReview);

  const [activeTab, setActiveTab] = useState<ReqTab>('active');
  const [reviewingReq, setReviewingReq] = useState<CustomerRequest | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const activeList = requests.filter(
    (r) => r.status === 'pending' || r.status === 'accepted'
  );
  const completedList = requests.filter((r) => r.status === 'completed');
  const cancelledList = requests.filter((r) => r.status === 'declined');

  const visibleList =
    activeTab === 'active'
      ? activeList
      : activeTab === 'completed'
        ? completedList
        : cancelledList;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingReq) return;
    submitReview(
      reviewingReq.id,
      reviewingReq.providerId,
      rating,
      reviewComment.trim() ||
        (lang === 'ar'
          ? 'خدمة ممتازة والتزام بالسعر والموعد.'
          : 'Great service and accurate pricing.')
    );
    setReviewingReq(null);
    setReviewComment('');
  };

  const renderStatusPill = (status: CustomerRequest['status']) => {
    if (status === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-warning-bg text-status-warning text-label-sm">
          <Clock className="w-3 h-3 animate-spin" />
          <span>{t('requests.statusPending')}</span>
        </span>
      );
    }
    if (status === 'accepted') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-success-bg text-status-success text-label-sm">
          <CheckCircle2 className="w-3 h-3" />
          <span>{t('requests.statusAccepted')}</span>
        </span>
      );
    }
    if (status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary text-surface-pure text-label-sm">
          <CheckCircle2 className="w-3 h-3" />
          <span>{t('requests.statusCompleted')}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-error-bg text-brand-accent text-label-sm">
        <XCircle className="w-3 h-3" />
        <span>{t('requests.statusDeclined')}</span>
      </span>
    );
  };

  return (
    <div className="min-h-full bg-surface-canvas pb-8">
      <AppBar title={t('requests.title')} backTo="/home" />

      <div className="sticky top-[56px] z-20">
        <SegmentedTabs<ReqTab>
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            {
              id: 'active',
              label: t('requests.tabActive'),
              count: activeList.length,
            },
            {
              id: 'completed',
              label: t('requests.tabCompleted'),
              count: completedList.length,
            },
            {
              id: 'cancelled',
              label: t('requests.tabCancelled'),
              count: cancelledList.length,
            },
          ]}
        />
      </div>

      <div className="p-4 space-y-3">
        {visibleList.length === 0 ? (
          <div className="bg-surface-pure rounded-2xl p-8 text-center shadow-e1">
            <p className="text-body-md text-neutral-slate">
              {t('requests.emptyState')}
            </p>
          </div>
        ) : (
          visibleList.map((req) => {
            const TypeIcon =
              req.type === 'service'
                ? Wrench
                : req.type === 'part_delivery'
                  ? Package
                  : AlertTriangle;

            return (
              <div
                key={req.id}
                className="bg-surface-pure rounded-2xl p-4 shadow-e1 border border-neutral-slate/15 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-surface-canvas text-brand-primary flex items-center justify-center shrink-0">
                      <TypeIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-label-sm text-neutral-slate block">
                        {pickLocalized(req.createdAtLabel, lang)}
                      </span>
                      <h3 className="text-headline-sm text-brand-primary">
                        {pickLocalized(req.title, lang)}
                      </h3>
                    </div>
                  </div>
                  <StatusBadge variant="demo">{t('brand.demoBadge')}</StatusBadge>
                </div>

                <div className="flex items-center justify-between text-body-sm text-neutral-charcoal bg-surface-canvas px-3 py-2 rounded-xl">
                  <span>{pickLocalized(req.providerName, lang)}</span>
                  <span className="font-bold text-brand-primary">
                    {formatEGP(req.priceEstimateEgp, lang)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  {renderStatusPill(req.status)}
                  <span className="text-body-sm text-neutral-slate">
                    {req.vehicleName}
                  </span>
                </div>

                {/* Demo Simulation Controls for Active Requests */}
                {req.status === 'pending' && (
                  <div className="pt-2 border-t border-divider flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateRequestStatus(req.id, 'accepted')}
                      className="flex-1 py-2 px-3 rounded-xl bg-status-success-bg text-status-success text-label-md hover:opacity-90 transition cursor-pointer"
                    >
                      {t('requests.simulateAccept')}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateRequestStatus(req.id, 'declined')}
                      className="py-2 px-3 rounded-xl bg-status-error-bg text-brand-accent text-label-md hover:opacity-90 transition cursor-pointer"
                    >
                      {t('requests.simulateDecline')}
                    </button>
                  </div>
                )}

                {req.status === 'accepted' && (
                  <div className="pt-2 border-t border-divider">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => updateRequestStatus(req.id, 'completed')}
                    >
                      {t('requests.simulateComplete')}
                    </Button>
                  </div>
                )}

                {/* Chapter 1 §8.2 & §8.7: Reviews allowed ONLY for completed requests */}
                {req.status === 'completed' && (
                  <div className="pt-2 border-t border-divider">
                    {req.reviewed ? (
                      <span className="inline-flex items-center gap-1.5 text-label-md text-status-success">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t('requests.reviewed')}</span>
                      </span>
                    ) : (
                      <Button
                        variant="cta"
                        fullWidth
                        icon={<Star className="w-4 h-4" />}
                        onClick={() => setReviewingReq(req)}
                      >
                        {t('requests.leaveReview')}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Verified Review Modal Sheet */}
      {reviewingReq && (
        <div className="fixed inset-0 z-50 bg-neutral-charcoal/60 backdrop-blur-xs flex items-end justify-center p-4">
          <form
            onSubmit={handleReviewSubmit}
            className="w-full max-w-[448px] bg-surface-pure rounded-2xl p-5 shadow-e2 space-y-4"
          >
            <h3 className="text-headline-md text-brand-primary">
              {t('requests.reviewModalTitle')}
            </h3>
            <p className="text-body-sm text-neutral-slate">
              {pickLocalized(reviewingReq.title, lang)} —{' '}
              {pickLocalized(reviewingReq.providerName, lang)}
            </p>

            {/* 5-Star Selector */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1.5 cursor-pointer"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-status-star text-status-star'
                        : 'text-neutral-slate'
                    }`}
                  />
                </button>
              ))}
            </div>

            <TextAreaField
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder={t('requests.reviewPlaceholder')}
            />

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline-slate"
                onClick={() => setReviewingReq(null)}
              >
                ✕
              </Button>
              <Button type="submit" variant="cta" fullWidth>
                {t('requests.submitReview')}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

