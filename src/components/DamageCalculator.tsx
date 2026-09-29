import React, { useState } from 'react';
import {
  DAMAGE_TYPES,
  DEFENSE_TYPES,
  DAMAGE_MATRIX,
  DAMAGE_TYPE_ORDER,
  DEFENSE_TYPE_ORDER
} from '../data/typeSystemData';
import { DamageTypeId, DefenseTypeId } from '../types/ovtypes';
import { sound } from '../utils/audio';
import { GradientPixelText } from './GradientPixelText';
import { Calculator as CalcIcon, RefreshCw, Crosshair, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface DamageCalculatorProps {
  selectedDamageType?: DamageTypeId;
  selectedDefenseType?: DefenseTypeId;
  onSelectDamageType?: (type: DamageTypeId) => void;
  onSelectDefenseType?: (type: DefenseTypeId) => void;
}

export const DamageCalculator: React.FC<DamageCalculatorProps> = ({
  selectedDamageType: initialDamageType = 'slashing',
  selectedDefenseType: initialDefenseType = 'medium',
  onSelectDamageType,
  onSelectDefenseType,
}) => {
  const [selectedDamage, setSelectedDamage] = useState<DamageTypeId>(initialDamageType);
  const [selectedDefense, setSelectedDefense] = useState<DefenseTypeId>(initialDefenseType);
  const [baseDamage, setBaseDamage] = useState<number>(7);

  const handleDamageChange = (id: DamageTypeId) => {
    sound.playSelect();
    setSelectedDamage(id);
    if (onSelectDamageType) onSelectDamageType(id);
  };

  const handleDefenseChange = (id: DefenseTypeId) => {
    sound.playSelect();
    setSelectedDefense(id);
    if (onSelectDefenseType) onSelectDefenseType(id);
  };

  const activeDamage = DAMAGE_TYPES[selectedDamage];
  const activeDefense = DEFENSE_TYPES[selectedDefense];
  const multiplier = DAMAGE_MATRIX[selectedDamage][selectedDefense];
  const percentage = Math.round(multiplier * 100);
  const finalDamage = Math.round(baseDamage * multiplier * 10) / 10;

  return (
    <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 text-white font-pixel select-none">
      
      {/* 1. Верхний заголовок калькулятора */}
      <div className="border-2 border-[#5a5a5a] bg-black p-5 sm:p-6 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#5a5a5a] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/10 border border-amber-400/40 rounded">
              <CalcIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base text-white tracking-wide">
                Калькулятор Урона
              </h1>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-1">
                Выберите тип атакующего оружия и тип брони цели для мгновенного расчёта.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setBaseDamage(7);
              setSelectedDamage('slashing');
              setSelectedDefense('medium');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 rounded cursor-pointer self-start sm:self-auto transition-colors active:scale-95"
            title="Сбросить все параметры к стандартным"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Сбросить</span>
          </button>
        </div>

        {/* Интерактивное табло результата */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Базовый урон */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded flex flex-col justify-between space-y-3">
            <div className="text-[11px] text-zinc-400">Базовый урон оружия:</div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="9999"
                value={baseDamage}
                onChange={(e) => {
                  sound.playClick();
                  setBaseDamage(Math.max(1, Number(e.target.value) || 1));
                }}
                className="w-24 px-3 py-2 bg-black border border-zinc-700 rounded text-center text-amber-300 font-mono text-lg font-bold focus:outline-none focus:border-amber-400"
              />
              <span className="text-xs text-zinc-500 font-mono">ед. урона</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-zinc-500">Пресеты:</span>
              {[5, 6, 7, 9].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    sound.playClick();
                    setBaseDamage(val);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                    baseDamage === val
                      ? 'bg-amber-400 text-black font-bold border-amber-400'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Множитель связки */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded flex flex-col justify-between space-y-3">
            <div className="text-[11px] text-zinc-400">Эффективность / Множитель:</div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold font-mono ${
                percentage > 100 ? 'text-emerald-400' : percentage < 100 ? 'text-rose-400' : 'text-amber-400'
              }`}>
                {percentage}%
              </span>
              <span className="text-zinc-500 font-mono text-xs">(×{multiplier})</span>
            </div>
            <div className="text-[10px] text-zinc-400">
              {percentage > 100 && '▲ Повышенный урон (+ бонус к пробитию)'}
              {percentage < 100 && '▼ Сниженный урон (- сопротивление брони)'}
              {percentage === 100 && '• Стандартный урон (100% без штрафов)'}
            </div>
          </div>

          {/* Итоговый урон */}
          <div className="p-4 bg-zinc-950 border-2 border-amber-400/60 rounded flex flex-col justify-between space-y-2 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <div className="text-[11px] text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Финальный наносимый урон:</span>
            </div>
            <div className="flex items-center gap-3">
              <GradientPixelText
                text={`${finalDamage}`}
                typeId={selectedDamage}
                className="text-3xl sm:text-4xl font-bold"
              />
              <span className="text-xs text-zinc-400 font-mono">сердец / HP</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              Формула: {baseDamage} × {multiplier} = {finalDamage}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Выбор типа урона и типа защиты (две большие колонки) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Типы урона (атака) */}
        <div className="border-2 border-[#5a5a5a] bg-black p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#5a5a5a] pb-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs sm:text-sm">
              <Crosshair className="w-4 h-4 shrink-0" />
              <span>Выберите тип урона оружия</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">Атакующий</span>
          </div>

          <div className="space-y-2">
            {DAMAGE_TYPE_ORDER.map((dmgId) => {
              const dmg = DAMAGE_TYPES[dmgId];
              const isSelected = selectedDamage === dmgId;

              return (
                <button
                  key={dmgId}
                  onClick={() => handleDamageChange(dmgId)}
                  className={`w-full p-3 text-left border rounded transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-zinc-900 border-amber-400 ring-1 ring-amber-400 shadow-md'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{dmg.icon}</span>
                    <div>
                      <GradientPixelText text={dmg.name} typeId={dmgId} className="text-xs sm:text-sm" />
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{dmg.description}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="px-2 py-0.5 bg-amber-400 text-black text-[10px] font-bold rounded">
                      ВЫБРАНО
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Типы защиты (броня) */}
        <div className="border-2 border-[#5a5a5a] bg-black p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#5a5a5a] pb-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Выберите тип защиты цели</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">Цель / Броня</span>
          </div>

          <div className="space-y-2">
            {DEFENSE_TYPE_ORDER.map((defId) => {
              const def = DEFENSE_TYPES[defId];
              const isSelected = selectedDefense === defId;

              return (
                <button
                  key={defId}
                  onClick={() => handleDefenseChange(defId)}
                  className={`w-full p-3 text-left border rounded transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-400 ring-1 ring-emerald-400 shadow-md'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{def.icon}</span>
                    <div>
                      <span className={`text-xs sm:text-sm font-bold ${
                        defId === 'light' ? 'text-white' :
                        defId === 'medium' ? 'text-emerald-400' :
                        defId === 'heavy' ? 'text-red-700' :
                        defId === 'fortified' ? 'text-amber-400' :
                        defId === 'universal' ? 'text-sky-400' : 'text-zinc-300'
                      }`}>
                        {def.name}
                      </span>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{def.description}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="px-2 py-0.5 bg-emerald-400 text-black text-[10px] font-bold rounded">
                      ВЫБРАНО
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Таблица взаимодействия выбранного оружия со всеми видами брони */}
      <div className="border-2 border-[#5a5a5a] bg-black p-5 shadow-2xl space-y-4">
        <h2 className="text-xs sm:text-sm text-amber-400 border-b border-[#5a5a5a] pb-3 flex items-center gap-2">
          <span>Сводная таблица для:</span>
          <GradientPixelText text={activeDamage.name} typeId={selectedDamage} className="text-xs sm:text-sm" />
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DEFENSE_TYPE_ORDER.map((defId) => {
            const def = DEFENSE_TYPES[defId];
            const mult = DAMAGE_MATRIX[selectedDamage][defId];
            const pct = Math.round(mult * 100);
            const dmgVal = Math.round(baseDamage * mult * 10) / 10;
            const isTarget = selectedDefense === defId;

            return (
              <div
                key={defId}
                onClick={() => handleDefenseChange(defId)}
                className={`p-3 rounded border text-center transition-all cursor-pointer ${
                  isTarget
                    ? 'bg-zinc-900 border-amber-400 ring-2 ring-amber-400/80 shadow-lg scale-[1.02]'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="text-[11px] text-zinc-300 font-pixel mb-1 truncate">{def.name}</div>
                <div className={`text-base font-bold font-mono ${
                  pct > 100 ? 'text-emerald-400' : pct < 100 ? 'text-rose-400' : 'text-zinc-200'
                }`}>
                  {pct}%
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-1">
                  {dmgVal} урона
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
