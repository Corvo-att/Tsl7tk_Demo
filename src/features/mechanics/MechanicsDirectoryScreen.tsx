import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar } from '../../components/ui/Navigation';
import { SearchBar } from '../../components/ui/FormControls';
import { FilterChip } from '../../components/ui/BadgesAndTabs';
import { ProviderCard } from '../../components/ui/Cards';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { pickLocalized, type Lang } from '../../lib/format';
import type { ServiceCategory } from '../../data/types';

const SERVICE_CATEGORIES: Array<{
  key: ServiceCategory | 'all';
  label: { en: string; ar: string };
}> = [
  { key: 'all', label: { en: 'All Services', ar: 'كل التخصصات' } },
  { key: 'general', label: { en: 'General Service', ar: 'صيانة دورية' } },
  { key: 'cooling', label: { en: 'Cooling System', ar: 'دورة التبريد' } },
  { key: 'electrical', label: { en: 'Electrical & Battery', ar: 'كهرباء وبطاريات' } },
  { key: 'brakes', label: { en: 'Brakes', ar: 'فرامل' } },
  { key: 'diagnostics', label: { en: 'Diagnostics', ar: 'كشف كمبيوتر' } },
  { key: 'ac', label: { en: 'AC Service', ar: 'تكييف' } },
  { key: 'tires', label: { en: 'Tires & Suspension', ar: 'إطارات وعفشة' } },
];

export const MechanicsDirectoryScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const initialQuery = searchParams.get('q') || '';
  const initialCat = (searchParams.get('category') as ServiceCategory) || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'nearby' | 'rating'>('nearby');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>(
    initialCat
  );
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const providers = useAppStore((s) => s.providers);

  const filteredProviders = useMemo(() => {
    return providers
      .filter((p) => {
        if (selectedCategory !== 'all' && !p.categories.includes(selectedCategory)) {
          return false;
        }
        if (query.trim()) {
          const q = query.trim().toLowerCase();
          const nameEn = p.name.en.toLowerCase();
          const nameAr = p.name.ar.toLowerCase();
          const distEn = p.district.en.toLowerCase();
          const distAr = p.district.ar.toLowerCase();
          const tagsMatch = p.tags.some(
            (tg) =>
              tg.en.toLowerCase().includes(q) || tg.ar.toLowerCase().includes(q)
          );
          return (
            nameEn.includes(q) ||
            nameAr.includes(q) ||
            distEn.includes(q) ||
            distAr.includes(q) ||
            tagsMatch
          );
        }
        return true;
      })
      .sort((a, b) =>
        sortBy === 'nearby' ? a.distanceKm - b.distanceKm : b.rating - a.rating
      );
  }, [providers, selectedCategory, query, sortBy]);

  const activeCategoryLabel =
    SERVICE_CATEGORIES.find((c) => c.key === selectedCategory)?.label ||
    SERVICE_CATEGORIES[0].label;

  const handleReset = () => {
    setQuery('');
    setSortBy('nearby');
    setSelectedCategory('all');
    setSearchParams({});
  };

  return (
    <div className="min-h-full bg-surface-canvas pb-6">
      {/* §6.2 Compact #17365D App Bar */}
      <AppBar title={t('mechanics.title')} backTo="/home" />

      {/* Sticky Search & Horizontal Filter Bar (§5.4 & §6.2) */}
      <div className="sticky top-[56px] z-20 bg-surface-pure px-4 pt-3 pb-3 border-b border-divider shadow-e1 space-y-2.5">
        <SearchBar
          surface="on-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('mechanics.searchPlaceholder')}
        />

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <FilterChip
            active={sortBy === 'nearby'}
            onClick={() => setSortBy('nearby')}
          >
            {t('mechanics.filterNearby')}
          </FilterChip>

          <FilterChip
            active={sortBy === 'rating'}
            hasDropdown
            onClick={() => setSortBy(sortBy === 'rating' ? 'nearby' : 'rating')}
          >
            {t('mechanics.filterRating')}
          </FilterChip>

          <FilterChip
            active={selectedCategory !== 'all'}
            hasDropdown
            onClick={() => setShowCategoryMenu((prev) => !prev)}
          >
            {selectedCategory === 'all'
              ? t('mechanics.filterService')
              : pickLocalized(activeCategoryLabel, lang)}
          </FilterChip>
        </div>

        {/* Service Type Dropdown Chips Drawer */}
        {showCategoryMenu && (
          <div className="pt-2 border-t border-divider flex flex-wrap gap-1.5">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setShowCategoryMenu(false);
                }}
                className={`px-3 py-1.5 rounded-full text-label-sm transition cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-brand-primary text-surface-pure'
                    : 'bg-surface-canvas text-neutral-charcoal'
                }`}
              >
                {pickLocalized(cat.label, lang)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Vertical List of Mechanic Listing Cards (§6.2) */}
      <div className="p-4 space-y-3">
        {filteredProviders.length === 0 ? (
          <div className="bg-surface-pure rounded-2xl p-8 text-center shadow-e1 space-y-3">
            <p className="text-body-md text-neutral-slate">
              {t('mechanics.noResults')}
            </p>
            <Button variant="outline" onClick={handleReset}>
              {t('mechanics.resetFilters')}
            </Button>
          </div>
        ) : (
          filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onClick={() => navigate(`/mechanics/${provider.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

