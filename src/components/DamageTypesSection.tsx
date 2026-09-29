import React from 'react';
import { DAMAGE_TYPES, DAMAGE_TYPE_ORDER } from '../data/typeSystemData';
import { DamageTypeId } from '../types/ovtypes';
import { sound } from '../utils/audio';
import { Swords, ArrowUpRight, ShieldCheck, ShieldX } from 'lucide-react';

interface DamageTypesSectionProps {
  onSelectDamageType: (id: DamageTypeId) => void;
}

export const DamageTypesSection: React.FC<DamageTypesSectionProps> = ({ onSelectDamageType }) => {
  const handleTestInCalc = (id: DamageTypeId) => {
    sound.playSelect();
    onSelectDamageType(id);
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="damage-types" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400 mb-1">
          <Swords className="w-3.5 h-3.5" />
          <span>Классификация атак</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-cinzel">
          Типы урона
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Каждое оружие, заклинание или осадное орудие на сервере OLDVIBES обладает одним из 5 типов урона.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DAMAGE_TYPE_ORDER.map((id) => {
          const item = DAMAGE_TYPES[id];

          return (
            <div
              key={id}
              className="bg-[#0f1420] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800 select-none">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 font-cinzel">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ID: {item.id}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 text-xs font-mono font-medium rounded-full border ${item.badgeBg}`}>
                    {id === 'chaos' ? '100% Всегда' : 'Специфика'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Lore quote */}
                <p className="text-[11px] text-slate-400 italic mb-4 border-l-2 border-slate-700 pl-2.5 py-0.5">
                  «{item.lore}»
                </p>

                {/* Weapons list */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Характерное оружие:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.typicalWeapons.map((w, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strong and Weak matchups */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-start gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-slate-300">Эффективен против: </span>
                      <span className="text-emerald-400 font-mono text-[11px]">
                        {item.strongAgainst.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 text-rose-400">
                    <ShieldX className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-slate-300">Слаб против: </span>
                      <span className="text-rose-400 font-mono text-[11px]">
                        {item.weakAgainst.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleTestInCalc(id)}
                className="mt-5 w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 rounded-lg transition-colors cursor-pointer group/btn"
              >
                <span>Тестировать в калькуляторе</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
