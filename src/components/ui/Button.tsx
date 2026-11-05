import React from 'react';
import { ArrowRight, Phone, MessageCircle, Navigation } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'cta' | 'outline' | 'outline-slate' | 'text-link';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  if (variant === 'text-link') {
    return (
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 text-brand-accent text-label-lg hover:opacity-85 active:scale-[0.99] transition cursor-pointer ${className}`}
        {...props}
      >
        <span>{children}</span>
        <ArrowRight className="w-4 h-4 stroke-[2.2] rtl:rotate-180 transition-transform" />
      </button>
    );
  }

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl text-label-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer px-4';

  const variantClasses: Record<Exclude<NonNullable<ButtonProps['variant']>, 'text-link'>, string> = {
    primary: 'h-[48px] bg-brand-primary text-surface-pure shadow-e1 hover:opacity-95',
    cta: 'h-[50px] bg-brand-accent text-surface-pure shadow-e2 hover:opacity-95',
    outline:
      'h-[48px] bg-surface-pure border-[1.5px] border-brand-accent text-brand-primary hover:bg-surface-canvas',
    'outline-slate':
      'h-[48px] bg-surface-pure border-[1.5px] border-neutral-slate text-neutral-slate hover:text-brand-primary hover:border-brand-primary',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

interface QuickActionSquircleProps {
  action: 'call' | 'chat' | 'directions';
  label: string;
  onClick?: () => void;
}

export const QuickActionSquircle: React.FC<QuickActionSquircleProps> = ({
  action,
  label,
  onClick,
}) => {
  const isWine = action === 'chat';
  const bgClass = isWine ? 'bg-brand-accent' : 'bg-brand-primary';

  const IconComponent =
    action === 'call' ? Phone : action === 'chat' ? MessageCircle : Navigation;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgClass} text-surface-pure min-w-[64px] flex-1 h-[56px] rounded-xl flex flex-col items-center justify-center gap-1 shadow-e1 active:scale-95 transition cursor-pointer px-2`}
    >
      <IconComponent className="w-5 h-5 stroke-[2]" />
      <span className="text-label-md leading-none">{label}</span>
    </button>
  );
};

