import React, { useState } from 'react';
import { ARTIFACTS } from '../data/typeSystemData';
import { Artifact, DamageTypeId, DefenseTypeId } from '../types/ovtypes';
import { sound } from '../utils/audio';
import { Sparkles, Coins, HelpCircle, Wrench, Shield, Swords, Check } from 'lucide-react';

interface ArtifactsSectionProps {
  onSelectArtifactType?: (typeId: DamageTypeId | DefenseTypeId, category: 'damage' | 'defense') => void;
}

export const ArtifactsSection: React.FC<ArtifactsSectionProps> = ({ onSelectArtifactType }) => {
  const [filter, setFilter] = useState<'all' | 'defense' | 'damage'>('all');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const filteredArtifacts = ARTIFACTS.filter((art) => {
    if (filter === 'all') return true;
    return art.category === filter;
  });

  const getRarityBadge = (rarity: Artifact['rarity']) => {
    switch (rarity) {
      case 'Легендарный':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Эпический':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Редкий':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-slate-700/30 text-slate-300 border-slate-600/30';
    }
  };

  return (
    <section id="artifacts" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Снаряжение и модификаторы</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-cinzel">
            Артефакты системы
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Игровые реликвии, наделяющие оружие типами урона, а броню — особыми типами защиты.
          </p>
        </div>

        {/* Functional filter segmented control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0 self-start md:self-end">
          <button
            onClick={() => {
              sound.playClick();
              setFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-400 text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Все ({ARTIFACTS.length})
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('defense');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'defense'
                ? 'bg-amber-400 text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Защита
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('damage');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'damage'
                ? 'bg-amber-400 text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Урон
          </button>
        </div>
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredArtifacts.map((item) => (
          <div
            key={item.id}
            className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-200 flex flex-col justify-between shadow-xl group"
          >
            {/* Image / Visual Asset Slot with Zero-Broken-Image Policy */}
            <div className="relative aspect-square w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#121824] to-slate-950 p-4 text-center">
                  <span className="text-4xl mb-2 select-none">{item.fallbackIcon}</span>
                  <span className="text-xs text-slate-400 font-cinzel">{item.type}</span>
                </div>
              )}

              {/* Rarity & Cost Badges on Image */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border ${getRarityBadge(item.rarity)} backdrop-blur-md`}>
                  {item.rarity}
                </span>
              </div>

              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold backdrop-blur-md">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.costXP} XP</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                  {item.category === 'defense' ? (
                    <Shield className="w-3.5 h-3.5" />
                  ) : (
                    <Swords className="w-3.5 h-3.5" />
                  )}
                  <span>{item.type}</span>
                </div>

                <h3 className="text-base font-bold text-slate-100 font-cinzel mb-2">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.statsBonus && (
                  <div className="p-2 mb-3 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                    <span className="font-semibold">Эффект: </span>
                    {item.statsBonus}
                  </div>
                )}

                {/* How to get & how to apply */}
                <div className="space-y-2 text-[11px] pt-3 border-t border-slate-800 text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-400">Как получить: </span>
                      <span>{item.howToGet}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-400">Как применить: </span>
                      <span>{item.howToApply}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Select Button */}
              {onSelectArtifactType && (
                <button
                  onClick={() => {
                    sound.playSelect();
                    onSelectArtifactType(item.targetTypeId, item.category);
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-4 w-full py-1.5 px-3 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Выбрать в калькуляторе
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
