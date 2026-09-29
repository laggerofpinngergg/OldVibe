// Exactly matching Python script GRADIENTS dictionary:
// GRADIENTS = {
//     "Без урона":   ((180, 180, 180), (120, 120, 120)),
//     "Режущий":     ((100, 140, 255), (60, 80, 220)),
//     "Колющий":     ((40, 255, 100),  (0, 160, 50)),
//     "Магический":  ((244, 84, 227),  (149, 84, 182)),
//     "Осадный":     ((255, 220, 40),  (200, 110, 0)),
//     "Хаос":        ((255, 100, 100), (180, 30, 30)),
// }

export type RGB = [number, number, number];

export const PYTHON_GRADIENTS: Record<string, [RGB, RGB]> = {
  'none': [[180, 180, 180], [120, 120, 120]],       // "Без урона"
  'slashing': [[100, 140, 255], [60, 80, 220]],     // "Режущий"
  'piercing': [[40, 255, 100], [0, 160, 50]],       // "Колющий"
  'magic': [[244, 84, 227], [149, 84, 182]],        // "Магический"
  'siege': [[255, 220, 40], [200, 110, 0]],         // "Осадный"
  'chaos': [[255, 100, 100], [180, 30, 30]],        // "Хаос"
};

export function lerpColor(c1: RGB, c2: RGB, t: number): RGB {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

export interface GradientChar {
  char: string;
  color: string;
}

export function makeGradientChars(text: string, color1: RGB, color2: RGB): GradientChar[] {
  if (text.length <= 1) {
    return [{ char: text, color: `rgb(${color1.join(',')})` }];
  }
  const chars: GradientChar[] = [];
  for (let i = 0; i < text.length; i++) {
    const t = i / (text.length - 1);
    const rgb = lerpColor(color1, color2, t);
    chars.push({
      char: text[i],
      color: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    });
  }
  return chars;
}
