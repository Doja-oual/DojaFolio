import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveAvatar = () => {
  const [currentOutfit, setCurrentOutfit] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const outfits = [
    {
      id: 0,
      name: "Developer Mode",
      colors: {
        shirt: "#f97316",
        pants: "#212529",
        shoes: "#0d0f10"
      }
    },
    {
      id: 1,
      name: "Creative Mode",
      colors: {
        shirt: "#6b7280",
        pants: "#f97316",
        shoes: "#212529"
      }
    },
    {
      id: 2,
      name: "Professional Mode",
      colors: {
        shirt: "#212529",
        pants: "#4b5563",
        shoes: "#0d0f10"
      }
    },
    {
      id: 3,
      name: "Stylish Mode",
      colors: {
        shirt: "#ea580c",
        pants: "#1f2937",
        shoes: "#f97316"
      }
    }
  ];

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentOutfit((prev) => (prev + 1) % outfits.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const outfit = outfits[currentOutfit];

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        onClick={handleClick}
        className="relative cursor-pointer select-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Avatar Container */}
        <svg
          width="200"
          height="280"
          viewBox="0 0 200 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Shadow */}
          <ellipse cx="100" cy="265" rx="60" ry="10" fill="#000000" opacity="0.2" />

          {/* Body */}
          <AnimatePresence mode="wait">
            <motion.g
              key={`body-${currentOutfit}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Legs/Pants */}
              <motion.rect
                x="70"
                y="160"
                width="25"
                height="80"
                rx="10"
                fill={outfit.colors.pants}
                animate={{ fill: outfit.colors.pants }}
                transition={{ duration: 0.3 }}
              />
              <motion.rect
                x="105"
                y="160"
                width="25"
                height="80"
                rx="10"
                fill={outfit.colors.pants}
                animate={{ fill: outfit.colors.pants }}
                transition={{ duration: 0.3 }}
              />

              {/* Shoes */}
              <motion.ellipse
                cx="82"
                cy="245"
                rx="18"
                ry="10"
                fill={outfit.colors.shoes}
                animate={{ fill: outfit.colors.shoes }}
                transition={{ duration: 0.3 }}
              />
              <motion.ellipse
                cx="118"
                cy="245"
                rx="18"
                ry="10"
                fill={outfit.colors.shoes}
                animate={{ fill: outfit.colors.shoes }}
                transition={{ duration: 0.3 }}
              />

              {/* Torso/Shirt */}
              <motion.rect
                x="60"
                y="90"
                width="80"
                height="75"
                rx="15"
                fill={outfit.colors.shirt}
                animate={{ fill: outfit.colors.shirt }}
                transition={{ duration: 0.3 }}
              />

              {/* Arms */}
              <motion.rect
                x="35"
                y="95"
                width="20"
                height="60"
                rx="10"
                fill={outfit.colors.shirt}
                animate={{ fill: outfit.colors.shirt }}
                transition={{ duration: 0.3 }}
              />
              <motion.rect
                x="145"
                y="95"
                width="20"
                height="60"
                rx="10"
                fill={outfit.colors.shirt}
                animate={{ fill: outfit.colors.shirt }}
                transition={{ duration: 0.3 }}
              />

              {/* Hands */}
              <circle cx="45" cy="155" r="12" fill="#9ca3af" />
              <circle cx="155" cy="155" r="12" fill="#9ca3af" />
            </motion.g>
          </AnimatePresence>

          {/* Head (stays consistent) */}
          <circle cx="100" cy="50" r="35" fill="#9ca3af" />

          {/* Hair */}
          <motion.path
            d="M 65 35 Q 70 15, 100 20 Q 130 15, 135 35 Q 130 25, 100 30 Q 70 25, 65 35 Z"
            fill="#0d0f10"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Eyes */}
          <motion.circle
            cx="85"
            cy="45"
            r="4"
            fill="#0d0f10"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.circle
            cx="115"
            cy="45"
            r="4"
            fill="#0d0f10"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Smile */}
          <motion.path
            d="M 85 60 Q 100 68, 115 60"
            stroke="#0d0f10"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ["M 85 60 Q 100 68, 115 60", "M 85 60 Q 100 70, 115 60", "M 85 60 Q 100 68, 115 60"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />

          {/* Accessory: Glasses (animated) */}
          <AnimatePresence>
            {currentOutfit === 0 && (
              <motion.g
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <rect x="75" y="40" width="18" height="14" rx="3" fill="none" stroke="#f97316" strokeWidth="2" />
                <rect x="107" y="40" width="18" height="14" rx="3" fill="none" stroke="#f97316" strokeWidth="2" />
                <line x1="93" y1="47" x2="107" y2="47" stroke="#f97316" strokeWidth="2" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Accessory: Cap (animated) */}
          <AnimatePresence>
            {currentOutfit === 1 && (
              <motion.g
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ellipse cx="100" cy="20" rx="40" ry="8" fill="#f97316" />
                <rect x="85" y="15" width="30" height="15" rx="5" fill="#f97316" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Click indicator */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-primary-grey-400 flex items-center gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Click me!</span>
        </motion.div>
      </motion.div>

      {/* Outfit Name Display */}
      <motion.div
        key={outfit.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-center"
      >
        <p className="text-sm font-medium text-primary-orange-500">{outfit.name}</p>
        <p className="text-xs text-primary-grey-500 mt-1">
          {currentOutfit + 1} / {outfits.length}
        </p>
      </motion.div>
    </div>
  );
};

export default InteractiveAvatar;
