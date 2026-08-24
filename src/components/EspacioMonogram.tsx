import React from 'react';
import { motion } from 'framer-motion';

interface EspacioMonogramProps {
  size?: number | string;
  variant?: 'silver' | 'gold' | 'dark' | 'white';
  animated?: boolean;
  isLightOn?: boolean;
  className?: string;
  glow?: boolean;
}

export const EspacioMonogram: React.FC<EspacioMonogramProps> = ({
  size = 64,
  variant = 'gold',
  animated = false,
  isLightOn = false,
  className = '',
  glow = false,
}) => {
  const primaryColor =
    variant === 'gold'
      ? '#C5A572'
      : variant === 'dark'
      ? '#121316'
      : variant === 'white'
      ? '#FFFFFF'
      : '#E5E7EB';

  const eColor =
    variant === 'gold'
      ? '#C5A572'
      : variant === 'dark'
      ? '#121316'
      : '#FFFFFF';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full filter blur-xl opacity-50 pointer-events-none transition-opacity duration-700"
          style={{
            background:
              variant === 'gold'
                ? 'radial-gradient(circle, rgba(197,165,114,0.45) 0%, rgba(197,165,114,0) 70%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <radialGradient id="monogramBeam" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="#FFF8E7" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#DFC28D" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#C5A572" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C5A572" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Upper-Left Horizontal Line */}
        <line
          x1="14"
          y1="14"
          x2="42"
          y2="14"
          stroke={primaryColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* 2. Upper-Right Horizontal Line (With clear open gap from X=42 to X=54) */}
        <line
          x1="54"
          y1="14"
          x2="86"
          y2="14"
          stroke={primaryColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* 3. Right Vertical Line */}
        <line
          x1="86"
          y1="14"
          x2="86"
          y2="86"
          stroke={primaryColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* 4. Bottom Horizontal Line */}
        <line
          x1="86"
          y1="86"
          x2="14"
          y2="86"
          stroke={primaryColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* 5. Left Vertical Line (STOPS AT Y=50, PRESERVING OPEN TOP-LEFT CORNER!) */}
        <line
          x1="14"
          y1="86"
          x2="14"
          y2="50"
          stroke={primaryColor}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* 6. Pendant Light (Top-Left Architectural Floor/Pendant Motif) */}
        <g id="monogram-pendant">
          {/* Stem */}
          <line
            x1="28"
            y1="14"
            x2="28"
            y2="28"
            stroke={primaryColor}
            strokeWidth="2.0"
            strokeLinecap="round"
          />
          {/* Small finial connector */}
          <circle cx="28" cy="28" r="1.5" fill={primaryColor} />
          {/* Geometric Downward-Facing Trapezoidal Lampshade */}
          <polygon
            points="25,29 31,29 36,42 20,42"
            fill={primaryColor}
            stroke={primaryColor}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Light Glow Cone (Active when isLightOn is true) */}
          {isLightOn && (
            <g opacity="0.9">
              <polygon points="20,42 36,42 46,78 10,78" fill="url(#monogramBeam)" />
              <ellipse cx="28" cy="42" rx="5" ry="1.2" fill="#FFFBEA" />
              <circle cx="28" cy="43" r="3" fill="#FFEAA7" opacity="0.9" />
            </g>
          )}
        </g>

        {/* 7. Bold Geometric Sans-Serif 'E' in Lower-Right Quadrant WITH CLEAR GAPS FROM RIGHT & BOTTOM LINES */}
        <g id="monogram-letter-e">
          {/* E Spine */}
          <line
            x1="58"
            y1="46"
            x2="58"
            y2="78"
            stroke={eColor}
            strokeWidth="4.8"
            strokeLinecap="square"
          />
          {/* E Top arm */}
          <line
            x1="58"
            y1="46"
            x2="76"
            y2="46"
            stroke={eColor}
            strokeWidth="4.8"
            strokeLinecap="square"
          />
          {/* E Middle arm */}
          <line
            x1="58"
            y1="62"
            x2="72"
            y2="62"
            stroke={eColor}
            strokeWidth="4.2"
            strokeLinecap="square"
          />
          {/* E Bottom arm (has clean 8px gap above bottom frame line 86, and 10px gap from right frame line 86) */}
          <line
            x1="58"
            y1="78"
            x2="76"
            y2="78"
            stroke={eColor}
            strokeWidth="4.8"
            strokeLinecap="square"
          />
        </g>
      </svg>
    </div>
  );
};

export default EspacioMonogram;
