import React, { useState } from 'react';
import { Swords, Shield, Copy, Check } from 'lucide-react';
import { DAMAGE_ARTIFACTS, DEFENSE_ARTIFACTS } from '../data/guideRulesData';
import { GradientPixelText } from './GradientPixelText';
import { sound } from '../utils/audio';

/**
 * EXACT COLOR SCHEME SPECIFIED BY USER:
 * 
 * 1. Верхние квадратики типов урона и типов защиты НЕ ОКРАШИВАТЬ фон! Окрашивать только текст!
 *    Фон стандартный (p-2.5 bg-zinc-950 border border-zinc-800).
 * 
 * 2. Тяжёлая: ТЕМНО-КРАСНАЯ (Deep Dark Red: #8b0000 / #991b1b).
 * 3. Хаос: оставить как есть (яркий огненно-алый / red-500 #ef4444).
 * 4. Укреплённая: ТОЧНО ТАКОГО ЖЕ ЦВЕТА КАК ОСАДНЫЙ (оранжево-золотой / amber-500 #f59e0b).
 * 5. Средняя: ТОЧНО ТАКОГО ЖЕ ЦВЕТА КАК КОЛЮЩИЙ (сочно-зелёный / emerald-500 #10b981).
 * 6. Лёгкая: БЕЛАЯ (#ffffff).
 * 7. Универсальная: ГОЛУБОГО ЦВЕТА (#38bdf8 / #0ea5e9).
 * 8. Без урона и Без защиты: одинаковый серый (#9ca3af / zinc-400).
 */

const ARTIFACT_BG_STYLES: Record<string, { background: string; borderColor: string }> = {
  // --- ТИПЫ УРОНА ---
  slashing: {
    // Режущий: синий
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.45) 0%, rgba(15, 23, 42, 0.7) 35%, rgba(255, 255, 255, 0.22) 50%, rgba(30, 58, 138, 0.7) 65%, rgba(37, 99, 235, 0.45) 100%)',
    borderColor: 'rgba(96, 165, 250, 0.7)'
  },
  piercing: {
    // Колющий: зелёный
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(6, 78, 59, 0.7) 35%, rgba(255, 255, 255, 0.22) 50%, rgba(4, 120, 87, 0.7) 65%, rgba(16, 185, 129, 0.45) 100%)',
    borderColor: 'rgba(52, 211, 153, 0.7)'
  },
  magic: {
    // Магический: фиолетово-розовый
    background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.45) 0%, rgba(76, 29, 149, 0.7) 35%, rgba(255, 255, 255, 0.22) 50%, rgba(134, 25, 143, 0.7) 65%, rgba(217, 70, 239, 0.45) 100%)',
    borderColor: 'rgba(232, 121, 249, 0.7)'
  },
  siege: {
    // Осадный: оранжево-золотой
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.5) 0%, rgba(120, 53, 15, 0.7) 35%, rgba(255, 255, 255, 0.22) 50%, rgba(180, 83, 9, 0.7) 65%, rgba(245, 158, 11, 0.5) 100%)',
    borderColor: 'rgba(251, 191, 36, 0.75)'
  },
  chaos: {
    // Хаос: яркий красный/алый (оставлен как есть)
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.55) 0%, rgba(153, 27, 27, 0.7) 35%, rgba(255, 255, 255, 0.25) 50%, rgba(185, 28, 28, 0.7) 65%, rgba(239, 68, 68, 0.55) 100%)',
    borderColor: 'rgba(248, 113, 113, 0.8)'
  },

  // --- ТИПЫ ЗАЩИТЫ ---
  light: {
    // 1. Лёгкая: БЕЛАЯ
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(113, 113, 122, 0.6) 35%, rgba(255, 255, 255, 0.7) 50%, rgba(161, 161, 170, 0.6) 65%, rgba(255, 255, 255, 0.4) 100%)',
    borderColor: 'rgba(255, 255, 255, 0.9)'
  },
  medium: {
    // 2. Средняя: ТОЧНО ТАКОГО ЖЕ ЦВЕТА КАК КОЛЮЩИЙ
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(6, 78, 59, 0.7) 35%, rgba(255, 255, 255, 0.22) 50%, rgba(4, 120, 87, 0.7) 65%, rgba(16, 185, 129, 0.45) 100%)',
    borderColor: 'rgba(52, 211, 153, 0.7)'
  },
  heavy: {
    // 3. Тяжёлая: ТЕМНО-КРАСНАЯ
    background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.65) 0%, rgba(69, 10, 10, 0.85) 35%, rgba(255, 255, 255, 0.2) 50%, rgba(88, 15, 15, 0.85) 65%, rgba(127, 29, 29, 0.65) 100%)',
    borderColor: 'rgba(185, 28, 28, 0.85)'
  },
  fortified: {
    // 4. Укреплённая: ТОЧНО ТАКОГО ЖЕ ЦВЕТА КАК ОСАДНЫЙ
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.5) 0%, rgba(120, 53, 15, 0.7) 35%, rgba(255, 255, 255, 0.22) 50%, rgba(180, 83, 9, 0.7) 65%, rgba(245, 158, 11, 0.5) 100%)',
    borderColor: 'rgba(251, 191, 36, 0.75)'
  },
  universal: {
    // 5. Универсальная: ГОЛУБОГО ЦВЕТА
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.5) 0%, rgba(3, 105, 161, 0.7) 35%, rgba(255, 255, 255, 0.25) 50%, rgba(7, 89, 133, 0.7) 65%, rgba(14, 165, 233, 0.5) 100%)',
    borderColor: 'rgba(56, 189, 248, 0.8)'
  }
};

export const InfoGuideSection: React.FC = () => {
  const [filterArtifacts, setFilterArtifacts] = useState<'all' | 'damage' | 'defense'>('all');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    sound.playCopy();
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedCmd(text);
    setTimeout(() => {
      setCopiedCmd(null);
    }, 2000);
  };

  return (
    <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 text-white font-pixel select-none">
      
      {/* 1. Верхний блок: Типы урона и типы защиты */}
      <div className="border-2 border-[#5a5a5a] bg-black p-5 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#5a5a5a] pb-4">
          <div>
            <h1 className="text-sm sm:text-base text-white tracking-wide">
              Система типов OldVibes
            </h1>
            <p className="text-[11px] sm:text-xs text-zinc-300 mt-2 leading-relaxed">
              На сервере существуют типы урона и типы защиты. Они влияют на количество получаемого урона.
            </p>
          </div>
          <button
            onClick={() => copyToClipboard('/ovtypes table')}
            title="Нажмите, чтобы скопировать команду"
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-amber-300 self-start md:self-auto rounded cursor-pointer transition-colors active:scale-95"
          >
            {copiedCmd === '/ovtypes table' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>/ovtypes table</span>
              </>
            )}
          </button>
        </div>

        {/* 2 колонки: Типы урона и Типы защиты */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Типы урона */}
          <div className="p-4 bg-black border border-[#5a5a5a] space-y-3">
            <div className="flex items-center gap-2 text-blue-400 text-xs sm:text-sm">
              <Swords className="w-4 h-4 shrink-0" />
              <span>Типы урона</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Типы урона оружия:
            </div>
            {/* Квадратики без цветного фона, только с окрашенным текстом */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center">
                <GradientPixelText text="Режущий" typeId="slashing" className="text-xs" />
              </div>
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center">
                <GradientPixelText text="Колющий" typeId="piercing" className="text-xs" />
              </div>
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center">
                <GradientPixelText text="Магический" typeId="magic" className="text-xs" />
              </div>
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center">
                <GradientPixelText text="Осадный" typeId="siege" className="text-xs" />
              </div>
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center">
                <GradientPixelText text="Хаос" typeId="chaos" className="text-xs" />
              </div>
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center text-zinc-300">
                Без урона
              </div>
            </div>
          </div>

          {/* Типы защиты */}
          <div className="p-4 bg-black border border-[#5a5a5a] space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Типы защиты</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Типы защиты брони:
            </div>
            {/* Квадратики без цветного фона, только с окрашенным текстом */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              {/* Лёгкая - белая */}
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-white font-bold flex items-center">
                Лёгкая
              </div>
              {/* Средняя - точно такого же цвета как колющий (emerald) */}
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center">
                <GradientPixelText text="Средняя" typeId="piercing" className="text-xs" />
              </div>
              {/* Тяжёлая - темно-красная */}
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-red-700 font-bold flex items-center">
                Тяжёлая
              </div>
              {/* Укреплённая - точно такого же цвета как осадный (amber) */}
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 flex items-center">
                <GradientPixelText text="Укреплённая" typeId="siege" className="text-xs" />
              </div>
              {/* Универсальная - голубого цвета */}
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-sky-400 flex items-center">
                Универсальная
              </div>
              {/* Без защиты - нейтральный серый, такой же как без урона */}
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center">
                Без защиты
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400">
          Точные проценты урона и взаимодействие типов смотри во вкладке «Таблица урона».
        </div>
      </div>

      {/* 2. Артефакты получения типов */}
      <div className="border-2 border-[#5a5a5a] bg-black p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#5a5a5a] pb-4">
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm text-white">
              Получение типов (Артефакты)
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-zinc-200">
              <span>Артефакты можно скрафтить:</span>
              <button
                onClick={() => copyToClipboard('/recipes')}
                title="Нажмите, чтобы скопировать команду"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 hover:border-amber-400 text-amber-300 rounded cursor-pointer transition-all active:scale-95 text-xs font-bold"
              >
                {copiedCmd === '/recipes' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>/recipes</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Тип накладывается на предмет через наковальню с помощью соответствующего артефакта.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded self-start sm:self-auto shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                setFilterArtifacts('all');
              }}
              className={`px-2.5 py-1 text-[10px] rounded cursor-pointer transition-colors ${
                filterArtifacts === 'all' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterArtifacts('damage');
              }}
              className={`px-2.5 py-1 text-[10px] rounded cursor-pointer transition-colors ${
                filterArtifacts === 'damage' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Урон
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterArtifacts('defense');
              }}
              className={`px-2.5 py-1 text-[10px] rounded cursor-pointer transition-colors ${
                filterArtifacts === 'defense' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Защита
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Артефакты урона */}
          {(filterArtifacts === 'all' || filterArtifacts === 'damage') && (
            <div className="space-y-2">
              <span className="text-[11px] text-blue-400 block">Артефакты урона:</span>
              <div className="space-y-2">
                {DAMAGE_ARTIFACTS.map((item) => {
                  const style = ARTIFACT_BG_STYLES[item.typeId] || {
                    background: 'linear-gradient(135deg, rgba(60,60,60,0.5), rgba(255,255,255,0.2), rgba(60,60,60,0.5))',
                    borderColor: '#5a5a5a'
                  };

                  return (
                    <div
                      key={item.name}
                      style={{
                        background: style.background,
                        borderColor: style.borderColor,
                      }}
                      className="p-3 border rounded shadow-md artifact-shimmer flex items-center justify-between gap-3 text-[11px] relative overflow-hidden"
                    >
                      <span className="text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        {item.name}
                      </span>
                      <span className="px-2 py-0.5 bg-black/80 border border-white/20 text-[10px] text-zinc-100 rounded shrink-0 shadow">
                        {item.givesType}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Артефакты защиты */}
          {(filterArtifacts === 'all' || filterArtifacts === 'defense') && (
            <div className="space-y-2">
              <span className="text-[11px] text-emerald-400 block">Артефакты защиты:</span>
              <div className="space-y-2">
                {DEFENSE_ARTIFACTS.map((item) => {
                  const style = ARTIFACT_BG_STYLES[item.typeId] || {
                    background: 'linear-gradient(135deg, rgba(60,60,60,0.5), rgba(255,255,255,0.2), rgba(60,60,60,0.5))',
                    borderColor: '#5a5a5a'
                  };

                  return (
                    <div
                      key={item.name}
                      style={{
                        background: style.background,
                        borderColor: style.borderColor,
                      }}
                      className="p-3 border rounded shadow-md artifact-shimmer flex items-center justify-between gap-3 text-[11px] relative overflow-hidden"
                    >
                      <span className="text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        {item.name}
                      </span>
                      <span className="px-2 py-0.5 bg-black/80 border border-white/20 text-[10px] text-zinc-100 rounded shrink-0 shadow">
                        {item.givesType}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Блок правил: Наковальня, Броня, Прочность, Определение противника */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
        
        {/* Наковальня */}
        <div className="border-2 border-[#5a5a5a] bg-black p-4 space-y-2.5">
          <span className="text-amber-400 block border-b border-[#5a5a5a] pb-2">
            Наложение типа на наковальне
          </span>
          <ul className="space-y-1.5 text-zinc-300 leading-relaxed">
            <li>• Тип накладывается на предмет через наковальню с помощью артефакта.</li>
            <li>• После наложения артефакт расходуется.</li>
            <li>• Один предмет не может иметь несколько типов.</li>
            <li>• Уже имеющий тип предмет нельзя переименовать или изменить в другой тип новым артефактом.</li>
            <li>• Тип предмета пишется в его описании (Lore).</li>
          </ul>
        </div>

        {/* Ограничение на броню */}
        <div className="border-2 border-[#5a5a5a] bg-black p-4 space-y-2.5">
          <span className="text-cyan-400 block border-b border-[#5a5a5a] pb-2">
            Ограничение на броню
          </span>
          <p className="text-zinc-300 leading-relaxed">
            Нельзя одновременно носить разные типы защиты. Вся надетая броня должна быть одного типа или без защиты.
          </p>
          <div className="p-2 bg-zinc-950 border border-zinc-800 space-y-1 text-[10px]">
            <div className="text-emerald-400">• Лёгкая + Лёгкая + Без защиты — можно</div>
            <div className="text-rose-400">• Лёгкая + Средняя — нельзя</div>
          </div>
        </div>

        {/* Прочность */}
        <div className="border-2 border-[#5a5a5a] bg-black p-4 space-y-2.5">
          <span className="text-amber-400 block border-b border-[#5a5a5a] pb-2">
            Прочность и изменение типа (порог 50%)
          </span>
          <div className="space-y-2 text-zinc-300 leading-relaxed text-[10px]">
            <div className="p-2 bg-zinc-950 border border-zinc-800">
              <span className="text-amber-300 block mb-1">Режущий / Колющий / Магический:</span>
              Если прочность падает ниже 50% → тип сбрасывается в Без урона, а прочность восстанавливается до 100%.
            </div>
            <div className="p-2 bg-zinc-950 border border-zinc-800">
              <span className="text-rose-400 block mb-1">Хаос:</span>
              Если прочность падает ниже 50% → мутирует в случайный Режущий, Колющий или Магический (Осадный выпасть не может), а прочность восстанавливается до 100%.
            </div>
            <div className="p-2 bg-zinc-950 border border-zinc-800">
              <span className="text-yellow-400 block mb-1">Осадный:</span>
              Не теряет свой тип из-за прочности и не ломается.
            </div>
          </div>
        </div>

        {/* Определение противника */}
        <div className="border-2 border-[#5a5a5a] bg-black p-4 space-y-2.5">
          <span className="text-emerald-400 block border-b border-[#5a5a5a] pb-2">
            Определение противника
          </span>
          <div className="space-y-2 text-zinc-300 leading-relaxed text-[10px]">
            <div>Тип противника не показывается постоянно, а раскрывается во время боя:</div>
            <div className="p-2 bg-zinc-950 border border-zinc-800">
              • Если ты ударил игрока → узнаёшь его тип защиты.
            </div>
            <div className="p-2 bg-zinc-950 border border-zinc-800">
              • Если игрок ударил тебя → узнаёшь его тип урона.
            </div>
            <div className="text-zinc-500">
              Уже известный тип повторно не выводится, пока игрок его не сменит.
            </div>
          </div>
        </div>

      </div>

      {/* 4. Правила хотбара и инвентаря (в самом низу) */}
      <div className="border-2 border-[#5a5a5a] bg-black p-5 sm:p-6 shadow-2xl space-y-4">
        <h2 className="text-xs sm:text-sm text-amber-400 border-b border-[#5a5a5a] pb-3">
          Правила хотбара и инвентаря
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
          <div className="p-3.5 bg-zinc-950 border border-zinc-800 space-y-1.5 leading-relaxed">
            <span className="text-white block">1. Хотбар, а не инвентарь:</span>
            <span className="text-zinc-400 block">
              Ограничения действуют только на хотбар (9 слотов быстрого доступа). В инвентаре можно хранить оружие любых типов.
            </span>
          </div>

          <div className="p-3.5 bg-zinc-950 border border-zinc-800 space-y-1.5 leading-relaxed">
            <span className="text-white block">2. Оружие одного типа:</span>
            <span className="text-zinc-400 block">
              Оружия одного типа можно иметь сколько угодно — как в хотбаре, так и в инвентаре (например, хоть несколько Режущих мечей сразу).
            </span>
          </div>

          <div className="p-3.5 bg-zinc-950 border border-zinc-800 space-y-1.5 leading-relaxed">
            <span className="text-white block">3. Комбинации типов:</span>
            <span className="text-zinc-400 block">
              В хотбаре может быть максимум 2 разных обычных типа (Режущий / Колющий / Магический). Если есть Осадный или Хаос — других типизированных оружий в хотбаре быть не может.
            </span>
          </div>
        </div>

        <div className="p-3 bg-zinc-950 border border-zinc-800 text-[11px] leading-relaxed space-y-1">
          <span className="text-amber-300 block">Автоматическое перемещение:</span>
          <span className="text-zinc-400 block">
            Если взять в хотбар запрещённую комбинацию: если есть место в инвентаре — предмет перемещается туда; если места в инвентаре нет — предмет выпадает на землю.
          </span>
        </div>

        <div className="p-3.5 bg-zinc-950 border border-rose-900/60 text-[11px] leading-relaxed space-y-2">
          <span className="text-rose-400 block">Запрет во время PvP:</span>
          <span className="text-zinc-300 block">
            Во время боя нельзя перекладывать мечи и другое оружие в инвентаре (перемещать в хотбар или из него). Оружие в хотбар нужно ставить до начала боя.
          </span>
          <div className="p-2 bg-black border border-zinc-800 text-amber-300 text-[10px]">
            Если у игрока в момент начала боя нет меча в хотбаре — ему случайно дадут любое оружие из его инвентаря (если там, конечно, есть оружие).
          </div>
        </div>
      </div>

      {/* Короткая памятка */}
      <div className="p-3.5 border-2 border-[#5a5a5a] bg-zinc-950 text-center text-[10px] text-zinc-400">
        Все значения урона, множители и взаимодействие типов проверяй в Таблице урона.
      </div>

    </div>
  );
};
