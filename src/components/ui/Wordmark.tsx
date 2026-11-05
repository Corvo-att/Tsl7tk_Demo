import React from 'react';

interface WordmarkProps {
  variant?: 'on-light' | 'on-navy';
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
  className?: string;
}

export const LogoMark: React.FC<{ size?: number; variant?: 'on-light' | 'on-navy' }> = ({
  size = 36,
  variant = 'on-light',
}) => {
  const roofColor = variant === 'on-navy' ? '#FFFFFF' : '#17365D';
  const bgColor = variant === 'on-navy' ? 'rgba(255,255,255,0.1)' : '#F4F6F9';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill={bgColor} />
      {/* Dynamic Automotive Silhouette Roofline */}
      <path
        d="M11 31C14.5 23.5 20.5 19.5 29.5 19.5H41.5C47.5 19.5 51.5 23.5 54.5 31"
        stroke={roofColor}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Integrated Double-Ended Mechanic Wrench Chassis in Dark Wine (#790D16) */}
      <path
        d="M9.5 38.5C9.5 34.9 12.4 32 16 32C18.8 32 21.1 33.7 22 36.2H42C42.9 33.7 45.2 32 48 32C51.6 32 54.5 34.9 54.5 38.5C54.5 42.1 51.6 45 48 45C45.2 45 42.9 43.3 42 40.8H22C21.1 43.3 18.8 45 16 45C12.4 45 9.5 42.1 9.5 38.5Z"
        fill="#790D16"
      />
      <circle cx="16" cy="38.5" r="2.6" fill="#FFFFFF" />
      <circle cx="48" cy="38.5" r="2.6" fill="#FFFFFF" />
    </svg>
  );
};

export const Wordmark: React.FC<WordmarkProps> = ({
  variant = 'on-light',
  size = 'md',
  showLogo = true,
  className = '',
}) => {
  const sizeClass =
    size === 'lg'
      ? 'text-[32px] leading-[38px]'
      : size === 'sm'
        ? 'text-[20px] leading-[24px]'
        : 'text-display-brand';

  const logoSize = size === 'lg' ? 42 : size === 'sm' ? 28 : 36;

  return (
    <span
      dir="ltr"
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      aria-label="tsl7tk"
    >
      {showLogo && <LogoMark size={logoSize} variant={variant} />}
      <span className={`font-display font-extrabold tracking-[-0.02em] ${sizeClass}`}>
        <span className={variant === 'on-navy' ? 'text-surface-pure' : 'text-brand-primary'}>
          tsl
        </span>
        <span
          className={
            variant === 'on-navy'
              ? 'text-secondary-container bg-brand-accent px-1.5 py-0.5 rounded-md text-surface-pure ms-0.5'
              : 'text-brand-accent'
          }
        >
          7tk
        </span>
      </span>
    </span>
  );
};

