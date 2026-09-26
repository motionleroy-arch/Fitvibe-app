import React from 'react';
import { Check, ShieldCheck, Zap, Info } from 'lucide-react';
import { Habit } from '../types';
import { sounds } from '../utils/audio';

interface DailyHabitsProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onOpenCoreRoutine: () => void;
}

export const DailyHabits: React.FC<DailyHabitsProps> = ({
  habits,
  onToggleHabit,
  onOpenCoreRoutine,
}) => {
  const handleToggle = (habit: Habit) => {
    sounds.playCheck();
    onToggleHabit(habit.id);
  };

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="bg-[#0b1611]/90 border border-emerald-900/60 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-emerald-100">
              Daily Essentials
            </h2>
            <p className="text-[11px] text-emerald-200/60">Ghanaian debloat & motility rituals</p>
          </div>
        </div>

        <span className="text-xs font-heading font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 shrink-0">
          {completedCount} / 3 Completed
        </span>
      </div>

      {/* Habits List - Mobile touch-optimized */}
      <div className="space-y-2 sm:space-y-2.5 my-1">
        {habits.map((habit) => {
          const isCoreCircuit = habit.id === 'habit-3';

          return (
            <div
              key={habit.id}
              onClick={() => handleToggle(habit)}
              className={`group flex items-start gap-3 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer select-none min-h-[52px] ${
                habit.completed
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                  : 'bg-[#07110c]/80 hover:bg-emerald-950/20 border-emerald-900/40 hover:border-emerald-700/60 text-slate-200'
              }`}
            >
              {/* Checkbox square */}
              <div
                className={`mt-0.5 w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                  habit.completed
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'border-emerald-800/60 bg-[#09140e] group-hover:border-emerald-400'
                }`}
              >
                {habit.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span
                    className={`text-xs sm:text-sm font-heading font-bold leading-tight ${
                      habit.completed ? 'text-emerald-300 line-through opacity-85' : 'text-white'
                    }`}
                  >
                    {habit.title}
                  </span>
                  <span className="text-[10px] font-mono-numbers font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 rounded shrink-0">
                    +{habit.points} pts
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/60 mt-0.5 leading-snug">
                  {habit.subtitle}
                </p>

                {/* Workout Player quick launcher for habit-3 */}
                {isCoreCircuit && !habit.completed && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCoreRoutine();
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-heading font-bold text-emerald-300 hover:text-white bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 px-2.5 py-1 rounded-lg transition-colors active:scale-95"
                  >
                    <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>Launch Workout Player →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tip footer */}
      <div className="mt-2.5 pt-2 border-t border-emerald-900/40 flex items-center gap-1.5 text-[11px] text-emerald-200/60">
        <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Completing all 3 items delivers a 60-point surge to your Daily Vibe Score.</span>
      </div>
    </div>
  );
};
