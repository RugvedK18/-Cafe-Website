import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Info, Plus, Star, ArrowDown } from 'lucide-react';

const MenuHeroV2 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth Parallax for background text
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  // REFINED SCALING: Starts at 1, eases to 2.5 (Immersion without distortion)
  // We use a 4-point array to make the start and end of the scale feel "softer"
  const imageScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1.1, 2.4, 2.5]);
  
  // BORDER RADIUS: Gradually softens but doesn't have to hit zero if you want a slight frame
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], [40, 12]);
  
  // UI FADE: Fast fade out for a clean focus on the visual
  const uiOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // OPTIONAL: Slight darken as it scales to make it feel like a transition to a new page
  const overlayDarken = useTransform(scrollYProgress, [0.5, 1], [0.2, 0.5]);

  return (
    <div ref={containerRef} className="relative h-[180vh] bg-[#FAF9F6]">
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. KINETIC BACKGROUND */}
        <motion.div style={{ opacity: uiOpacity }} className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.04] select-none">
          <motion.h2 style={{ x: xLeft }} className="text-[30vw] md:text-[22vw] text-[#BC9B82] font-serif leading-none whitespace-nowrap tracking-tighter">
            AURELIA • ROASTERY • ARCHIVE • AURELIA • ROASTERY
          </motion.h2>
          <motion.h2 style={{ x: xRight }} className="text-[30vw] md:text-[22vw] text-[#2C2420] font-serif leading-none whitespace-nowrap italic tracking-tighter">
            COLLECTION • 2026 • SELECTION • COLLECTION • 2026
          </motion.h2>
        </motion.div>

        {/* 2. CENTER CONTENT */}
        <div className="relative z-10 flex flex-col items-center w-full px-4 md:px-6">
          
          <motion.div style={{ opacity: uiOpacity }} className="mb-4 md:mb-6 px-4 md:px-5 py-2 bg-white/50 backdrop-blur-md border border-[#BC9B82]/20 rounded-full flex items-center gap-3 shadow-sm">
            <Star size={10} className="text-[#BC9B82] fill-[#BC9B82]" />
            <span className="text-[8px] md:text-[9px] tracking-[0.3em] font-black uppercase text-[#2C2420]">The Sensory Experience</span>
          </motion.div>

          <div className="text-center relative w-full">
            <motion.h1 
              style={{ opacity: uiOpacity }}
              className="text-[18vw] md:text-[12rem] font-serif text-[#2C2420] leading-[0.8] md:leading-[0.75] tracking-tight relative z-20"
            >
              Curated <br /> 
              <span className="text-[#BC9B82] italic font-light">Selections.</span>
            </motion.h1>
            
            {/* TRANSFORMING IMAGE */}
            <motion.div 
              style={{ 
                scale: imageScale,
                borderRadius: borderRadius,
              }}
              transition={{ ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 md:w-[450px] aspect-[4/5] md:aspect-video overflow-hidden border-[6px] md:border-[16px] border-[#FAF9F6] shadow-[0_30px_80px_rgba(0,0,0,0.08)] z-10"
            >
              <img 
                src="https://i.pinimg.com/1200x/a1/a2/a0/a1a2a038e7c83f95b5388f545af0669a.jpg" 
                alt="Coffee focus" 
                className="w-full h-full object-cover"
              />
              <motion.div 
                style={{ opacity: overlayDarken }}
                className="absolute inset-0 bg-[#2C2420]" 
              />
            </motion.div>
          </div>

          {/* ACTION BUTTONS */}
          <motion.div 
            style={{ opacity: uiOpacity }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-16 mt-12 md:mt-24 w-full justify-center"
          >
            <div className="group cursor-pointer flex items-center gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#2C2420]/10 flex items-center justify-center group-hover:bg-[#2C2420] group-hover:text-white transition-all duration-500 shadow-sm">
                <Info size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#2C2420]">Our Process</span>
                <span className="text-[10px] md:text-[11px] text-[#6B5E55] font-light">Seed to Soul Philosophy</span>
              </div>
            </div>

            <div className="group cursor-pointer flex items-center gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#BC9B82] text-white flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg shadow-[#BC9B82]/20">
                <Plus size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#2C2420]">Reserve Table</span>
                <span className="text-[10px] md:text-[11px] text-[#6B5E55] font-light">Skip the Queue</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SCROLL DISCOVERY */}
        <motion.div style={{ opacity: uiOpacity }} className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-2 md:gap-3">
          <span className="text-[7px] md:text-[8px] tracking-[0.4em] font-bold uppercase text-[#2C2420]/40">Scroll to Explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-[#BC9B82]">
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>

        <div className="absolute inset-2 md:inset-4 border border-[#2C2420]/5 pointer-events-none rounded-[20px] md:rounded-[32px]" />
      </section>
    </div>
  );
};

export default MenuHeroV2;