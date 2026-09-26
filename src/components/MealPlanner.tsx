import React, { useState } from 'react';
import {
  Utensils,
  Clock,
  Plus,
  Check,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  Salad,
  Sparkles,
} from 'lucide-react';
import { MealCategory } from '../types';
import { RECIPES } from '../data/mockData';
import { sounds } from '../utils/audio';

interface MealPlannerProps {
  plannedMealIds: string[];
  onToggleMealInPlan: (mealId: string) => void;
  onClearPlan: () => void;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({
  plannedMealIds,
  onToggleMealInPlan,
  onClearPlan,
}) => {
  const [activeTab, setActiveTab] = useState<MealCategory>('debloat_lunches');
  const [showPlanDrawer, setShowPlanDrawer] = useState<boolean>(false);

  const tabs: { key: MealCategory; label: string; shortLabel: string; icon: string }[] = [
    { key: 'debloat_lunches', label: '🇬🇭 Kontomire & Lunches', shortLabel: 'Lunches', icon: '🥗' },
    { key: 'quick_dinners', label: '🍲 Light Soups & Dinners', shortLabel: 'Dinners', icon: '🍲' },
    { key: 'hydrating_snacks', label: '🌺 Sobolo & Atadwe', shortLabel: 'Snacks', icon: '🍉' },
  ];

  const currentRecipes = RECIPES.filter((r) => r.category === activeTab);
  const plannedRecipes = RECIPES.filter((r) => plannedMealIds.includes(r.id));

  // Compute aggregated planned nutrition
  const totalCalories = plannedRecipes.reduce((acc, r) => acc + r.calories, 0);
  const totalProtein = plannedRecipes.reduce((acc, r) => acc + r.protein, 0);

  const handleToggle = (mealId: string) => {
    sounds.playCheck();
    onToggleMealInPlan(mealId);
  };

  return (
    <div className="bg-[#0b1611]/90 border border-emerald-900/60 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
      {/* Header with Title and Today's Plan Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-heading font-extrabold text-white tracking-tight">
                Ghanaian Anti-Bloat & Digestive Planner
              </h2>
              <span className="hidden xs:inline-flex items-center gap-1 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                🇬🇭 Native Superfoods
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-emerald-200/60">
              Prekese infusions, Kontomire greens, prebiotic plantains & Sobolo elixirs
            </p>
          </div>
        </div>

        {/* Today's Plan Indicator Button - Mobile friendly */}
        <button
          onClick={() => setShowPlanDrawer(!showPlanDrawer)}
          className="flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-xl bg-[#07110c] border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-heading font-bold text-emerald-300 hover:text-emerald-200 transition-colors shadow-sm w-full sm:w-auto min-h-[42px]"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Today's Plan:</span>
            <span className="font-mono-numbers px-1.5 py-0.5 rounded bg-emerald-500/20 text-amber-300 font-bold">
              {plannedRecipes.length} meals
            </span>
          </div>
          {showPlanDrawer ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>
      </div>

      {/* Expandable Today's Plan Drawer */}
      {showPlanDrawer && (
        <div className="mb-5 p-3.5 sm:p-4 rounded-xl bg-[#07110c] border border-emerald-500/30 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-emerald-900/60">
            <div className="flex items-center gap-2">
              <Salad className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-100">
                Today's Ghanaian Wellness Selection
              </h4>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-2 text-xs font-mono-numbers text-emerald-200">
                <span>🔥 {totalCalories} kcal</span>
                <span>•</span>
                <span className="text-amber-300 font-bold">💪 {totalProtein}g protein</span>
              </div>
              {plannedRecipes.length > 0 && (
                <button
                  onClick={onClearPlan}
                  className="text-[11px] text-emerald-400 hover:text-rose-400 underline transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {plannedRecipes.length === 0 ? (
            <p className="text-xs text-emerald-200/50 italic py-2 text-center">
              No meals selected yet. Click "Add to Today's Plan" on any Ghanaian dish below!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {plannedRecipes.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#0b1611] border border-emerald-900/70"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-heading font-bold text-white truncate">{meal.title}</p>
                    <p className="text-[10px] font-mono-numbers text-amber-300">
                      {meal.calories} kcal • {meal.protein}g protein
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(meal.id)}
                    className="p-1 rounded text-emerald-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                    title="Remove from plan"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3-Tab Filter (Responsive Grid: 3 equal buttons) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1 rounded-xl bg-[#07110c] border border-emerald-900/60 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-3 rounded-lg text-xs font-heading font-bold transition-all min-h-[42px] ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-emerald-500/25 to-amber-500/20 text-emerald-200 border border-emerald-500/40 shadow-sm'
                : 'text-emerald-300/60 hover:text-white hover:bg-emerald-950/30 border border-transparent'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden text-[11px]">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Recipe Cards: 3 Visual Cards per tab */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
        {currentRecipes.map((recipe) => {
          const isAdded = plannedMealIds.includes(recipe.id);

          return (
            <div
              key={recipe.id}
              className={`group rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                isAdded
                  ? 'bg-[#07110c] border-emerald-500/50 ring-1 ring-emerald-500/30 shadow-lg'
                  : 'bg-[#07110c]/70 hover:bg-[#07110c] border-emerald-900/50 hover:border-emerald-700/60'
              }`}
            >
              {/* Recipe Image & Overlay Badges */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-[#07110c]">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110c] via-[#07110c]/30 to-transparent" />

                {/* Time to make badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] font-mono-numbers font-bold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-emerald-100 border border-emerald-900/60">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {recipe.timeToMake}
                </div>

                {/* Key Ghanaian ingredient highlight */}
                <div className="absolute bottom-2.5 left-2.5 text-[10px] font-heading font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  ⚡ {recipe.keyIngredient}
                </div>
              </div>

              {/* Recipe Body */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-heading font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {recipe.title}
                  </h3>

                  {/* Nutrition Badges */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-mono-numbers font-semibold text-emerald-200 bg-[#0b1611] px-2 py-0.5 rounded border border-emerald-900/60">
                      {recipe.calories} kcal
                    </span>
                    <span className="text-[11px] font-mono-numbers font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {recipe.protein}g protein
                    </span>
                  </div>

                  {/* Anti-bloat benefit */}
                  <p className="text-[11px] text-emerald-100/70 mt-2 leading-relaxed">
                    {recipe.benefit}
                  </p>

                  {/* Key ingredients pill preview */}
                  <div className="mt-2.5 pt-2 border-t border-emerald-900/40 flex flex-wrap gap-1">
                    {recipe.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[9.5px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300/80 border border-emerald-900/50"
                      >
                        {ing}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-300/80 border border-amber-900/40">
                        +{recipe.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Today's Plan Button */}
                <button
                  onClick={() => handleToggle(recipe.id)}
                  className={`mt-3.5 w-full py-2.5 px-3 rounded-xl text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[44px] ${
                    isAdded
                      ? 'bg-emerald-500/20 hover:bg-rose-500/20 text-emerald-200 hover:text-rose-300 border border-emerald-500/40 hover:border-rose-500/40'
                      : 'bg-[#0b1611] hover:bg-gradient-to-r hover:from-emerald-500 hover:to-amber-400 hover:text-slate-950 text-emerald-100 border border-emerald-800/60 hover:border-transparent shadow-sm'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-400" />
                      <span>In Today's Ghanaian Plan</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add to Today's Plan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
