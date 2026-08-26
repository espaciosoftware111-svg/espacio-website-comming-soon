import React from 'react';
import { motion } from 'framer-motion';

interface PendantLightProps {
  className?: string;
}

export const PendantLight: React.FC<PendantLightProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-full overflow-visible flex flex-col items-center pointer-events-none select-none ${className}`}>
      {/* Animated Swinging Lamp Assembly - Uniform rope length across ALL devices */}
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
        className="relative flex flex-col items-center -mt-4 xs:-mt-6 sm:-mt-8 lg:-mt-10"
      >
        <img
          src="https://res.cloudinary.com/dkp6jeboz/image/upload/v1787583775/ChatGPT_Image_Aug_24_2026_04_31_24_PM_3_ycieeq.png"
          alt="ESPACIO Luxury Pendant Light"
          className="w-[110px] xs:w-[130px] sm:w-[160px] lg:w-[200px] h-[150px] xs:h-[175px] sm:h-[215px] lg:h-[260px] object-contain drop-shadow-[0_14px_32px_rgba(0,0,0,0.25)]"
        />
      </motion.div>
    </div>
  );
};

export default PendantLight;
