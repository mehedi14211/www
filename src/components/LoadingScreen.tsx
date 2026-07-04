import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function LoadingScreen({ theme }: { theme: "light" | "midnight" }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds loading simulation
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsVisible(false), 400); // Wait a bit after hitting 100% before fading out
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${theme === 'midnight' ? 'bg-[#0a0a0c] text-white' : 'bg-[#F9FAFB] text-[#111827]'}`}
        >
          <div className="flex flex-col items-center gap-8 w-full max-w-md px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Logo size="md" />
            </motion.div>
            
            <div className="w-full space-y-3">
              <div className={`flex justify-between items-center text-xs font-mono tracking-widest ${theme === 'midnight' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                <span className="uppercase">Initializing Engine</span>
                <span>{progress}%</span>
              </div>
              
              <div className={`h-[2px] w-full rounded-full overflow-hidden ${theme === 'midnight' ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                <motion.div
                  className="h-full bg-[#E10600]" // Using the brand red
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
