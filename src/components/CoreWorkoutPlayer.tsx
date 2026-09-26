import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Flame,
  CheckCircle2,
  X,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CORE_EXERCISES } from '../data/mockData';
import { sounds } from '../utils/audio';

interface CoreWorkoutPlayerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCompleteWorkout: () => void;
  isWorkoutCompleted: boolean;
}

export const CoreWorkoutPlayer: React.FC<CoreWorkoutPlayerProps> = ({
  isOpen,
  onOpen,
  onClose,
  onCompleteWorkout,
  isWorkoutCompleted,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(CORE_EXERCISES[0].durationSeconds);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState<boolean>(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const currentExercise = CORE_EXERCISES[currentIdx];
  const timerRef = useRef<number | null>(null);

  // Sync remaining seconds when changing exercise if not playing
  useEffect(() => {
    setSecondsRemaining(CORE_EXERCISES[currentIdx].durationSeconds);
    setIsPlaying(false);
  }, [currentIdx]);

  // Interval timer tick
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            sounds.playTimerTick();
            handleExerciseFinish();
            return 0;
          }
          if (prev <= 4) {
            sounds.playTimerTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIdx]);

  const handleExerciseFinish = () => {
    setIsPlaying(false);
    setCompletedExercises((prev) => Array.from(new Set([...prev, currentIdx])));

    if (currentIdx < CORE_EXERCISES.length - 1) {
      setTimeout(() => {
        setCurrentIdx((prev) => prev + 1);
        setIsPlaying(true);
      }, 700);
    } else {
      // Completed all exercises
      sounds.playCelebration();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#fbbf24'],
      });
      setIsCompletedModalOpen(true);
      onCompleteWorkout();
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSecondsRemaining(currentExercise.durationSeconds);
  };

  const handleNext = () => {
    if (currentIdx < CORE_EXERCISES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const adjustSeconds = (delta: number) => {
    setSecondsRemaining((prev) => Math.max(5, prev + delta));
  };

  const totalDuration = currentExercise.durationSeconds;
  const progressPercent = Math.min(100, Math.round(((totalDuration - secondsRemaining) / totalDuration) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Prominent "Start Routine" Card on Dashboard */}
      <div className="bg-gradient-to-br from-[#0c1c14] via-[#09150f] to-[#122319] border border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 relative z-10">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                Zero-Crunch Protocol
              </span>
              <span className="text-[11px] sm:text-xs text-emerald-200/70 font-medium">
                10 Mins • 5 Low-Impact Cues
              </span>
              {isWorkoutCompleted && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-heading font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Completed Today
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-2xl font-heading font-extrabold text-white tracking-tight">
              10-Minute "Flat Tummy & Core" Circuit
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/70 mt-1 leading-relaxed">
              Targeted transverse abdominis vacuum holds and gut motility waves. Decompresses visceral organs and draws in the abdominal wall without bloating-inducing spinal crunches.
            </p>

            {/* Exercise preview pills - Responsive scroll/wrap */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-emerald-900/60">
              {CORE_EXERCISES.map((ex, idx) => (
                <span
                  key={ex.id}
                  className="text-[10px] sm:text-[11px] text-emerald-200 bg-[#07110c]/80 border border-emerald-900/60 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono-numbers"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {idx + 1}. {ex.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button - Full width on mobile for easy thumb tapping */}
          <div className="w-full md:w-auto shrink-0 pt-1 md:pt-0">
            <button
              onClick={onOpen}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-heading font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-900/40 transition-all active:scale-95 flex items-center justify-center gap-2 group min-h-[48px]"
            >
              <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
              <span>{isWorkoutCompleted ? 'Repeat Routine' : 'Start Routine'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Timer & Player Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="bg-[#0c1812] border border-emerald-800/80 w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-emerald-900/60 flex items-center justify-between bg-[#07110c]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-heading font-bold text-white">
                    Flat Tummy & Core Circuit
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-emerald-300/70">
                    Step {currentIdx + 1} of {CORE_EXERCISES.length} • {currentExercise.category}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white flex items-center justify-center transition-colors min-h-[32px]"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Exercise Steps Progress Bar */}
            <div className="grid grid-cols-5 gap-1 px-4 sm:px-5 pt-2 sm:pt-3 bg-[#07110c]/80">
              {CORE_EXERCISES.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIdx
                      ? 'bg-amber-400 ring-2 ring-amber-500/40'
                      : completedExercises.includes(idx)
                      ? 'bg-emerald-500'
                      : 'bg-emerald-950'
                  }`}
                  title={`${ex.name}`}
                />
              ))}
            </div>

            {/* Scrollable Center Content */}
            <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3 sm:space-y-4">
              {/* Exercise Details Header */}
              <div className="text-center">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  {currentExercise.subtitle}
                </span>
                <h4 className="text-lg sm:text-2xl font-heading font-extrabold text-white mt-1">
                  {currentExercise.name}
                </h4>
              </div>

              {/* Responsive Circular Countdown Timer */}
              <div className="flex flex-col items-center justify-center py-1 sm:py-2">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      stroke="#13241b"
                      strokeWidth="9"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      stroke="url(#coreTimerGradient)"
                      strokeWidth="9"
                      strokeDasharray={2 * Math.PI * 68}
                      strokeDashoffset={2 * Math.PI * 68 * (1 - progressPercent / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-300 ease-linear"
                    />
                    <defs>
                      <linearGradient id="coreTimerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="80%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Centered Timer Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl sm:text-4xl font-heading font-black text-white font-mono-numbers tracking-tight">
                      {formatTime(secondsRemaining)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-heading font-bold text-amber-300 mt-0.5 uppercase tracking-wider">
                      {isPlaying ? 'ACTIVE' : secondsRemaining === 0 ? 'COMPLETED' : 'PAUSED'}
                    </span>
                  </div>
                </div>

                {/* Quick adjustment buttons */}
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={() => adjustSeconds(-15)}
                    className="text-[11px] font-mono-numbers text-emerald-200 hover:text-white px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60"
                  >
                    -15s
                  </button>
                  <button
                    onClick={() => adjustSeconds(15)}
                    className="text-[11px] font-mono-numbers text-emerald-200 hover:text-white px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60"
                  >
                    +15s
                  </button>
                </div>
              </div>

              {/* Form Tip & Debloat Science Callout */}
              <div className="bg-[#07110c] border border-emerald-900/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="p-1 rounded bg-amber-500/15 text-amber-400 mt-0.5 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-heading font-bold text-amber-200">Form Cue</h5>
                    <p className="text-xs text-emerald-100/80 mt-0.5 leading-relaxed">
                      {currentExercise.formTip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-emerald-900/60">
                  <div className="p-1 rounded bg-emerald-500/15 text-emerald-400 mt-0.5 shrink-0">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-heading font-bold text-emerald-300">Why It Flattens & Debloats</h5>
                    <p className="text-xs text-emerald-100/70 mt-0.5 leading-relaxed">
                      {currentExercise.debloatMechanism}
                    </p>
                  </div>
                </div>

                {/* Steps Checklist */}
                <div className="pt-2 border-t border-emerald-900/60">
                  <h6 className="text-[10px] font-heading font-bold uppercase tracking-wider text-emerald-400/80 mb-1">
                    Step-by-Step Cues:
                  </h6>
                  <ul className="space-y-1">
                    {currentExercise.instructionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-emerald-100/70">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar - Fixed at bottom for thumb comfort */}
            <div className="px-3 sm:px-5 py-3 sm:py-3.5 border-t border-emerald-900/80 bg-[#07110c] flex items-center justify-between gap-2 shrink-0">
              {/* Prev */}
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="flex items-center gap-1 text-xs font-heading font-semibold text-emerald-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none p-2 rounded-lg hover:bg-emerald-950/60 transition-colors min-h-[40px]"
              >
                <SkipBack className="w-4 h-4" />
                <span className="hidden xs:inline">Prev</span>
              </button>

              {/* Central Play / Pause & Reset */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleReset}
                  title="Reset Exercise Timer"
                  className="w-10 h-10 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-800/60 text-emerald-200 hover:text-white flex items-center justify-center transition-colors min-h-[40px]"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={togglePlay}
                  className="px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-heading font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-900/40 active:scale-95 flex items-center gap-2 transition-all min-h-[44px]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-slate-950" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-slate-950" /> Start Timer
                    </>
                  )}
                </button>
              </div>

              {/* Next */}
              <button
                onClick={
                  currentIdx === CORE_EXERCISES.length - 1
                    ? handleExerciseFinish
                    : handleNext
                }
                className="flex items-center gap-1 text-xs font-heading font-bold text-amber-300 hover:text-white p-2 rounded-lg hover:bg-emerald-950/60 transition-colors min-h-[40px]"
              >
                <span>
                  {currentIdx === CORE_EXERCISES.length - 1 ? 'Finish' : 'Next'}
                </span>
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebratory Completion Modal */}
      {isCompletedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0c1812] border border-amber-500/40 w-full max-w-md rounded-3xl p-5 sm:p-6 text-center shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 mb-3 shadow-lg shadow-amber-500/20">
              <Trophy className="w-8 h-8 fill-amber-400" />
            </div>

            <span className="text-xs font-heading font-bold uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-500/40 px-3 py-1 rounded-full">
              Routine Completed!
            </span>

            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white mt-3">
              Deep Core Activated
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 mt-2 leading-relaxed">
              Transverse abdominis corset engaged and digestive motility awakened. The "10-Min Core Circuit" habit is now checked off!
            </p>

            <div className="bg-[#07110c] border border-emerald-900/60 rounded-xl p-3 my-4 flex items-center justify-around">
              <div>
                <span className="text-[10px] text-emerald-300/70 uppercase font-bold">Vibe Points</span>
                <p className="text-base sm:text-lg font-heading font-extrabold text-amber-300 font-mono-numbers">+20 Pts</p>
              </div>
              <div className="w-px h-8 bg-emerald-900/60" />
              <div>
                <span className="text-[10px] text-emerald-300/70 uppercase font-bold">Time Completed</span>
                <p className="text-base sm:text-lg font-heading font-extrabold text-emerald-300 font-mono-numbers">10:00</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCompletedModalOpen(false);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-slate-950 font-heading font-bold text-sm shadow-lg shadow-emerald-900/40 transition-all active:scale-95 min-h-[48px]"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
};
