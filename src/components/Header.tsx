import React, { useState } from 'react';
import { Sparkles, Flame, Volume2, VolumeX, RotateCcw, CheckCircle2, ChevronDown } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  streakDays: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetToMock: () => void;
  onClearAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  streakDays,
  soundEnabled,
  onToggleSound,
  onResetToMock,
  onClearAll,
}) => {
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  return (
    <header className="border-b border-emerald-950/80 bg-[#060c09]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-900/40 ring-1 ring-emerald-400/40 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg font-heading font-extrabold tracking-tight text-white flex items-center gap-1.5">
                VitalSync
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                  🇬🇭 GHANA HEALTH
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-emerald-100/60 hidden md:block truncate">
              Hydration, Core Stability & Ghanaian Superfood Nutrition
            </p>
          </div>
        </div>

        {/* Action Controls & Streak */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Complementary Warm Amber Streak pill */}
          <div
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-heading font-bold shadow-inner"
            title={`${streakDays} Day Wellness Streak`}
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span className="font-mono-numbers">{streakDays}d</span>
            <span className="hidden xs:inline text-[11px] font-normal text-amber-300/80">Streak</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              sounds.enabled = !soundEnabled;
              onToggleSound();
            }}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            aria-label="Toggle Sound Effects"
            className="w-8 h-8 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 flex items-center justify-center text-slate-300 hover:text-emerald-300 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Demo state helper dropdown for Judges */}
          <div className="relative">
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              title="Demo State Options"
              className="flex items-center gap-1 text-xs font-medium px-2 sm:px-2.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 text-emerald-200 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Demo</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showDemoMenu && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[#0c1611] border border-emerald-800/60 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setShowDemoMenu(false)}
              >
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">
                  Judge Demo Controls
                </div>
                <button
                  onClick={onResetToMock}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/20 hover:text-emerald-300 rounded-lg transition-colors text-left"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pre-fill Full Dashboard</span>
                </button>
                <button
                  onClick={onClearAll}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 rounded-lg transition-colors text-left"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Reset to Fresh Day (0%)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
