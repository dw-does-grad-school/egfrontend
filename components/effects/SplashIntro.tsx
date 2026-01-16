"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_SHOWN_KEY = "splashIntroShown";

// =====================
// MOMA-INSPIRED SPLASH
// =====================
export default function SplashIntro({ 
  duration = 4000, 
  children 
}: { 
  duration?: number; 
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if splash has already been shown this session
    const hasShown = sessionStorage.getItem(SPLASH_SHOWN_KEY);
    
    if (hasShown) {
      // Already shown this session, don't show again
      setShow(false);
      return;
    }
    
    // First time this session, show the splash
    setShow(true);
    sessionStorage.setItem(SPLASH_SHOWN_KEY, "true");
    
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* Subtle geometric background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Minimal grid lines */}
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gray-100" />
              <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gray-100" />
              <div className="absolute left-0 right-0 top-1/3 h-px bg-gray-100" />
              <div className="absolute left-0 right-0 bottom-1/3 h-px bg-gray-100" />
            </motion.div>

            {/* Central content */}
            <div className="relative z-10 flex flex-col items-center gap-12 px-8">
              {/* MoMA-style logo frames */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="relative"
              >
                {/* Minimalist stacked frames */}
                <div className="relative">
                  {/* Back frame */}
                  <motion.div
                    className="absolute -left-8 -top-8 h-40 w-56 border-2 border-black/80"
                    initial={{ x: 0, y: 0 }}
                    animate={{ x: [0, -2, 0], y: [0, -2, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Middle frame */}
                  <motion.div
                    className="absolute -left-4 -top-4 h-40 w-56 border-2 border-black/90"
                    initial={{ x: 0, y: 0 }}
                    animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />
                  
                  {/* Front frame */}
                  <motion.div
                    className="relative h-40 w-56 border-[3px] border-black bg-white"
                    initial={{ x: 0, y: 0 }}
                    animate={{ x: [0, -1, 0], y: [0, 1, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                  >
                    {/* Inner frame detail */}
                    <div className="absolute inset-4 border border-black/20" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Typography - MoMA style */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-center"
              >
                {/* Main title */}
                <motion.h1 
                  className="text-6xl font-light tracking-tight text-black"
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "-0.02em", opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  ECHO
                </motion.h1>
                
                {/* Subtitle */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mx-auto my-4 h-px bg-black"
                />
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="text-sm font-light tracking-[0.3em] text-black/70"
                >
                  Art Curation for the 21st Century and Beyond
                </motion.p>
              </motion.div>

              {/* Minimal loading indicator */}
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 bg-black"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Bottom text - museum style */}
            <motion.div
              className="absolute bottom-12 left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <p className="text-xs font-light tracking-widest text-black/50">
                PREPARING YOUR EXPERIENCE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT BELOW SPLASH */}
      <div
        className={show ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-700"}>
        {children}
      </div>
    </>
  );
}
