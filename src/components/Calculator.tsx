import React, { useState } from 'react';
import {
  DAMAGE_TYPES,
  DEFENSE_TYPES,
  DAMAGE_MATRIX,
  DAMAGE_TYPE_ORDER,
  DEFENSE_TYPE_ORDER,
  getMultiplierStyle
} from '../data/typeSystemData';
import { DamageTypeId, DefenseTypeId } from '../types/ovtypes';
import { sound } from '../utils/audio';
import { Calculator as CalcIcon, RefreshCw, Sparkles, Zap, ArrowRight, ShieldAlert, Swords } from 'lucide-react';

interface CalculatorProps {
  damageType: DamageTypeId;
  defenseType: DefenseTypeId;
  onDamageTypeChange: (type: DamageTypeId) => void;
  onDefenseTypeChange: (type: DefenseTypeId) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  damageType,
  defenseType,
  onDamageTypeChange,
  onDefenseTypeChange
}) => {
  const [baseDamage, setBaseDamage] = useState<number>(100);
  const [isCrit, setIsCrit] = useState<boolean>(false);

  const activeDmg = DAMAGE_TYPES[damageType];
  const activeDef = DEFENSE_TYPES[defenseType];
  const multiplier = DAMAGE_MATRIX[damageType][defenseType];
  const style = getMultiplierStyle(multiplier);

  // Calculation
  const critMultiplier = isCrit ? 1.5 : 1.0;
  const rawFinal = baseDamage * multiplier * critMultiplier;
  const finalDamage = Math.round(rawFinal * 10) / 10;
  const damageDelta = Math.round((finalDamage - baseDamage) * 10) / 10;

  const presets = [25, 50, 100, 200, 500];

  const handleBaseDamageChange = (val: number) => {
    sound.playClick();
    setBaseDamage(Math.max(1, Math.min(9999, Math.round(val))));
  };

  const handleCritToggle = () => {
    sound.playSelect();
    setIsCrit(!isCrit);
  };

  return (
    <section id="calculator" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 rounded-full">
          <CalcIcon className="w-3.5 h-3.5" />
          <span>Боевой инструмент</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-slate-100 font-cinzel">
          Калькулятор урона
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Выберите связку атаки и защиты, введите базовый урон оружия и получите точный итоговый расчёт.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-7 space-y-6 bg-[#0f1420] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
          {/* 1. Damage Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              1. Выберите тип урона атакующего
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DAMAGE_TYPE_ORDER.map((id) => {
                const item = DAMAGE_TYPES[id];
                const isSelected = damageType === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      sound.playSelect();
                      onDamageTypeChange(id);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.typicalWeapons[0]}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Defense Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              2. Выберите тип защиты цели
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DEFENSE_TYPE_ORDER.map((id) => {
                const item = DEFENSE_TYPES[id];
                const isSelected = defenseType === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      sound.playSelect();
                      onDefenseTypeChange(id);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.typicalArmor[0]}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Base Damage Slider & Number Input */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="base-dmg-input" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                3. Базовый урон оружия
              </label>
              <div className="flex items-center gap-1">
                {presets.map((val) => (
                  <button
                    key={val}
                    onClick={() => handleBaseDamageChange(val)}
                    className={`px-2 py-0.5 text-xs font-mono rounded border transition-colors cursor-pointer ${
                      baseDamage === val
                        ? 'bg-amber-400 text-slate-900 font-bold border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                id="base-dmg-input"
                type="number"
                min="1"
                max="9999"
                value={baseDamage}
                onChange={(e) => handleBaseDamageChange(Number(e.target.value))}
                className="w-28 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono text-base font-bold focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
              <input
                type="range"
                min="1"
                max="500"
                value={Math.min(500, baseDamage)}
                onChange={(e) => handleBaseDamageChange(Number(e.target.value))}
                className="flex-1 accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
            <button
              onClick={handleCritToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                isCrit
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-semibold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Критический удар (+50%)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                handleBaseDamageChange(100);
                setIsCrit(false);
              }}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Сбросить к 100</span>
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Combat Calculation Display */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#131a29] to-[#0c101a] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Результат боя</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${style.badgeBg}`}>
              {Math.round(multiplier * 100)}% множитель
            </span>
          </div>

          {/* Big Hero Result Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-center mb-5 relative">
            <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
              Итоговый урон
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-cinzel tracking-tight font-mono tabular-nums">
              {finalDamage}
            </div>

            {/* Delta indicator */}
            <div className="mt-2 flex items-center justify-center gap-2 text-xs">
              {damageDelta > 0 ? (
                <span className="text-emerald-400 font-mono font-semibold">
                  +{damageDelta} урона ({Math.round(((finalDamage / baseDamage) - 1) * 100)}% к базе)
                </span>
              ) : damageDelta < 0 ? (
                <span className="text-rose-400 font-mono font-semibold">
                  {damageDelta} урона ({Math.round(((finalDamage / baseDamage) - 1) * 100)}% поглощено)
                </span>
              ) : (
                <span className="text-slate-400 font-mono">
                  ±0 урона (чистый базовый урон)
                </span>
              )}
            </div>
          </div>

          {/* Formula Breakdown as specifically requested by user */}
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2 mb-5 font-mono text-xs">
            <div className="text-slate-400 font-sans text-[11px] font-medium uppercase tracking-wider">
              Формула расчёта:
            </div>
            <div className="flex items-center justify-between text-slate-200 text-sm">
              <span>{baseDamage}</span>
              <span className="text-slate-500">×</span>
              <span className="text-amber-400 font-bold">{multiplier}</span>
              {isCrit && (
                <>
                  <span className="text-slate-500">×</span>
                  <span className="text-purple-400 font-bold">1.5 (крит)</span>
                </>
              )}
              <span className="text-slate-500">=</span>
              <span className="text-amber-300 font-bold text-base">{finalDamage} урона</span>
            </div>
          </div>

          {/* Combat Analysis Summary */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <Swords className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Атака: </span>
                <span className="text-slate-300">{activeDmg.name} {activeDmg.icon}</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">{activeDmg.description}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Защита: </span>
                <span className="text-slate-300">{activeDef.name} {activeDef.icon}</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">{activeDef.description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
