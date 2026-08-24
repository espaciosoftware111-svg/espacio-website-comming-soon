import React from 'react';

export interface EspacioMonogramProps {
  size?: number | string;
  variant?: 'silver' | 'gold' | 'dark' | 'white' | 'black' | 'cream';
  animated?: boolean;
  isLightOn?: boolean;
  className?: string;
  glow?: boolean;
  showWordmark?: boolean;
}

export const EspacioMonogram: React.FC<EspacioMonogramProps> = ({
  size = 64,
  variant = 'gold',
  isLightOn = true,
  className = '',
  glow = false,
  showWordmark = false,
}) => {
  const isDarkTheme = variant === 'dark' || variant === 'black';

  const primaryColor =
    variant === 'gold'
      ? '#C5A572'
      : variant === 'dark' || variant === 'black'
      ? '#121316'
      : variant === 'white'
      ? '#FFFFFF'
      : variant === 'cream'
      ? '#F7F4EE'
      : '#E5E7EB';

  const eColor = primaryColor;

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      style={size !== undefined ? { width: size, height: size } : undefined}
    >
      <div
        className="relative flex items-center justify-center w-full h-full"
      >
        {/* Ambient Warm Backlight */}
        {(glow || isLightOn) && (
          <div
            className="absolute inset-0 rounded-2xl filter blur-xl opacity-60 pointer-events-none transition-opacity duration-700"
            style={{
              background:
                variant === 'gold'
                  ? 'radial-gradient(circle, rgba(197,165,114,0.45) 0%, rgba(197,165,114,0) 70%)'
                  : isDarkTheme
                  ? 'radial-gradient(circle at 30% 40%, rgba(255,220,150,0.3) 0%, rgba(0,0,0,0) 65%)'
                  : 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
        )}

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          style={
            isDarkTheme
              ? { filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))' }
              : { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }
          }
        >
          <defs>
            {/* Warm Ambient Lamp Glow Gradient */}
            <radialGradient id="lampWarmGlow" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#DFC28D" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#C5A572" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C5A572" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Upper-Left Horizontal Line (Lamp Top Bar) */}
          <line
            x1="14"
            y1="14"
            x2="44"
            y2="14"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="square"
          />

          {/* 2. Upper-Right Horizontal Line (With clear open gap from X=44 to X=54) */}
          <line
            x1="54"
            y1="14"
            x2="86"
            y2="14"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="square"
          />

          {/* 3. Right Vertical Line */}
          <line
            x1="86"
            y1="14"
            x2="86"
            y2="86"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="square"
          />

          {/* 4. Bottom Horizontal Line */}
          <line
            x1="86"
            y1="86"
            x2="14"
            y2="86"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="square"
          />

          {/* 5. Left Vertical Line (STOPS AT Y=48, PRESERVING OPEN TOP-LEFT CORNER!) */}
          <line
            x1="14"
            y1="86"
            x2="14"
            y2="48"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="square"
          />

          {/* 6. Pendant Lamp (Top-Left Architectural Motif) */}
          <g id="monogram-pendant-lamp">
            {/* Stem dropping from center of upper-left bar (x=29) */}
            <line
              x1="29"
              y1="14"
              x2="29"
              y2="28"
              stroke={primaryColor}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            
            {/* Geometric Conical/Trapezoidal Lampshade */}
            <polygon
              points="25.5,28 32.5,28 38,42 20,42"
              fill={primaryColor}
              stroke={primaryColor}
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Lamp Warm Downward Light Beam & Glow */}
            {isLightOn && (
              <g id="lamp-beam-container">
                {/* Radial Glow underneath shade */}
                <ellipse
                  cx="29"
                  cy="46"
                  rx="14"
                  ry="10"
                  fill="url(#lampWarmGlow)"
                  opacity="0.85"
                />
                {/* Cone Beam */}
                <polygon
                  points="20,42 38,42 48,68 10,68"
                  fill="url(#lampWarmGlow)"
                  opacity="0.75"
                />
                {/* Luminous bulb underside */}
                <ellipse cx="29" cy="42" rx="7" ry="1.6" fill="#FFFCE6" />
                <circle cx="29" cy="42.5" r="2.8" fill="#FFE899" opacity="0.9" />
              </g>
            )}
          </g>

          {/* 7. Geometric Modern Sans-Serif 'E' in Lower-Right Quadrant */}
          <g id="monogram-letter-e">
            {/* E Spine */}
            <line
              x1="58"
              y1="44"
              x2="58"
              y2="78"
              stroke={eColor}
              strokeWidth="4.8"
              strokeLinecap="square"
            />
            {/* E Top arm */}
            <line
              x1="58"
              y1="44"
              x2="76"
              y2="44"
              stroke={eColor}
              strokeWidth="4.8"
              strokeLinecap="square"
            />
            {/* E Middle arm */}
            <line
              x1="58"
              y1="61"
              x2="72"
              y2="61"
              stroke={eColor}
              strokeWidth="4.2"
              strokeLinecap="square"
            />
            {/* E Bottom arm */}
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

      {/* Optional Full Wordmark Lockup Below Monogram */}
      {showWordmark && (
        <div className="mt-4 flex flex-col items-center text-center">
          <span
            className="font-sans font-medium tracking-[0.32em] pl-[0.32em] text-xl sm:text-2xl leading-none"
            style={{ color: primaryColor }}
          >
            ESPACIO
          </span>
          
          {/* Gold Accent Divider Bar with Square Dot */}
          <div className="flex items-center justify-center gap-2 my-2 w-full">
            <span className="w-10 sm:w-14 h-[1.5px] bg-[#C5A572]" />
            <span className="w-1.5 h-1.5 bg-[#C5A572]" />
            <span className="w-10 sm:w-14 h-[1.5px] bg-[#C5A572]" />
          </div>

          <span
            className="text-[9px] sm:text-[10px] font-semibold tracking-[0.32em] pl-[0.32em] uppercase"
            style={{ color: primaryColor }}
          >
            INTERIORS AND MODULAR
          </span>
        </div>
      )}
    </div>
  );
};

export default EspacioMonogram;
