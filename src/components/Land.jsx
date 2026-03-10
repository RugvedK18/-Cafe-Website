import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const products = [
  { id: 1, name: "Midnight Espresso", tagline: "Intensity 09", description: "A complex profile with notes of dark chocolate and toasted hazelnut. Sourced from the volcanic soils of Guatemala.", price: "$32.00", image: "https://i.pinimg.com/736x/24/e4/6f/24e46f5bc3f515085eef6745c1b936c0.jpg" },
  { id: 2, name: "Cloud Cappuccino", tagline: "Silky Microfoam", description: "Aerated to a specific 65°C to preserve the natural sweetness of the dairy, paired with our signature light roast.", price: "$4.50", image: "https://i.pinimg.com/736x/f4/ec/bb/f4ecbb5b324dafa6bd136ce03fd8fe7a.jpg" },
  { id: 3, name: "Velvet Latte", tagline: "Double Shot", description: "A seamless integration of textured milk and ristretto shots. Designed for those who appreciate the subtler side of coffee.", price: "$4.75", image: "https://i.pinimg.com/1200x/21/f1/80/21f18085f981583b1c0d4867718dc9b1.jpg" },
  { id: 4, name: "Frost Cold Brew", tagline: "18H Steep", description: "Patience in a bottle. Triple-filtered and served over a single crystal-clear ice sphere for zero dilution.", price: "$6.00", image: "https://i.pinimg.com/736x/c4/5b/5f/c45b5f0e455bbe7603bdfdde7b7ef760.jpg" }
];

export default function DesignerCoffeeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollAccumulator = useRef(0);
  const direction = useRef(1);

  const handleTransition = useCallback((newIndex) => {
    if (isScrolling || newIndex === activeIndex) return;
    setIsScrolling(true);
    direction.current = newIndex > activeIndex ? 1 : -1;
    setActiveIndex(newIndex);
    
    // Lock scroll for the duration of the animation for "Snapping" feel
    setTimeout(() => {
      setIsScrolling(false);
      scrollAccumulator.current = 0;
    }, 1200);
  }, [activeIndex, isScrolling]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;
      
      scrollAccumulator.current += e.deltaY;
      
      // Threshold to trigger change (prevents accidental tiny scrolls)
      if (Math.abs(scrollAccumulator.current) > 50) {
        if (scrollAccumulator.current > 0) {
          handleTransition((activeIndex + 1) % products.length);
        } else {
          handleTransition((activeIndex - 1 + products.length) % products.length);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleTransition, activeIndex, isScrolling]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F2EFE9] text-[#1A1A1A] font-sans antialiased">
      
      {/* 1. PARALLAX BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeIndex}
            initial={{ opacity: 0, x: direction.current * 100 }}
            animate={{ opacity: 0.04, x: 0 }}
            exit={{ opacity: 0, x: direction.current * -100 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[25vw] font-serif italic whitespace-nowrap select-none"
          >
            {products[activeIndex].name.split(' ')[0]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* 2. TOP NAV BAR */}
      <nav className="absolute top-0 w-full p-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-[#1A1A1A]" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">The Reserve</span>
        </div>
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
          Scroll to Navigate
        </div>
      </nav>

      <div className="relative h-full max-w-[1600px] mx-auto grid grid-cols-12 items-center px-6 md:px-12">
        
        {/* 3. LEFT CONTENT: TEXT BLOCK */}
        <div className="col-span-12 md:col-span-5 z-20">
          <AnimatePresence mode="wait" custom={direction.current}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#A68966] text-xs font-bold tracking-widest uppercase mb-4 block">
                {products[activeIndex].tagline}
              </span>
              
              <h1 className="text-[10vw] md:text-[85px] leading-[0.9] font-serif mb-8 tracking-tighter">
                {products[activeIndex].name.split(' ').map((word, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4 }}
                className="text-[#1A1A1A] text-base leading-relaxed max-w-sm mb-12 font-light"
              >
                {products[activeIndex].description}
              </motion.p>

              <div className="flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Price</span>
                  <span className="text-2xl font-serif">{products[activeIndex].price}</span>
                </div>
                <button className="group relative flex items-center gap-4 bg-[#1A1A1A] text-white px-10 py-5 rounded-full overflow-hidden">
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest">Order Experience</span>
                  <div className="absolute inset-0 bg-[#A68966] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. RIGHT CONTENT: THE MULTI-CARD STACK */}
        <div className="col-span-12 md:col-span-7 h-[60vh] md:h-full relative flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {products.map((item, index) => {
                const isCenter = index === activeIndex;
                const isNext = index === (activeIndex + 1) % products.length;
                const isPrev = index === (activeIndex - 1 + products.length) % products.length;

                if (!isCenter && !isNext && !isPrev) return null;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, x: direction.current * 200 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.25,
                      scale: isCenter ? 1 : 0.65,
                      x: isCenter ? 0 : isNext ? 380 : -380,
                      rotateY: isCenter ? 0 : isNext ? -15 : 15,
                      zIndex: isCenter ? 20 : 10,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.5, 
                      x: direction.current > 0 ? -500 : 500,
                      transition: { duration: 0.8 }
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-[300px] h-[400px] md:w-[440px] md:h-[620px] cursor-pointer preserve-3d"
                    onClick={() => handleTransition(index)}
                  >
                    <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)] bg-white p-2">
                      <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
                        <motion.img 
                          src={item.image} 
                          className="w-full h-full object-cover"
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 5. DESIGNER CONTROLS */}
      <div className="absolute bottom-12 right-12 flex items-center gap-10 z-50">
        <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              {products.map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    width: activeIndex === i ? 32 : 8,
                    backgroundColor: activeIndex === i ? "#1A1A1A" : "#1A1A1A20"
                  }}
                  className="h-[2px] rounded-full"
                />
              ))}
            </div>
            <span className="text-[10px] font-bold tracking-widest opacity-30 italic">0{activeIndex + 1} / 0{products.length}</span>
        </div>
        
        <div className="h-12 w-[1px] bg-[#1A1A1A]/10" />

        <div className="flex gap-4">
          <button onClick={() => handleTransition((activeIndex - 1 + products.length) % products.length)} className="w-14 h-14 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-white transition-all active:scale-90">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <button onClick={() => handleTransition((activeIndex + 1) % products.length)} className="w-14 h-14 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-white transition-all active:scale-90">
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .preserve-3d { transform-style: preserve-3d; perspective: 1000px; }
      `}</style>
    </div>
  );
}