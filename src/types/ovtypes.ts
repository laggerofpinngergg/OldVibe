export type DamageTypeId = 'none' | 'slashing' | 'piercing' | 'magic' | 'siege' | 'chaos';

export type DefenseTypeId = 'none' | 'light' | 'medium' | 'heavy' | 'fortified' | 'universal';

export interface DamageType {
  id: DamageTypeId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  description: string;
  lore: string;
  typicalWeapons: string[];
  strongAgainst: string[];
  weakAgainst: string[];
}

export interface DefenseType {
  id: DefenseTypeId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  description: string;
  lore: string;
  typicalArmor: string[];
  strongAgainst: string[];
  vulnerableTo: string[];
}

export interface MultiplierEntry {
  multiplier: number;
  percentage: number;
  label: string;
  badgeColor: string;
  description: string;
}

export interface Artifact {
  id: string;
  name: string;
  type: string;
  targetTypeId: DamageTypeId | DefenseTypeId;
  category: 'defense' | 'damage';
  costXP: number;
  image: string;
  fallbackIcon: string;
  rarity: 'Обычный' | 'Редкий' | 'Эпический' | 'Легендарный';
  description: string;
  howToGet: string;
  howToApply: string;
  statsBonus?: string;
}

export interface SystemRuleStep {
  step: number;
  title: string;
  description: string;
  codeExample?: string;
  icon: string;
}
