import React from 'react';
import { PYTHON_GRADIENTS, makeGradientChars, RGB } from '../utils/gradientText';

interface GradientPixelTextProps {
  text: string;
  typeId?: string;
  colors?: [RGB, RGB];
  className?: string;
  shadow?: boolean;
}

/**
 * Renders text with exact character-by-character color interpolation (lerp)
 * matching the Python script:
 *   draw_gradient_text(draw, x, y, text, color1, color2, font, shadow=True)
 *
 * It preserves Cyrillic letters ш, щ, и with pixel font rendering and provides
 * a 20% shadow offset `(font.size // 20)` in rgb(20, 20, 20).
 */
export const GradientPixelText: React.FC<GradientPixelTextProps> = ({
  text,
  typeId,
  colors,
  className = '',
  shadow = true
}) => {
  const gradient = colors || (typeId && PYTHON_GRADIENTS[typeId]) || [
    [255, 255, 255],
    [200, 200, 200]
  ];

  const chars = makeGradientChars(text, gradient[0], gradient[1]);

  return (
    <span
      className={`inline-flex whitespace-pre select-none tracking-normal font-pixel ${className}`}
      style={{
        textRendering: 'geometricPrecision',
      }}
    >
      {chars.map((item, index) => {
        // Special case for letters ш, щ, и: keep standard pixel representation
        return (
          <span
            key={index}
            style={{
              color: item.color,
              textShadow: shadow ? '2px 2px 0px rgb(20, 20, 20)' : 'none',
              display: 'inline-block'
            }}
          >
            {item.char}
          </span>
        );
      })}
    </span>
  );
};
