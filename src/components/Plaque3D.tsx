import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EspacioMonogram } from './EspacioMonogram';
import { Sparkles, Eye, ShieldCheck } from 'lucide-react';
import { playTactileClick } from '../utils/audio';

interface Plaque3DProps {
  className?: string;
}

export const Plaque3D: React.FC<Plaque3DProps> = ({ className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  
  // Specular sheen coordinates
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentMouseX = (e.clientX - rect.left) / width - 0.5;
    const currentMouseY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleInspect = () => {
    playTactileClick();
    setIsInspecting(!isInspecting);
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Canvas Container with Perspective */}
      <div
        className="w-full max-w-[420px] aspect-[1/1.22] sm:aspect-[1/1.2] relative perspective-[1200px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            scale: isInspecting ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full rounded-[24px] cursor-grab active:cursor-grabbing p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-shadow duration-500"
        >
          {/* Base Layer: Dark Slate / Leather Grain Texture Background */}
          <div
            className="absolute inset-0 rounded-[24px] bg-[#0C0D10] border border-white/10"
            style={{
              boxShadow: `
                0 30px 60px -15px rgba(0, 0, 0, 0.7),
                0 15px 30px -10px rgba(0, 0, 0, 0.5),
                inset 0 1px 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 4px 0 rgba(0, 0, 0, 0.8),
                0 0 0 1px rgba(20, 22, 28, 0.8)
              `,
              backgroundImage: `
                radial-gradient(circle at 50% 30%, #171920 0%, #0C0D10 70%, #060708 100%)
              `,
            }}
          />

          {/* Micro Leather/Brushed Slate Grain Overlay */}
          <div
            className="absolute inset-0 rounded-[24px] opacity-25 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
              backgroundSize: '4px 4px',
            }}
          />

          {/* Dynamic Metallic Specular Light Glare (Follows Cursor) */}
          <motion.div
            className="absolute inset-0 rounded-[24px] pointer-events-none opacity-60 mix-blend-screen transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${sheenX.get()}% ${sheenY.get()}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 75%)`,
            }}
          />

          {/* Chamfered Metallic Edge Bevel Glow */}
          <div className="absolute inset-[2px] rounded-[22px] border border-white/10 pointer-events-none" />

          {/* 4 Architectural Corner Standoff Screws */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-300 via-neutral-600 to-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center">
            <div className="w-2 h-[1px] bg-neutral-950/80 rotate-45" />
          </div>
          <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-300 via-neutral-600 to-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center">
            <div className="w-2 h-[1px] bg-neutral-950/80 -rotate-12" />
          </div>
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-300 via-neutral-600 to-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center">
            <div className="w-2 h-[1px] bg-neutral-950/80 rotate-12" />
          </div>
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-300 via-neutral-600 to-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center">
            <div className="w-2 h-[1px] bg-neutral-950/80 -rotate-45" />
          </div>

          {/* Top Plaque Header: Brand Authentication Seal */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="relative z-10 flex items-center justify-between pt-1"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[9px] tracking-widest text-neutral-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-luxury-gold" />
              <span>OFFICIAL EMBLEM</span>
            </div>
            <span className="text-[10px] tracking-widest text-neutral-500 font-serif">
              HYDERABAD
            </span>
          </div>

          {/* Center: The Physical Embossed Monogram with Foil Finish */}
          <div
            style={{ transform: 'translateZ(50px)' }}
            className="relative z-10 flex flex-col items-center justify-center my-auto py-2"
          >
            <div className="relative group/emblem p-3 rounded-2xl">
              <EspacioMonogram
                size={110}
                variant="silver"
                glow={isHovered}
                className="transition-transform duration-300 group-hover/emblem:scale-105"
              />

              {/* Embossed depth shadow beneath monogram */}
              <div className="absolute inset-0 rounded-2xl filter blur-sm opacity-40 -z-10 bg-black translate-y-3" />
            </div>

            {/* Plaque Typography with Metallic Foil Reflections */}
            <div className="mt-5 text-center flex flex-col items-center">
              <h2 className="font-sans text-2xl sm:text-3xl tracking-[0.32em] pl-[0.32em] font-medium bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                ESPACIO
              </h2>

              {/* Gold Accent Divider Bar with Center Square */}
              <div className="flex items-center justify-center gap-2 w-32 my-2.5">
                <span className="flex-1 h-[1.5px] bg-[#C5A572] shadow-[0_0_8px_rgba(197,165,114,0.6)]" />
                <span className="w-1.5 h-1.5 bg-[#C5A572] shadow-[0_0_8px_rgba(197,165,114,0.8)]" />
                <span className="flex-1 h-[1.5px] bg-[#C5A572] shadow-[0_0_8px_rgba(197,165,114,0.6)]" />
              </div>

              <p className="text-[10px] tracking-[0.32em] pl-[0.32em] uppercase font-semibold text-neutral-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                INTERIORS AND MODULAR
              </p>
              
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent my-2" />
              
              <p className="font-editorial italic text-xs tracking-wider text-neutral-300">
                Designing Spaces, Defining Lifestyles
              </p>
            </div>
          </div>

          {/* Bottom Plaque Footer: Studio Specification Mark */}
          <div
            style={{ transform: 'translateZ(25px)' }}
            className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[9px] text-neutral-400 font-mono tracking-wider"
          >
            <span>AZIZNAGAR STUDIO</span>
            <span className="text-luxury-gold">40+ YRS HERITAGE</span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Controls & 3D Hint */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={toggleInspect}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-luxury-beige-dark border border-luxury-beige-border text-xs text-luxury-charcoal hover:text-luxury-gold hover:border-luxury-gold/50 transition-colors shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isInspecting ? 'Standard View' : 'Inspect 3D Metal Finish'}</span>
        </button>
        <span className="text-[11px] text-luxury-charcoal-muted flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-luxury-gold" />
          <span>Move cursor to tilt plaque</span>
        </span>
      </div>
    </div>
  );
};
