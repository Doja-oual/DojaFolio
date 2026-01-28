import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SimpleAvatar = () => {
  const [currentOutfit, setCurrentOutfit] = useState(0);

  // Your actual avatar images
  const avatars = [
    {
      id: 0,
      name: "Developer Mode",
      image: "/images/3L3A1411_cleaned_and_retouched.jpg",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 1,
      name: "Creative Mode",
      image: "/images/3L3A1426retouched_.jpg",
      gradient: "from-grey-600 to-orange-500"
    }
  ];

  const handleClick = () => {
    setCurrentOutfit((prev) => (prev + 1) % avatars.length);
  };

  const currentAvatar = avatars[currentOutfit];

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        onClick={handleClick}
        className="relative cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentAvatar.gradient} blur-2xl opacity-30 rounded-full group-hover:opacity-50 transition-opacity duration-300`}></div>

        {/* Avatar Container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOutfit}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="w-full h-full"
            >
              <img
                src={currentAvatar.image}
                alt={currentAvatar.name}
                className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-primary-orange-500/30 group-hover:border-primary-orange-500 transition-colors duration-300"
              />
            </motion.div>
          </AnimatePresence>

          {/* Click Indicator */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-primary-grey-400 bg-primary-black-900/80 px-4 py-2 rounded-full backdrop-blur-sm border border-primary-grey-700"
          >
            Click to change outfit
          </motion.div>
        </div>
      </motion.div>

      {/* Outfit Name */}
      <motion.div
        key={currentAvatar.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p className="text-lg font-medium text-primary-orange-500 mb-1">
          {currentAvatar.name}
        </p>
        <p className="text-xs text-primary-grey-500">
          {currentOutfit + 1} / {avatars.length}
        </p>
      </motion.div>

      {/* Style Indicator Pills */}
      <div className="flex gap-2">
        {avatars.map((avatar, index) => (
          <motion.button
            key={avatar.id}
            onClick={() => setCurrentOutfit(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentOutfit
                ? 'bg-primary-orange-500 w-8'
                : 'bg-primary-grey-700 hover:bg-primary-grey-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleAvatar;
