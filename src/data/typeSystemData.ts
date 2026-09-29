import { DamageType, DefenseType, DamageTypeId, DefenseTypeId, Artifact, SystemRuleStep } from '../types/ovtypes';

export const DAMAGE_TYPES: Record<DamageTypeId, DamageType> = {
  none: {
    id: 'none',
    name: 'Без урона',
    shortName: 'Без',
    icon: '👊',
    color: '#e2e8f0', // White/slate
    badgeBg: 'bg-slate-700/30 text-white border-slate-600',
    borderColor: 'border-slate-600',
    description: 'Базовый безоружный или нейтральный урон. 100% против целей без брони, 20% по любой защите.',
    lore: 'Простые толчки и безоружные удары практически не пробивают боевую экипировку.',
    typicalWeapons: ['Удары кулаком', 'Толчки', 'Нейтральные атаки'],
    strongAgainst: ['Без защиты (100%)'],
    weakAgainst: ['Лёгкая (20%)', 'Средняя (20%)', 'Тяжёлая (20%)', 'Укреплённая (20%)', 'Универсальная (20%)']
  },
  slashing: {
    id: 'slashing',
    name: 'Режущий',
    shortName: 'Реж.',
    icon: '⚔',
    color: '#3b82f6', // Blue as in image
    badgeBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    borderColor: 'border-blue-500/40',
    description: 'Используется для атак рассекающего и режущего типа. Сокрушает среднюю броню и цели без защиты.',
    lore: 'Острые лезвия рассекают мягкую плоть и кольчугу, нанося колоссальный урон незащищенным участкам тела.',
    typicalWeapons: ['Мечи', 'Секиры', 'Кинжалы с широким лезвием', 'Когти', 'Катаны'],
    strongAgainst: ['Средняя (175%)', 'Без защиты (200%)', 'Универсальная (115%)'],
    weakAgainst: ['Лёгкая (60%)', 'Укреплённая (50%)']
  },
  piercing: {
    id: 'piercing',
    name: 'Колющий',
    shortName: 'Кол.',
    icon: '🏹',
    color: '#22c55e', // Green as in image
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500/40',
    description: 'Используется для стрелкового и точечного пробивающего оружия. Максимально эффективен против лёгких доспехов.',
    lore: 'Тонкие наконечники стрел и копий мгновенно пробивают шёлковые и кожаные облачения стрелков и следопытов.',
    typicalWeapons: ['Луки', 'Арбалеты', 'Копья', 'Пики', 'Рапиры'],
    strongAgainst: ['Лёгкая (175%)', 'Без защиты (200%)', 'Универсальная (120%)'],
    weakAgainst: ['Тяжёлая (60%)', 'Укреплённая (45%)']
  },
  magic: {
    id: 'magic',
    name: 'Магический',
    shortName: 'Маг.',
    icon: '✨',
    color: '#d946ef', // Magenta/pink-purple as in image
    badgeBg: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    borderColor: 'border-fuchsia-500/40',
    description: 'Используется для тайных чар, посохов и рунических свитков. Испепеляет монолитные тяжёлые доспехи.',
    lore: 'Тайное пламя и молнии раскаляют стальные латы рыцарей, но рассеиваются о гибкую дубленую кожу и рунные барьеры.',
    typicalWeapons: ['Посохи магов', 'Свитки заклинаний', 'Кристальные сферы', 'Зачарованное оружие'],
    strongAgainst: ['Тяжёлая (175%)', 'Без защиты (200%)', 'Универсальная (125%)'],
    weakAgainst: ['Средняя (60%)', 'Укреплённая (40%)']
  },
  siege: {
    id: 'siege',
    name: 'Осадный',
    shortName: 'Осад.',
    icon: '💥',
    color: '#eab308', // Yellow/Gold as in image
    badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    description: 'Используется для разрушительных атак осадных машин и тяжелых молотов. Специализирован на сносе укреплений.',
    lore: 'Кинетическая сила раскачивающихся таранов и взрывных ядер крошит камень крепостных стен и ломает осадные щиты.',
    typicalWeapons: ['Катапульты', 'Осадные тараны', 'Динамит / Взрывчатка', 'Тяжелые двуручные молоты'],
    strongAgainst: ['Укреплённая (185%)', 'Без защиты (200%)', 'Универсальная (105%)'],
    weakAgainst: ['Лёгкая (60%)', 'Средняя (60%)', 'Тяжёлая (60%)']
  },
  chaos: {
    id: 'chaos',
    name: 'Хаос',
    shortName: 'Хаос',
    icon: '☠',
    color: '#ef4444', // Red as in image
    badgeBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    borderColor: 'border-rose-500/40',
    description: 'Игнорирует любые различия между типами защиты. Всегда наносит ровно 100% базового урона.',
    lore: 'Первородная сила Пустоты превосходит любые щиты, латы и укрепления, нанося безупречно стабильный урон.',
    typicalWeapons: ['Клинки Бездны', 'Хаотические артефакты', 'Божественные реликвии', 'Оружие титанов'],
    strongAgainst: ['Стабилен против всех типов (100%)'],
    weakAgainst: ['Нет (не снижается)']
  }
};

export const DEFENSE_TYPES: Record<DefenseTypeId, DefenseType> = {
  none: {
    id: 'none',
    name: 'Без защиты',
    shortName: 'Без',
    icon: '🛡️',
    color: '#94a3b8',
    badgeBg: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    borderColor: 'border-slate-500/40',
    description: 'Полное отсутствие брони или незащищенное тело. Получает двойной урон (200%) почти от всех типов атак.',
    lore: 'Существа без снаряжения беззащитны перед лезвиями, стрелами, магией и осадой.',
    typicalArmor: ['Отсутствие брони', 'Обычная одежда', 'Призванные пехотинцы 0-го уровня'],
    strongAgainst: ['Нет сильных сторон'],
    vulnerableTo: ['Режущий (200%)', 'Колющий (200%)', 'Магический (200%)', 'Осадный (200%)']
  },
  light: {
    id: 'light',
    name: 'Лёгкая',
    shortName: 'Лёгкая',
    icon: '🪶',
    color: '#38bdf8', // Sky
    badgeBg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    borderColor: 'border-sky-500/40',
    description: 'Одежда разведчиков и лучников. Позволяет уклоняться от режущих ударов и осады, но беззащитна против стрел.',
    lore: 'Лёгкая кожа и гибкий шёлк гасят инерцию тяжелых лезвий, но легко прокалываются острием стрел.',
    typicalArmor: ['Кожаные доспехи', 'Мантии следопытов', 'Лёгкие куртки'],
    strongAgainst: ['Режущий (60%)', 'Осадный (60%)'],
    vulnerableTo: ['Колющий (175%)']
  },
  medium: {
    id: 'medium',
    name: 'Средняя',
    shortName: 'Средняя',
    icon: '🧥',
    color: '#eab308', // Amber
    badgeBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    borderColor: 'border-amber-500/40',
    description: 'Сбалансированная боевая экипировка. Превосходно защищает от тайной магии, но пробивается режущими мечами.',
    lore: 'Плотная дублёная кожа и кольчатые вставки отражают магические всплески и рассеивают камни катапульт.',
    typicalArmor: ['Кольчуга', 'Дублёный доспех стража', 'Бригантина'],
    strongAgainst: ['Магический (60%)', 'Осадный (60%)'],
    vulnerableTo: ['Режущий (175%)']
  },
  heavy: {
    id: 'heavy',
    name: 'Тяжёлая',
    shortName: 'Тяжёлая',
    icon: '🛡️',
    color: '#64748b', // Slate/Iron
    badgeBg: 'bg-slate-400/15 text-slate-200 border-slate-400/30',
    borderColor: 'border-slate-400/40',
    description: 'Массивные стальные латы рыцарей. Неуязвимы для стрел, но отлично проводят пагубную магию.',
    lore: 'Твердая закаленная сталь рикошетит стрелы и болты, но превращается в ловушку при атаках боевых магов.',
    typicalArmor: ['Латные рыцарские доспехи', 'Железный панцирь', 'Гномьи кирасы'],
    strongAgainst: ['Колющий (60%)', 'Осадный (60%)'],
    vulnerableTo: ['Магический (175%)']
  },
  fortified: {
    id: 'fortified',
    name: 'Укреплённая',
    shortName: 'Укрепл.',
    icon: '🏰',
    color: '#8b5cf6', // Indigo/Purple Fort
    badgeBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    borderColor: 'border-indigo-500/40',
    description: 'Каменные башни, крепостные стены и бастионы. Блокирует большую часть урона, кроме осадных орудий.',
    lore: 'Толстая гранитная кладка не чувствует стрел, рубящих топоров и чар магов, но разрушается ядрами катапульт.',
    typicalArmor: ['Стены цитаделей', 'Осадные щиты-бастионы', 'Каменные башни', 'Врата'],
    strongAgainst: ['Магический (40%)', 'Колющий (45%)', 'Режущий (50%)'],
    vulnerableTo: ['Осадный (185%)']
  },
  universal: {
    id: 'universal',
    name: 'Универсальная',
    shortName: 'Универс.',
    icon: '⚜️',
    color: '#ffffff', // White like all defense headers
    badgeBg: 'bg-zinc-800/60 text-white border-zinc-700',
    borderColor: 'border-zinc-700',
    description: 'Специальная сбалансированная защита. Защищает от осадного урона и устраняет катастрофические провалы.',
    lore: 'Смесь эльфийской ткани и адамантиевых пластин. Ровный умеренный профиль взаимодействия.',
    typicalArmor: ['Доспехи древних военачальников', 'Элитная чемпионская экипировка', 'Артефактные сеты'],
    strongAgainst: ['Осадный (60%)'],
    vulnerableTo: ['Магический (125%)', 'Колющий (120%)', 'Режущий (115%)']
  }
};

/**
 * EXACT MATRIX FROM USER SPECIFICATION:
 *
 * Damage \ Defense | Без    | Лёгкая | Средняя | Тяжёлая | Укреплённая | Универсальная
 * Режущий          | 200%   | 60%    | 175%    | 100%    | 50%         | 115%
 * Колющий          | 200%   | 175%   | 100%    | 60%     | 45%         | 120%
 * Магический       | 200%   | 100%   | 60%     | 175%    | 40%         | 125%
 * Осадный          | 200%   | 60%    | 60%     | 60%     | 185%        | 60%
 * Хаос             | 100%   | 100%   | 100%    | 100%    | 100%        | 100%
 */
export const DAMAGE_MATRIX: Record<DamageTypeId, Record<DefenseTypeId, number>> = {
  none: {
    none: 1.0,
    light: 0.2,
    medium: 0.2,
    heavy: 0.2,
    fortified: 0.2,
    universal: 0.2
  },
  slashing: {
    none: 2.0,
    light: 0.6,
    medium: 1.75,
    heavy: 1.0,
    fortified: 0.5,
    universal: 1.15
  },
  piercing: {
    none: 2.0,
    light: 1.75,
    medium: 1.0,
    heavy: 0.6,
    fortified: 0.45,
    universal: 1.2
  },
  magic: {
    none: 2.0,
    light: 1.0,
    medium: 0.6,
    heavy: 1.75,
    fortified: 0.4,
    universal: 1.25
  },
  siege: {
    none: 2.0,
    light: 0.6,
    medium: 0.6,
    heavy: 0.6,
    fortified: 1.85,
    universal: 1.05
  },
  chaos: {
    none: 1.0,
    light: 1.0,
    medium: 1.0,
    heavy: 1.0,
    fortified: 1.0,
    universal: 1.0
  }
};

export const DAMAGE_TYPE_ORDER: DamageTypeId[] = [
  'none',
  'slashing',
  'piercing',
  'magic',
  'siege',
  'chaos'
];

export const DEFENSE_TYPE_ORDER: DefenseTypeId[] = [
  'none',
  'light',
  'medium',
  'heavy',
  'fortified',
  'universal'
];

export function getMultiplierStyle(multiplier: number) {
  if (multiplier >= 2.0) {
    return {
      textColor: 'text-amber-300 font-bold',
      bgColor: 'bg-amber-500/20 hover:bg-amber-500/30',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.25)]',
      meaning: 'Урон увеличен в 2 раза (+100%)',
      category: 'critical'
    };
  }
  if (multiplier >= 1.75) {
    return {
      textColor: 'text-emerald-400 font-semibold',
      bgColor: 'bg-emerald-500/15 hover:bg-emerald-500/25',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      glow: 'shadow-[0_0_10px_rgba(16,185,129,0.2)]',
      meaning: 'Высокое преимущество (+75%..+85%)',
      category: 'advantage'
    };
  }
  if (multiplier > 1.0) {
    return {
      textColor: 'text-cyan-400 font-medium',
      bgColor: 'bg-cyan-500/15 hover:bg-cyan-500/25',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      glow: '',
      meaning: 'Умеренное преимущество (+15%..+25%)',
      category: 'bonus'
    };
  }
  if (multiplier === 1.0) {
    return {
      textColor: 'text-slate-200 font-normal',
      bgColor: 'bg-slate-800/40 hover:bg-slate-800/70',
      badgeBg: 'bg-slate-700/40 text-slate-300 border-slate-600/30',
      glow: '',
      meaning: 'Обычный базовый урон (100%)',
      category: 'neutral'
    };
  }
  if (multiplier >= 0.6) {
    return {
      textColor: 'text-amber-400/90 font-medium',
      bgColor: 'bg-amber-950/20 hover:bg-amber-950/40',
      badgeBg: 'bg-amber-900/30 text-amber-400 border-amber-700/40',
      glow: '',
      meaning: 'Урон снижен (-40%)',
      category: 'reduced'
    };
  }
  return {
    textColor: 'text-rose-400 font-semibold',
    bgColor: 'bg-rose-950/25 hover:bg-rose-950/40',
    badgeBg: 'bg-rose-900/30 text-rose-300 border-rose-700/40',
    glow: '',
    meaning: 'Сильное снижение урона (-50%..-60%)',
    category: 'resisted'
  };
}

export const ARTIFACTS: Artifact[] = [
  {
    id: 'wind_feather',
    name: 'Перо Ветра',
    type: 'Лёгкая защита',
    targetTypeId: 'light',
    category: 'defense',
    costXP: 10,
    image: '/src/assets/images/artifact_wind_feather_1790667865413.jpg',
    fallbackIcon: '🪶',
    rarity: 'Обычный',
    description: 'Невесомое перо великой буревестницы, пропитанное энергией горного ветра. Наделяет доспех невероятной подвижностью.',
    howToGet: 'Падает с воздушных духов на высоте от Y:120 или покупается у Алхимика в Деревне за 10 XP.',
    howToApply: 'Поместите нагрудник и Перо Ветра на Наковальню или нажмите ПКМ в инвентаре для зачарования.',
    statsBonus: 'Устанавливает тип «Лёгкая»: -40% урона от Режущего и Осадного.'
  },
  {
    id: 'guardian_leather',
    name: 'Кожа Стража',
    type: 'Средняя защита',
    targetTypeId: 'medium',
    category: 'defense',
    costXP: 10,
    image: '/src/assets/images/artifact_guardian_leather_1790667875318.jpg',
    fallbackIcon: '🛡️',
    rarity: 'Обычный',
    description: 'Особо выделанная дубленая шкура древнего ящера, усиленная бронзовыми клепками и рунами земли.',
    howToGet: 'Крафтится из 4 пластин кожи свирепого вепря и рунного слитка, либо выдается за победу на 5-й волне CastleFight.',
    howToApply: 'Примените через инвентарь или зачаруйте кольчугу/кожу. Превращает тип защиты в «Среднюю».',
    statsBonus: 'Устанавливает тип «Средняя»: -40% урона от Магии и Осады.'
  },
  {
    id: 'fortified_aegis',
    name: 'Бастионный Эгис',
    type: 'Укреплённая защита',
    targetTypeId: 'fortified',
    category: 'defense',
    costXP: 25,
    image: '/src/assets/images/artifact_fortified_aegis_1790667886350.jpg',
    fallbackIcon: '🏰',
    rarity: 'Эпический',
    description: 'Монолитная каменная плита древней крепости гномов с закаленными железными оковами.',
    howToGet: 'Добывается в Цитадели Големов или куется мастером-кузнецом за 25 XP и 8 гранитных блоков.',
    howToApply: 'Устанавливается во второй слот щита или применяется на защитную башню замка.',
    statsBonus: 'Устанавливает тип «Укреплённая»: -60% урона от Магии, -55% от Стрел, -50% от Режущего.'
  },
  {
    id: 'slicing_rune',
    name: 'Руна Рассечения',
    type: 'Режущий урон',
    targetTypeId: 'slashing',
    category: 'damage',
    costXP: 15,
    image: '',
    fallbackIcon: '⚔️',
    rarity: 'Редкий',
    description: 'Искрящаяся руническая гравировка, придающая кромке оружия идеальную бритвенную остроту.',
    howToGet: 'Сокровищницы подземелий или награда за серию из 10 дуэлей на арене.',
    howToApply: 'Инкрустируется в меч или топор через Алтарь Оружия.',
    statsBonus: 'Накладывает тип «Режущий»: +75% урона по средней броне, +100% по целям без защиты.'
  },
  {
    id: 'sagitta_feather',
    name: 'Оперение Сагитты',
    type: 'Колющий урон',
    targetTypeId: 'piercing',
    category: 'damage',
    costXP: 15,
    image: '',
    fallbackIcon: '🏹',
    rarity: 'Редкий',
    description: 'Аэродинамические перья хищной птицы, превращающие стрелы и наконечники в бронебойные иглы.',
    howToGet: 'Дроп с элитных лучников катакомб или крафт из перьев грифона.',
    howToApply: 'Зачаровывает лук, арбалет или копье на Колющий урон.',
    statsBonus: 'Накладывает тип «Колющий»: +75% урона по лёгкой броне, +20% по универсальной.'
  },
  {
    id: 'arcane_core',
    name: 'Сердце Арканы',
    type: 'Магический урон',
    targetTypeId: 'magic',
    category: 'damage',
    costXP: 20,
    image: '',
    fallbackIcon: '✨',
    rarity: 'Эпический',
    description: 'Пульсирующий эфирный кристалл, преобразующий любые физические удары в сгустки концентрированной магии.',
    howToGet: 'Награда за ритуал полнолуния в Башне Магов или покупка у Архимага за 20 XP.',
    howToApply: 'Активируется на посох, меч или книгу заклинаний.',
    statsBonus: 'Накладывает тип «Магический»: +75% урона по тяжелым латам, +25% по универсальной броне.'
  },
  {
    id: 'demolisher_core',
    name: 'Осадный Молот Сокрушения',
    type: 'Осадный урон',
    targetTypeId: 'siege',
    category: 'damage',
    costXP: 25,
    image: '',
    fallbackIcon: '💥',
    rarity: 'Эпический',
    description: 'Тяжелый противовесный механизм, генерирующий сейсмический импульс при каждом ударе.',
    howToGet: 'Инженерная лаборатория гномов при разблокировке 3-го уровня мастерской.',
    howToApply: 'Устанавливается на осадные тараны, катапульты или тяжелые молоты.',
    statsBonus: 'Накладывает тип «Осадный»: +85% урона по укрепленным стенам и башням.'
  },
  {
    id: 'chaos_crystal',
    name: 'Осколок Хаоса',
    type: 'Урон Хаоса',
    targetTypeId: 'chaos',
    category: 'damage',
    costXP: 50,
    image: '',
    fallbackIcon: '☠️',
    rarity: 'Легендарный',
    description: 'Таинственный фрагмент из-за пределов мира. Игнорирует любые щиты, броню и укрепления противника.',
    howToGet: 'Выпадает с финального босса CastleFight на волне 30+ с шансом 5%.',
    howToApply: 'Финальная трансформация оружия на Алтаре Пустоты.',
    statsBonus: 'Накладывает тип «Хаос»: ровно 100% урона по абсолютно любой броне без исключений.'
  }
];

export const SYSTEM_STEPS: SystemRuleStep[] = [
  {
    step: 1,
    title: 'Получение и экипировка оружия',
    description: 'Игрок берет оружие или юнит призывается на поле боя с базовым значением урона (например, 100 ед.).',
    codeExample: 'BaseDamage = 100',
    icon: '⚔️'
  },
  {
    step: 2,
    title: 'Накладывание типа урона',
    description: 'На оружие накладывается тип урона: Режущий, Колющий, Магический, Осадный или Хаос (через класс, артефакт или руну).',
    codeExample: 'AttackerType = DamageType.SLASHING',
    icon: '🔥'
  },
  {
    step: 3,
    title: 'Определение типа защиты цели',
    description: 'На броню цели (или постройку) накладывается тип защиты: Без защиты, Лёгкая, Средняя, Тяжёлая, Укреплённая или Универсальная.',
    codeExample: 'DefenderArmor = DefenseType.MEDIUM',
    icon: '🛡️'
  },
  {
    step: 4,
    title: 'Взаимодействие двух типов',
    description: 'При ударе серверная система OLDVIBES сопоставляет пару (Урон × Защита) по глобальной матрице коэффициентов.',
    codeExample: 'Multiplier = DAMAGE_MATRIX[AttackerType][DefenderArmor] // 1.75',
    icon: '⚡'
  },
  {
    step: 5,
    title: 'Финальный расчёт урона',
    description: 'Базовый урон умножается на вычисленный коэффициент взаимодействия: Итоговый = Базовый × Множитель.',
    codeExample: 'FinalDamage = Math.round(100 * 1.75) => 175 урона',
    icon: '💥'
  }
];
