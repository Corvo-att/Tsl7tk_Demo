import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Home,
  Map as MapIcon,
  ClipboardList,
  CarFront,
  User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';

interface AppBarProps {
  title: string;
  backTo?: string;
  rightSlot?: React.ReactNode;
}

export const AppBar: React.FC<AppBarProps> = ({ title, backTo, rightSlot }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-brand-primary text-surface-pure h-[56px] px-4 flex items-center justify-between gap-3 shadow-e1">
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="w-9 h-9 rounded-full bg-surface-pure/10 hover:bg-surface-pure/20 flex items-center justify-center transition cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2] rtl:rotate-180" />
        </button>
        <h1 className="text-headline-md text-surface-pure truncate">{title}</h1>
      </div>
      {rightSlot && <div className="shrink-0 flex items-center gap-2">{rightSlot}</div>}
    </header>
  );
};

export const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const requests = useAppStore((s) => s.requests);
  const pendingCount = requests.filter(
    (r) => r.status === 'pending' || r.status === 'accepted'
  ).length;

  const items = [
    {
      path: '/home',
      label: t('nav.home'),
      icon: Home,
      match: (p: string) => p === '/home' || p === '/demo',
    },
    {
      path: '/map',
      label: t('nav.map'),
      icon: MapIcon,
      match: (p: string) => p.startsWith('/map'),
    },
    {
      path: '/requests',
      label: t('nav.requests'),
      icon: ClipboardList,
      badge: pendingCount,
      match: (p: string) => p.startsWith('/requests'),
    },
    {
      path: '/garage',
      label: t('nav.garage'),
      icon: CarFront,
      match: (p: string) => p.startsWith('/garage'),
    },
    {
      path: '/profile',
      label: t('nav.profile'),
      icon: User,
      match: (p: string) => p.startsWith('/profile') || p.startsWith('/styleguide'),
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 inset-x-0 max-w-[480px] mx-auto z-40 h-[64px] bg-surface-pure border-t border-divider shadow-e3 flex items-center justify-around px-1"
    >
      {items.map((item) => {
        const isActive = item.match(location.pathname);
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`relative flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              isActive ? 'text-brand-accent' : 'text-neutral-slate hover:text-brand-primary'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[2]'}`}
              />
              {item.badge ? (
                <span className="absolute -top-1.5 -end-2.5 min-w-[16px] h-[16px] px-1 rounded-full bg-brand-accent text-surface-pure text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="text-label-sm">{item.label}</span>
            {isActive && (
              <span className="absolute top-0 w-8 h-[2.5px] bg-brand-accent rounded-b-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

