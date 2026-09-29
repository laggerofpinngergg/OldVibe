/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DamageTable } from './components/DamageTable';
import { DamageCalculator } from './components/DamageCalculator';
import { InfoGuideSection } from './components/InfoGuideSection';
import { DamageTypeId, DefenseTypeId } from './types/ovtypes';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('table');
  const [selectedDamageType, setSelectedDamageType] = useState<DamageTypeId>('slashing');
  const [selectedDefenseType, setSelectedDefenseType] = useState<DefenseTypeId>('medium');

  const handleSelectCell = (damageId: DamageTypeId, defenseId: DefenseTypeId) => {
    setSelectedDamageType(damageId);
    setSelectedDefenseType(defenseId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white antialiased">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col items-center">
        {activeTab === 'calc' && (
          <DamageCalculator
            selectedDamageType={selectedDamageType}
            selectedDefenseType={selectedDefenseType}
            onSelectDamageType={setSelectedDamageType}
            onSelectDefenseType={setSelectedDefenseType}
          />
        )}

        {activeTab === 'table' && (
          <DamageTable
            selectedDamageType={selectedDamageType}
            selectedDefenseType={selectedDefenseType}
            onSelectCell={handleSelectCell}
          />
        )}

        {activeTab === 'info' && (
          <InfoGuideSection />
        )}
      </main>

      <footer className="w-full bg-black border-t border-[#3f3f46] py-6 px-4 text-center">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <span>OLDVIBES TYPE SYSTEM • Гайд и правила взаимодействия</span>
          <span>Серверная команда: <code>/ovtypes table</code></span>
        </div>
      </footer>
    </div>
  );
}
