import React from 'react';
import { Activity, Sparkles, TrendingUp } from 'lucide-react';

interface VibeScoreCardProps {
  score: number; // 0 - 100
  waterPoints: number; // up to 40
  habitPoints: number; // up to 60
}

export const VibeScoreCard: React.FC<VibeScoreCardProps> = ({
  score,
  waterPoints,
  habitPoints,
}) => {
  // Determine state zone & description
  let statusText = 'Morning Kickstart';
  let statusDesc = 'Begin with your morning water & Sobolo protocol to awaken digestive motility and activate bile flow.';
  let badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';

  if (score >= 90) {
    statusText = 'Peak Alignment';
    statusDesc = 'Kontomire greens digested, transverse abdominis engaged, and Ghanaian superfood flush locked in!';
    badgeColor = 'text-emerald-300 bg-emerald-500/15 border-emerald-400/40';
  } else if (score >= 70) {
    statusText = 'Optimal Flow';
    statusDesc = 'Prekese digestive peristalsis and deep core corset tone operating in harmony.';
    badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  } else if (score >= 40) {
    statusText = 'Building Momentum';
    statusDesc = 'Solid progress! Enjoy your Kontomire ampesi lunch and finish your 10-min core circuit.';
    badgeColor = 'text-amber-300 bg-amber-500/15 border-amber-500/30';
  }

  return (
    <div className="bg-[#0b1611]/90 border border-emerald-900/60 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
      {/* Background glow based on score */}
      <div
        className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: score > 70 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.12)',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-emerald-100">
              Daily Vibe Score
            </h2>
            <p className="text-[11px] text-emerald-200/60">Holistic debloat & gut motility index</p>
          </div>
        </div>

        <span className={`text-[11px] sm:text-xs font-heading font-bold px-2 sm:px-2.5 py-0.5 rounded-full border shrink-0 ${badgeColor}`}>
          {statusText}
        </span>
      </div>

      {/* Main Score & Gauge */}
      <div className="my-1.5 sm:my-2">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-heading font-extrabold text-white font-mono-numbers tracking-tight">
              {score}
            </span>
            <span className="text-sm font-semibold text-emerald-300/70">/ 100</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono-numbers">Target: 85+</span>
          </div>
        </div>

        {/* Progress Bar with glowing gradient: Emerald Green into Sunlit Warm Gold */}
        <div className="w-full bg-[#07110c] rounded-full h-3.5 p-0.5 border border-emerald-950/80 relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 transition-all duration-700 ease-out shadow-lg shadow-emerald-500/30"
            style={{ width: `${Math.max(4, score)}%` }}
          />
        </div>

        {/* Metric Breakdown Chips - Responsive grid */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-emerald-900/40">
          <div className="bg-[#07110c] rounded-xl p-2 sm:p-2.5 border border-emerald-900/50 flex items-center justify-between">
            <span className="text-[11px] text-emerald-300/70 font-medium">Hydration</span>
            <span className="text-xs font-heading font-bold text-emerald-300 font-mono-numbers">
              {waterPoints} / 40
            </span>
          </div>
          <div className="bg-[#07110c] rounded-xl p-2 sm:p-2.5 border border-emerald-900/50 flex items-center justify-between">
            <span className="text-[11px] text-emerald-300/70 font-medium">Daily Habits</span>
            <span className="text-xs font-heading font-bold text-amber-300 font-mono-numbers">
              {habitPoints} / 60
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic feedback text */}
      <p className="text-xs text-emerald-200/80 mt-2 leading-relaxed bg-[#07110c]/80 rounded-xl p-2.5 border border-emerald-900/40 flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <span className="leading-snug">{statusDesc}</span>
      </p>
    </div>
  );
};
