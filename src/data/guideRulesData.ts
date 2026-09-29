import { DamageTypeId, DefenseTypeId } from '../types/ovtypes';

export interface ArtifactInfo {
  name: string;
  type: string;
  typeId: DamageTypeId | DefenseTypeId;
  category: 'damage' | 'defense';
  givesType: string;
}

export const DAMAGE_ARTIFACTS: ArtifactInfo[] = [
  {
    name: 'Осколок Рассечения',
    type: 'Режущий',
    typeId: 'slashing',
    category: 'damage',
    givesType: 'Режущий'
  },
  {
    name: 'Стрела Пронзания',
    type: 'Колющий',
    typeId: 'piercing',
    category: 'damage',
    givesType: 'Колющий'
  },
  {
    name: 'Око Арканума',
    type: 'Магический',
    typeId: 'magic',
    category: 'damage',
    givesType: 'Магический'
  },
  {
    name: 'Сердце Разрушителя',
    type: 'Осадный',
    typeId: 'siege',
    category: 'damage',
    givesType: 'Осадный'
  },
  {
    name: 'Звезда Хаоса',
    type: 'Хаос',
    typeId: 'chaos',
    category: 'damage',
    givesType: 'Хаос'
  }
];

export const DEFENSE_ARTIFACTS: ArtifactInfo[] = [
  {
    name: 'Перо Ветра',
    type: 'Лёгкая',
    typeId: 'light',
    category: 'defense',
    givesType: 'Лёгкая'
  },
  {
    name: 'Кожа Стража',
    type: 'Средняя',
    typeId: 'medium',
    category: 'defense',
    givesType: 'Средняя'
  },
  {
    name: 'Камень Несокрушимости',
    type: 'Тяжёлая',
    typeId: 'heavy',
    category: 'defense',
    givesType: 'Тяжёлая'
  },
  {
    name: 'Панцирь Бастиона',
    type: 'Укреплённая',
    typeId: 'fortified',
    category: 'defense',
    givesType: 'Укреплённая'
  },
  {
    name: 'Артефакт Гармонии',
    type: 'Универсальная',
    typeId: 'universal',
    category: 'defense',
    givesType: 'Универсальная'
  }
];
