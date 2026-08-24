import React from 'react';
import { motion } from 'framer-motion';

interface PendantLightProps {
  className?: string;
}

export const PendantLight: React.FC<PendantLightProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-full overflow-visible flex flex-col items-center pointer-events-none select-none ${className}`}>
      {/* Warm Ambient Illumination Cone spreading smoothly onto the background */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[300px] xs:w-[360px] sm:w-[540px] md:w-[720px] h-[280px] sm:h-[380px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.16) 35%, rgba(247, 244, 238, 0) 70%)',
        }}
      />

      {/* Subtle secondary light pool highlighting headline */}
      <div
        className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[220px] xs:w-[280px] sm:w-[340px] md:w-[480px] h-[140px] sm:h-[180px] pointer-events-none -z-10 filter blur-xl opacity-65"
        style={{
          background:
            'radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(251, 191, 36, 0.22) 50%, transparent 80%)',
        }}
      />

      {/* Animated Swinging Lamp Assembly with shortened rope (lamp pulled high up) */}
      <motion.div
        animate={{
          rotate: [-3.5, 3.5, -3.5],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '50% 0%' }}
        className="relative flex flex-col items-center -mt-14 xs:-mt-16 sm:-mt-22 md:-mt-26"
      >
        <img
          src="https://res.cloudinary.com/dkp6jeboz/image/upload/v1787583775/ChatGPT_Image_Aug_24_2026_04_31_24_PM_3_ycieeq.png"
          alt="ESPACIO Luxury Pendant Light"
          className="w-[125px] h-[170px] xs:w-[145px] xs:h-[195px] sm:w-[170px] sm:h-[230px] md:w-[195px] md:h-[260px] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]"
        />
      </motion.div>
    </div>
  );
};

export default PendantLight;
