import React from 'react';
import { Check, AlertCircle, ChevronDown, ShieldCheck, Award, Database } from 'lucide-react';

export type BadgeVariant = 'verified' | 'top-rated' | 'demo' | 'open' | 'closed' | 'urgency-low' | 'urgency-medium' | 'urgency-high' | 'urgency-critical';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  children,
  className = '',
}) => {
  const styles: Record<BadgeVariant, string> = {
    verified: 'bg-status-success-bg text-status-success',
    'top-rated': 'bg-status-warning-bg text-status-warning',
    demo: 'bg-surface-canvas text-neutral-slate border border-neutral-slate/25',
    open: 'bg-status-success-bg text-status-success',
    closed: 'bg-status-error-bg text-brand-accent',
    'urgency-low': 'bg-status-success-bg text-status-success',
    'urgency-medium': 'bg-status-warning-bg text-status-warning',
    'urgency-high': 'bg-status-warning-bg text-status-warning border border-status-warning/30',
    'urgency-critical': 'bg-status-error-bg text-brand-accent border border-brand-accent/30',
  };

  const icon =
    variant === 'verified' ? (
      <ShieldCheck className="w-3 h-3 stroke-[2.4]" />
    ) : variant === 'top-rated' ? (
      <Award className="w-3 h-3 stroke-[2.4]" />
    ) : variant === 'demo' ? (
      <Database className="w-2.5 h-2.5 stroke-[2.2]" />
    ) : null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm ${styles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};

interface FilterChipProps {
  active?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  active = false,
  hasDropdown = false,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 h-[34px] rounded-full text-label-md whitespace-nowrap shrink-0 transition cursor-pointer active:scale-95 ${
        active
          ? 'bg-brand-accent text-surface-pure shadow-e1'
          : 'bg-surface-canvas text-neutral-charcoal hover:bg-surface-container-high'
      }`}
    >
      <span>{children}</span>
      {hasDropdown && (
        <ChevronDown
          className={`w-3.5 h-3.5 stroke-[2.2] ${
            active ? 'text-surface-pure' : 'text-neutral-charcoal'
          }`}
        />
      )}
    </button>
  );
};

export interface SegmentedTabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}

interface SegmentedTabsProps<T extends string = string> {
  tabs: SegmentedTabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
}

export function SegmentedTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
}: SegmentedTabsProps<T>) {
  return (
    <div
      role="tablist"
      className="flex w-full border-b border-divider bg-surface-pure"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-3 px-2 text-center text-label-lg relative transition-colors cursor-pointer ${
              isActive
                ? 'text-brand-accent'
                : 'text-neutral-slate hover:text-brand-primary'
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={`ms-1.5 px-1.5 py-0.5 rounded-full text-label-sm ${
                  isActive
                    ? 'bg-brand-accent text-surface-pure'
                    : 'bg-surface-canvas text-neutral-slate'
                }`}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 inset-x-0 h-[2.5px] bg-brand-accent rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface AlertBannerProps {
  variant: 'error' | 'success';
  title: string;
  body?: string;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  variant,
  title,
  body,
  className = '',
}) => {
  if (variant === 'error') {
    return (
      <div
        role="alert"
        className={`flex items-start gap-3 bg-status-error-bg rounded-xl p-4 ${className}`}
      >
        <span className="w-5 h-5 rounded-full bg-brand-accent text-surface-pure flex items-center justify-center shrink-0 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
        <div className="flex-1">
          <p className="text-label-md text-brand-accent">{title}</p>
          {body && <p className="text-body-sm text-brand-accent/90 mt-0.5">{body}</p>}
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      className={`flex items-start gap-3 bg-status-success-bg rounded-xl p-4 ${className}`}
    >
      <span className="w-6 h-6 rounded-full border-2 border-status-success text-status-success flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-3.5 h-3.5 stroke-[2.6]" />
      </span>
      <div className="flex-1">
        <p className="text-label-lg text-neutral-charcoal">{title}</p>
        {body && <p className="text-body-sm text-on-surface-variant mt-0.5">{body}</p>}
      </div>
    </div>
  );
};

