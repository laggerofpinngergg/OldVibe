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
import { Copy, Check } from 'lucide-react';

interface DamageTableProps {
  onSelectCell?: (damageType: DamageTypeId, defenseType: DefenseTypeId) => void;
  selectedDamageType?: DamageTypeId;
  selectedDefenseType?: DefenseTypeId;
}

/**
 * EXACT PYTHON SCRIPT GEOMETRY AND VALUES:
 * col_widths = [250, 210, 150, 150, 150, 220, 250]
 * ROW_HEIGHT = 60
 * HEADER_HEIGHT = 84
 * LINE_COLOR = (90, 90, 90) => #5a5a5a
 * SEP_COLOR = (120, 120, 120) => #787878
 * TITLE_GAP = 40
 * Shadow = (20, 20, 20) with offset
 */
export const DamageTable: React.FC<DamageTableProps> = ({
  onSelectCell,
  selectedDamageType = 'slashing',
  selectedDefenseType = 'medium'
}) => {
  const [hoveredRow, setHoveredRow] = useState<DamageTypeId | null>(null);
  const [hoveredCol, setHoveredCol] = useState<DefenseTypeId | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCellClick = (dId: DamageTypeId, aId: DefenseTypeId) => {
    sound.playSelect();
    if (onSelectCell) {
      onSelectCell(dId, aId);
    }
  };

  const copyCommand = () => {
    sound.playCopy();
    navigator.clipboard.writeText('/ovtypes table').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Exact defense header names from python script:
  const defenseHeaders: { id: DefenseTypeId; name: string }[] = [
    { id: 'none', name: 'Без защиты' },
    { id: 'light', name: 'Лёгкая' },
    { id: 'medium', name: 'Средняя' },
    { id: 'heavy', name: 'Тяжёлая' },
    { id: 'fortified', name: 'Укреплённая' },
    { id: 'universal', name: 'Универсальная' },
  ];

  return (
    <div className="w-full bg-black text-white min-h-[calc(100vh-3.5rem)] px-3 sm:px-6 py-6 sm:py-10 select-none flex flex-col items-center justify-center">
      
      {/* ===== Заголовок таблицы (draw_mc_text with shadow) ===== */}
      <div className="text-center mb-6 sm:mb-8">
        <h1
          className="font-pixel text-xl sm:text-2xl md:text-3xl text-white tracking-wider"
          style={{ textShadow: '2px 2px 0px rgb(20, 20, 20)' }}
        >
          ТАБЛИЦА УРОНА
        </h1>
        <div className="mt-2.5 flex items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span>Справочник OLDVIBES</span>
          <span>•</span>
          <button
            onClick={copyCommand}
            className="hover:text-amber-300 text-zinc-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer bg-zinc-900/90 hover:bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700/80 text-[11px]"
            title="Скопировать команду в игре"
          >
            <code>/ovtypes table</code>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
          </button>
        </div>
      </div>

      {/* ===== Чистая таблица по центру экрана ===== */}
      <div className="w-full max-w-[1380px] overflow-x-auto pb-4 flex justify-center">
        <div
          className="inline-block border-2 bg-black"
          style={{
            borderColor: 'rgb(120, 120, 120)', // SEP_COLOR
            boxShadow: '0 0 40px rgba(0,0,0,0.9)'
          }}
        >
          <table className="border-collapse font-pixel text-[12px] sm:text-[13px] md:text-[14px]">
            {/* Шапка таблицы (HEADER_HEIGHT = 84) */}
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid rgb(120, 120, 120)', // SEP_COLOR
                  height: '84px',
                }}
              >
                {/* Диагональная ячейка (col_width: 250px) */}
                <th
                  className="relative p-0 bg-black font-normal"
                  style={{
                    width: '230px',
                    minWidth: '200px',
                    borderRight: '2px solid rgb(90, 90, 90)', // LINE_COLOR
                  }}
                >
                  <div className="relative w-full h-[84px] overflow-hidden">
                    {/* Текст: Тип защиты (в правом верхнем углу) */}
                    <span
                      className="absolute top-2.5 right-3 text-white text-[10px] sm:text-[11px] font-pixel tracking-tight"
                      style={{ textShadow: '2px 2px 0px rgb(20, 20, 20)' }}
                    >
                      Тип защиты
                    </span>

                    {/* Разделительная линия между углами (SEP_COLOR) */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <line
                        x1="2"
                        y1="2"
                        x2="98"
                        y2="98"
                        stroke="rgb(120, 120, 120)"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Текст: Тип урона (в левом нижнем углу) */}
                    <span
                      className="absolute bottom-2.5 left-3 text-white text-[10px] sm:text-[11px] font-pixel tracking-tight"
                      style={{ textShadow: '2px 2px 0px rgb(20, 20, 20)' }}
                    >
                      Тип урона
                    </span>
                  </div>
                </th>

                {/* Заголовки типов защиты */}
                {defenseHeaders.map((col, idx) => {
                  const isColHovered = hoveredCol === col.id;
                  const isColSelected = selectedDefenseType === col.id;

                  const widths = ['190px', '140px', '140px', '140px', '200px', '230px'];
                  const colW = widths[idx];

                  return (
                    <th
                      key={col.id}
                      className={`p-3 text-center font-normal transition-colors cursor-pointer select-none text-white ${
                        isColSelected
                          ? 'bg-zinc-800/80 ring-1 ring-inset ring-zinc-500'
                          : isColHovered
                          ? 'bg-zinc-900/90'
                          : 'bg-black'
                      }`}
                      style={{
                        width: colW,
                        minWidth: colW,
                        borderRight: idx === defenseHeaders.length - 1 ? 'none' : '2px solid rgb(90, 90, 90)',
                        textShadow: '2px 2px 0px rgb(20, 20, 20)',
                      }}
                      onClick={() => {
                        sound.playClick();
                        if (onSelectCell) onSelectCell(selectedDamageType, col.id);
                      }}
                    >
                      <span className="tracking-wide text-white">{col.name}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Строки данных (ROW_HEIGHT = 60, LINE_COLOR = 90, 90, 90) */}
            <tbody>
              {DAMAGE_TYPE_ORDER.map((dmgId, rowIdx) => {
                const dmg = DAMAGE_TYPES[dmgId];
                const isRowHovered = hoveredRow === dmgId;
                const isRowSelected = selectedDamageType === dmgId;

                return (
                  <tr
                    key={dmgId}
                    style={{
                      height: '60px',
                      borderBottom: rowIdx === DAMAGE_TYPE_ORDER.length - 1 ? 'none' : '2px solid rgb(90, 90, 90)',
                    }}
                    onMouseEnter={() => setHoveredRow(dmgId)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Левая ячейка: Заголовок типа урона с точным градиентом */}
                    <th
                      className={`p-3 text-center font-normal cursor-pointer select-none transition-colors ${
                        isRowSelected
                          ? 'bg-zinc-800/80 ring-1 ring-inset ring-zinc-500'
                          : isRowHovered
                          ? 'bg-zinc-900/90'
                          : 'bg-black'
                      }`}
                      style={{
                        width: '230px',
                        minWidth: '200px',
                        borderRight: '2px solid rgb(90, 90, 90)',
                      }}
                      onClick={() => {
                        sound.playClick();
                        if (onSelectCell) onSelectCell(dmgId, selectedDefenseType);
                      }}
                    >
                      <GradientPixelText
                        text={dmg.name}
                        typeId={dmgId}
                        className="tracking-wide"
                      />
                    </th>

                    {/* Ячейки значений урона (проценты с градиентом строки) */}
                    {DEFENSE_TYPE_ORDER.map((defId, colIdx) => {
                      const multiplier = DAMAGE_MATRIX[dmgId][defId];
                      const percentage = Math.round(multiplier * 100);
                      const percentText = `${percentage}%`;

                      const isCellSelected = selectedDamageType === dmgId && selectedDefenseType === defId;
                      const isHovered = hoveredRow === dmgId || hoveredCol === defId;

                      return (
                        <td
                          key={defId}
                          style={{
                            borderRight: colIdx === DEFENSE_TYPE_ORDER.length - 1 ? 'none' : '2px solid rgb(90, 90, 90)',
                          }}
                          className={`p-3 text-center transition-all cursor-pointer relative ${
                            isCellSelected
                              ? 'bg-zinc-800 ring-2 ring-inset ring-amber-400'
                              : isHovered
                              ? 'bg-zinc-900/80'
                              : 'bg-black'
                          }`}
                          onMouseEnter={() => {
                            setHoveredRow(dmgId);
                            setHoveredCol(defId);
                          }}
                          onMouseLeave={() => {
                            setHoveredCol(null);
                          }}
                          onClick={() => handleCellClick(dmgId, defId)}
                        >
                          <GradientPixelText
                            text={percentText}
                            typeId={dmgId}
                            className="font-bold inline-block"
                          />
                          {isCellSelected && (
                            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Быстрая справка по палитре Minecraft */}
      <div className="w-full max-w-[1380px] mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 px-1">
        <div className="flex items-center gap-4">
          <span>Стиль: Minecraft Palette & Gradient Lerp</span>
          <span>•</span>
          <span>Цвета: <code>GRADIENTS (draw_gradient_text)</code></span>
        </div>
        <div>
          <span>/ovtypes table • OLDVIBES</span>
        </div>
      </div>
    </div>
  );
};
