import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Table, Calculator as CalcIcon, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

export type ActiveTab = 'calc' | 'table' | 'info';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playSelect();
  };

  const copyCommand = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playCopy();
    navigator.clipboard.writeText('/ovtypes table').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/95 border-b border-[#3f3f46] transition-colors">
      <div className="max-w-[1380px] mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo/Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-pixel text-xs sm:text-sm tracking-wider text-white">
            OLDVIBES
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
            TYPE SYSTEM
          </span>
        </div>

        {/* Tab Switcher: [Калькулятор] слева, затем [Таблица урона], затем [Информация] */}
        <nav className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg">
          <button
            onClick={() => {
              sound.playClick();
              onTabChange('calc');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-pixel text-[11px] sm:text-xs transition-all cursor-pointer ${
              activeTab === 'calc'
                ? 'bg-amber-400 text-black font-bold shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <CalcIcon className="w-3.5 h-3.5" />
            <span>Калькулятор</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onTabChange('table');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-pixel text-[11px] sm:text-xs transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-amber-400 text-black font-bold shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Таблица урона</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onTabChange('info');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-pixel text-[11px] sm:text-xs transition-all cursor-pointer ${
              activeTab === 'info'
                ? 'bg-amber-400 text-black font-bold shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Информация</span>
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyCommand}
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-zinc-300 hover:text-amber-300 bg-zinc-900 border border-zinc-700/80 rounded transition-colors active:scale-95 cursor-pointer"
            title="Скопировать команду в игре"
          >
            <span>/ovtypes table</span>
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
          </button>

          <button
            onClick={toggleSound}
            className={`p-2 rounded border transition-colors cursor-pointer ${
              soundEnabled
                ? 'text-amber-400 border-zinc-700 hover:bg-zinc-900'
                : 'text-zinc-500 border-zinc-800 hover:bg-zinc-900'
            }`}
            title={soundEnabled ? 'Выключить звук кликов' : 'Включить звук кликов'}
            aria-label="Переключить звук"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
