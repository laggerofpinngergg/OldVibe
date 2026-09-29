import React, { useState } from 'react';
import { Table, Shield, Swords, Sparkles, BookOpen, Calculator as CalcIcon, Copy, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    sound.playCopy();
    navigator.clipboard.writeText('/ovtypes table').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navCards = [
    { id: 'table', label: 'Таблица урона', icon: Table, color: 'text-amber-400', border: 'border-amber-500/30' },
    { id: 'calculator', label: 'Калькулятор', icon: CalcIcon, color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { id: 'damage-types', label: 'Типы урона', icon: Swords, color: 'text-orange-400', border: 'border-orange-500/30' },
    { id: 'defense-types', label: 'Типы защиты', icon: Shield, color: 'text-sky-400', border: 'border-sky-500/30' },
    { id: 'artifacts', label: 'Артефакты', icon: Sparkles, color: 'text-purple-400', border: 'border-purple-500/30' },
    { id: 'mechanics', label: 'Как это работает', icon: BookOpen, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  ];

  return (
    <section id="top" className="relative w-full overflow-hidden border-b border-slate-800/80 bg-[#0c0f17]">
      {/* Background artwork banner with gradient scrim */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img
          src="/src/assets/images/oldvibes_hero_banner_1790667852820.jpg"
          alt="OLDVIBES Combat Systems"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f17]/80 via-[#0c0f17]/95 to-[#0c0f17]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-14 text-center">
        {/* Subtle command pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs text-slate-400 bg-slate-900/80 border border-slate-700/60 rounded-full">
          <span>Справочник сервера</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <button
            onClick={copyCommand}
            className="flex items-center gap-1 font-mono text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>/ovtypes table</span>
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>
        </div>

        {/* Title & subtitle */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 font-cinzel text-balance mb-4">
          OLDVIBES <span className="text-amber-400">TYPE SYSTEM</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto mb-8 text-balance">
          Официальная интерактивная матрица взаимодействия типов урона, брони и артефактов
        </p>

        {/* Navigation jump grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
          {navCards.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.id);
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border ${item.border} hover:border-slate-600 transition-all duration-150 cursor-pointer text-center group`}
              >
                <Icon className={`w-5 h-5 mb-1.5 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white tracking-wide">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
