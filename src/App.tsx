/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HydrationTracker } from './components/HydrationTracker';
import { DailyHabits } from './components/DailyHabits';
import { VibeScoreCard } from './components/VibeScoreCard';
import { CoreWorkoutPlayer } from './components/CoreWorkoutPlayer';
import { MealPlanner } from './components/MealPlanner';
import { INITIAL_HABITS } from './data/mockData';
import { Habit } from './types';
import { sounds } from './utils/audio';

export default function App() {
  // Pre-populated initial state for instant hackathon demonstration
  const [waterCurrentMl, setWaterCurrentMl] = useState<number>(1750);
  const waterGoalMl = 2500;

  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [plannedMealIds, setPlannedMealIds] = useState<string[]>(['lunch-1', 'snack-1']);
  const [streakDays, setStreakDays] = useState<number>(5);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState<boolean>(false);

  // Dynamic Vibe Score calculation (0 to 100)
  // Hydration: up to 40 pts
  // 3 Habits: 20 pts each = 60 pts
  const waterPoints = Math.min(40, Math.round((waterCurrentMl / waterGoalMl) * 40));
  const habitPoints = habits
    .filter((h) => h.completed)
    .reduce((sum, h) => sum + h.points, 0);
  const dailyVibeScore = Math.min(100, waterPoints + habitPoints);

  // Toggle habit checkbox
  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  // Complete core workout from player
  const handleCompleteWorkout = () => {
    setHabits((prev) =>
      prev.map((h) => (h.id === 'habit-3' ? { ...h, completed: true } : h))
    );
  };

  // Toggle meal in today's plan
  const handleToggleMealInPlan = (mealId: string) => {
    setPlannedMealIds((prev) =>
      prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]
    );
  };

  const handleClearPlan = () => {
    setPlannedMealIds([]);
  };

  // Reset to full demo state
  const handleResetToMock = () => {
    setWaterCurrentMl(1750);
    setHabits(INITIAL_HABITS);
    setPlannedMealIds(['lunch-1', 'snack-1']);
    setStreakDays(5);
    sounds.playCheck();
  };

  // Clear all to test from zero
  const handleClearAll = () => {
    setWaterCurrentMl(0);
    setHabits((prev) => prev.map((h) => ({ ...h, completed: false })));
    setPlannedMealIds([]);
    sounds.playCheck();
  };

  const isCoreCompleted = habits.find((h) => h.id === 'habit-3')?.completed || false;

  return (
    <div className="min-h-screen bg-[#060b09] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 w-full overflow-x-hidden">
      {/* Ambient background glow accents: Green & Warm Sunlit Gold */}
      <div className="fixed top-0 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation / Header */}
      <Header
        streakDays={streakDays}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onResetToMock={handleResetToMock}
        onClearAll={handleClearAll}
      />

      {/* Main Container: Mobile-first responsive layout */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Welcome & Live Date Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-950/80 pb-3 sm:pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
              Good morning, Kwame
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/70">
              Your daily hydration, Ghanaian anti-bloat nutrition, and deep core protocol.
            </p>
          </div>
          <div className="self-start sm:self-auto text-xs font-heading font-semibold px-2.5 sm:px-3 py-1 rounded-lg bg-[#0b1611] border border-emerald-900/60 text-emerald-200 font-mono-numbers">
            📅 Today • Sat, Sep 26
          </div>
        </div>

        {/* SECTION 1: Daily Hydration & Habit Ring + Vibe Score */}
        <section className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Interactive Water Tracker */}
            <HydrationTracker
              currentMl={waterCurrentMl}
              goalMl={waterGoalMl}
              onUpdateMl={setWaterCurrentMl}
            />

            {/* Daily Vibe Score Dynamic Meter */}
            <VibeScoreCard
              score={dailyVibeScore}
              waterPoints={waterPoints}
              habitPoints={habitPoints}
            />
          </div>

          {/* 3 Daily Essential Checkboxes */}
          <DailyHabits
            habits={habits}
            onToggleHabit={handleToggleHabit}
            onOpenCoreRoutine={() => setIsWorkoutModalOpen(true)}
          />
        </section>

        {/* SECTION 2: 10-Minute "Flat Tummy & Core" Interactive Player */}
        <section>
          <CoreWorkoutPlayer
            isOpen={isWorkoutModalOpen}
            onOpen={() => setIsWorkoutModalOpen(true)}
            onClose={() => setIsWorkoutModalOpen(false)}
            onCompleteWorkout={handleCompleteWorkout}
            isWorkoutCompleted={isCoreCompleted}
          />
        </section>

        {/* SECTION 3: Quick Anti-Bloat & Meal Planner */}
        <section>
          <MealPlanner
            plannedMealIds={plannedMealIds}
            onToggleMealInPlan={handleToggleMealInPlan}
            onClearPlan={handleClearPlan}
          />
        </section>

        {/* Footer */}
        <footer className="pt-5 pb-8 border-t border-emerald-950/80 text-center text-xs text-emerald-300/50">
          <p className="flex items-center justify-center gap-1.5 font-heading font-medium text-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            VitalSync 🇬🇭 Ghanaian Holistic Wellness & Flat Tummy Protocol
          </p>
          <p className="text-[11px] text-emerald-200/50 mt-1">
            Prekese broths, Kontomire greens, Sobolo hydration & deep transverse abdominis tone
          </p>
        </footer>
      </main>
    </div>
  );
}
