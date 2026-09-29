import React from 'react';
import { sound } from '../utils/audio';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#0a0d14] border-t border-slate-800/80 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-sm font-bold tracking-wider text-amber-400 font-cinzel">
            OLDVIBES TYPE SYSTEM
          </span>
          <p className="text-xs text-slate-400 mt-1">
            Официальный справочник типов урона и брони для игроков сервера
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('table');
            }}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Таблица урона
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('calculator');
            }}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Калькулятор
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('damage-types');
            }}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Типы урона
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('defense-types');
            }}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Типы защиты
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('artifacts');
            }}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Артефакты
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('mechanics');
            }}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Как это работает
          </button>
        </nav>

        <div className="text-xs text-slate-500 font-mono text-center md:text-right">
          <span>/ovtypes table · OLDVIBES 2026</span>
        </div>
      </div>
    </footer>
  );
};
