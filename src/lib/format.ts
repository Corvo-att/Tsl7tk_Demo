export type Lang = 'en' | 'ar';

export function formatNumber(value: number, lang: Lang, maximumFractionDigits = 1): string {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  return new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);
}

export function formatEGP(amount: number, lang: Lang): string {
  const formatted = formatNumber(amount, lang, 0);
  return lang === 'ar' ? `${formatted} ج.م` : `EGP ${formatted}`;
}

export function formatDistance(km: number, lang: Lang): string {
  const formatted = formatNumber(km, lang, 1);
  return lang === 'ar' ? `${formatted} كم` : `${formatted} km`;
}

export function formatRelativeMinutes(minutesAgo: number, lang: Lang): string {
  if (minutesAgo < 60) {
    const m = formatNumber(minutesAgo, lang, 0);
    return lang === 'ar' ? `محدث منذ ${m} د` : `Updated ${m}m ago`;
  }
  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) {
    const h = formatNumber(hours, lang, 0);
    return lang === 'ar' ? `محدث منذ ${h} س` : `Updated ${h}h ago`;
  }
  const days = Math.round(hours / 24);
  const d = formatNumber(days, lang, 0);
  return lang === 'ar' ? `محدث منذ ${d} ي` : `Updated ${d}d ago`;
}

export function pickLocalized<T extends { en: string; ar: string }>(obj: T, lang: Lang): string {
  return lang === 'ar' ? obj.ar : obj.en;
}

