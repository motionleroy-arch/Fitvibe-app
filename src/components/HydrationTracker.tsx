import React from 'react';
import { Droplet, Plus, Minus, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface HydrationTrackerProps {
  currentMl: number;
  goalMl: number;
  onUpdateMl: (newAmount: number) => void;
}

export const HydrationTracker: React.FC<HydrationTrackerProps> = ({
  currentMl,
  goalMl,
  onUpdateMl,
}) => {
  const percentage = Math.min(100, Math.round((currentMl / goalMl) * 100));
  const remainingMl = Math.max(0, goalMl - currentMl);
  const isGoalReached = currentMl >= goalMl;

  // Handle addition
  const handleAdd = (amount: number) => {
    sounds.playWaterDrop();
    const nextVal = Math.max(0, currentMl + amount);
    if (!isGoalReached && nextVal >= goalMl) {
      // Fire confetti celebration on hitting 100%
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#fbbf24'],
      });
      sounds.playCelebration();
    }
    onUpdateMl(nextVal);
  };

  // Circular progress calculation
  const radius = 60;
  const strokeWidth = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#0b1611]/90 border border-emerald-900/60 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
      {/* Background ambient botanical green glow */}
      <div
        className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none transition-all duration-700"
        style={{ opacity: 0.2 + (percentage / 100) * 0.4 }}
      />

      {/* Card Header */}
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Droplet className="w-4 h-4 fill-emerald-400 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-emerald-100">
              Cellular & Sobolo Hydration
            </h2>
            <p className="text-[11px] text-emerald-200/60">Water, Sobolo & fresh coconut flush</p>
          </div>
        </div>

        <div className="shrink-0">
          <span
            className={`text-xs font-heading font-bold px-2.5 py-0.5 rounded-full border ${
              isGoalReached
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {percentage}% Goal
          </span>
        </div>
      </div>

      {/* Main Visual Display: Ring + Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-1">
        {/* Ring & Water Indicator */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* SVG Ring Meter */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 150 150">
              {/* Background track */}
              <circle
                cx="75"
                cy="75"
                r={radius}
                stroke="#13241b"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Animated Progress Gradient Ring */}
              <circle
                cx="75"
                cy="75"
                r={radius}
                stroke="url(#vitalGreenGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
              <defs>
                <linearGradient id="vitalGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="70%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-white font-mono-numbers tracking-tight">
                {currentMl.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-emerald-200/60 -mt-0.5">
                / {goalMl.toLocaleString()} ml
              </span>
              {isGoalReached ? (
                <span className="mt-1 flex items-center gap-1 text-[10px] font-heading font-bold text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-500/30">
                  <Sparkles className="w-2.5 h-2.5 fill-amber-300" /> Optimal
                </span>
              ) : (
                <span className="text-[10px] text-emerald-400 font-medium mt-1">
                  {remainingMl} ml left
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status description & Quick Actions */}
        <div className="flex flex-col justify-center space-y-2.5 sm:space-y-3">
          <div className="bg-[#07110c] border border-emerald-900/50 rounded-xl p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 text-xs font-heading font-semibold text-emerald-200">
              {isGoalReached ? (
                <>
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">Hydration Goal Achieved</span>
                </>
              ) : (
                <>
                  <Droplet className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-100">Cellular Osmotic Balance</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-emerald-200/70 mt-1 leading-relaxed">
              {isGoalReached
                ? 'Extracellular sodium is balanced. Gut motility and debloating transit are operating at peak efficiency!'
                : 'Sip 250ml every 90 minutes to signal aldosterone suppression and flush excess water.'}
            </p>
          </div>

          {/* Quick Buttons Grid - Touch friendly min-h-[44px] */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <button
              onClick={() => handleAdd(250)}
              className="min-h-[48px] flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/40 hover:border-emerald-500/50 text-emerald-100 hover:text-white transition-all active:scale-95 group shadow-sm"
            >
              <div className="flex items-center gap-0.5 text-xs font-heading font-bold font-mono-numbers">
                <Plus className="w-3 h-3 text-emerald-400 group-hover:scale-125 transition-transform" />
                250ml
              </div>
              <span className="text-[10px] text-emerald-300/70">Glass / Sobolo</span>
            </button>

            <button
              onClick={() => handleAdd(500)}
              className="min-h-[48px] flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-gradient-to-b from-emerald-950/70 to-emerald-900/40 hover:from-emerald-900/80 hover:to-emerald-800/50 border border-emerald-700/60 hover:border-emerald-400 text-white transition-all active:scale-95 group shadow-sm ring-1 ring-emerald-500/20"
            >
              <div className="flex items-center gap-0.5 text-xs font-heading font-bold font-mono-numbers text-emerald-300">
                <Plus className="w-3 h-3 text-amber-400 group-hover:scale-125 transition-transform" />
                500ml
              </div>
              <span className="text-[10px] text-emerald-200/80">Bottle / Flask</span>
            </button>

            <button
              onClick={() => handleAdd(100)}
              className="min-h-[48px] flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/30 border border-emerald-900/50 hover:border-emerald-700 text-emerald-200 hover:text-white transition-all active:scale-95 group shadow-sm"
            >
              <div className="flex items-center gap-0.5 text-xs font-heading font-bold font-mono-numbers">
                <Plus className="w-3 h-3 text-emerald-500 group-hover:scale-125 transition-transform" />
                100ml
              </div>
              <span className="text-[10px] text-emerald-300/70">Sip</span>
            </button>
          </div>

          {/* Quick Undo / Set to 100% */}
          <div className="flex items-center justify-between text-xs text-emerald-300/70 pt-0.5">
            <button
              onClick={() => handleAdd(-250)}
              disabled={currentMl <= 0}
              className="flex items-center gap-1 hover:text-emerald-100 disabled:opacity-40 disabled:pointer-events-none transition-colors py-1"
            >
              <Minus className="w-3 h-3 text-amber-400" />
              <span className="text-[11px]">Undo 250ml</span>
            </button>

            <button
              onClick={() => onUpdateMl(goalMl)}
              className="text-[11px] text-amber-300 hover:text-amber-200 font-medium underline underline-offset-2 transition-colors py-1"
            >
              Fill to 100%
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
