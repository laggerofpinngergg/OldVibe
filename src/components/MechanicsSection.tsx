import React from 'react';
import { SYSTEM_STEPS } from '../data/typeSystemData';
import { BookOpen, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const MechanicsSection: React.FC = () => {
  return (
    <section id="mechanics" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Архитектура боевого движка</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-cinzel">
          Как это работает
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Пошаговый алгоритм расчёта повреждений на сервере OLDVIBES в режиме реального времени.
        </p>
      </div>

      {/* Visual Pipeline Banner */}
      <div className="mb-10 p-5 rounded-xl bg-[#0f1420] border border-slate-800 shadow-xl overflow-x-auto">
        <div className="min-w-[650px] flex items-center justify-between gap-3 text-center">
          <div className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">1. Базовый урон</span>
            <span className="text-base font-bold text-slate-100 font-mono">100 ед.</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          <div className="flex-1 p-3 rounded-lg bg-orange-950/20 border border-orange-500/30">
            <span className="text-xs text-orange-400 block mb-1">2. Тип урона</span>
            <span className="text-base font-bold text-orange-300 font-cinzel">Режущий ⚔️</span>
          </div>

          <span className="text-sm font-bold text-slate-500">VS</span>

          <div className="flex-1 p-3 rounded-lg bg-amber-950/20 border border-amber-500/30">
            <span className="text-xs text-amber-400 block mb-1">3. Тип брони</span>
            <span className="text-base font-bold text-amber-300 font-cinzel">Средняя 🧥</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          <div className="flex-1 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
            <span className="text-xs text-emerald-400 block mb-1">4. Множитель</span>
            <span className="text-base font-bold text-emerald-300 font-mono">× 1.75 (+75%)</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          <div className="flex-1 p-3 rounded-lg bg-amber-500/20 border border-amber-500 text-amber-300 ring-1 ring-amber-500">
            <span className="text-xs text-amber-400 block mb-1">5. Итог</span>
            <span className="text-base font-black text-amber-300 font-mono">175 урона</span>
          </div>
        </div>
      </div>

      {/* 5 Detailed Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {SYSTEM_STEPS.map((s) => (
          <div
            key={s.step}
            className="p-5 rounded-xl bg-[#0f1420] border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Шаг 0{s.step}
                </span>
                <span className="text-xl select-none">{s.icon}</span>
              </div>
              <h3 className="text-base font-bold text-slate-100 font-cinzel mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {s.description}
              </p>
            </div>

            {s.codeExample && (
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                <code>{s.codeExample}</code>
              </div>
            )}
          </div>
        ))}

        {/* Special Rules Card */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-[#141b2b] border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                Особые правила
              </span>
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-cinzel mb-2">
              Правило Хаоса и Осады
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Хаос</strong> всегда наносит 100%, игнорируя любые сопротивления брони.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Осада</strong> уничтожает крепостные стены и башни (185%), но слаба против юнитов (60%).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Без защиты</strong> цель получает удвоенный урон (200%) от любой атаки.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Серверная команда в игре: <code className="text-amber-300 font-mono">/ovtypes info</code>
          </div>
        </div>
      </div>
    </section>
  );
};
