import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  surface?: 'on-navy' | 'on-white';
  onSearchSubmit?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  surface = 'on-navy',
  onSearchSubmit,
  className = '',
  ...props
}) => {
  const bgClass =
    surface === 'on-navy'
      ? 'bg-surface-pure shadow-e2 border border-transparent'
      : 'bg-surface-canvas border border-neutral-slate/20';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearchSubmit?.();
      }}
      className={`relative flex items-center h-[48px] rounded-xl px-3.5 gap-2.5 ${bgClass} ${className}`}
    >
      <Search className="w-5 h-5 text-neutral-slate shrink-0 stroke-[2]" />
      <input
        type="search"
        className="w-full bg-transparent text-body-lg text-neutral-charcoal placeholder:text-neutral-slate focus:outline-none"
        {...props}
      />
    </form>
  );
};

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  children,
  className = '',
  ...props
}) => {
  return (
    <label className="block w-full">
      {label && (
        <span className="block text-label-md text-brand-primary mb-1.5">{label}</span>
      )}
      <div className="relative flex items-center">
        <select
          className={`w-full h-[48px] rounded-xl bg-surface-canvas border border-neutral-slate/30 ps-4 pe-10 text-body-lg text-neutral-charcoal appearance-none focus:outline-none focus:border-brand-primary cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="w-5 h-5 text-brand-primary pointer-events-none absolute end-3.5 stroke-[2]" />
      </div>
    </label>
  );
};

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <label className="block w-full">
      {label && (
        <span className="block text-label-md text-brand-primary mb-1.5">{label}</span>
      )}
      <textarea
        className={`w-full min-h-[88px] rounded-xl bg-surface-canvas border border-neutral-slate/30 py-3 px-4 text-body-lg text-neutral-charcoal placeholder:text-neutral-slate focus:outline-none focus:border-brand-primary ${className}`}
        {...props}
      />
    </label>
  );
};

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 cursor-pointer select-none"
    >
      <span
        className={`relative inline-flex items-center w-[44px] h-[24px] rounded-full transition-colors p-0.5 ${
          checked ? 'bg-brand-accent' : 'bg-neutral-slate/45'
        }`}
      >
        <span
          className={`w-[20px] h-[20px] rounded-full bg-surface-pure shadow-e1 transition-transform ${
            checked ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      {label && <span className="text-label-md text-brand-primary">{label}</span>}
    </button>
  );
};

