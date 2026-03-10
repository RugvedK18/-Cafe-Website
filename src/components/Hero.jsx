import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Play, Star } from 'lucide-react';

const StunningCafeHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 25, damping: 20 });
  
  // 1. Video & Intro Name disappearance
  const introOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const introScale = useTransform(smoothProgress, [0, 0.4], [1, 1.1]);
  const introBlur = useTransform(smoothProgress, [0, 0.3], ["0px", "20px"]);

  // 2. Main Content appearance
  const contentOpacity = useTransform(smoothProgress, [0.4, 0.65], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.35, 0.65], [60, 0]);
  
  // 3. Background & Card Parallax
  const bgScale = useTransform(smoothProgress, [0.4, 1], [0.95, 1.05]);
  const y1 = useTransform(smoothProgress, [0, 1], [0, -180]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 180]);

  const products = [
    { id: 1, name: "Velvet Espresso", tagline: "RICH • TEXTURED", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80" },
    { id: 2, name: "Silk Cappuccino", tagline: "AIRY • GENTLE", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80" },
  ];

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full bg-[#FAF9F6] text-[#2C2420] overflow-clip">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* STAGE 1: CINEMATIC INTRO */}
        <motion.div 
          style={{ opacity: introOpacity, scale: introScale, filter: `blur(${introBlur})` }}
          className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center bg-[#1A1614]"
        >
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 contrast-125">
            <source src="https://www.pexels.com/download/video/5101684/" type="video/mp4" />
          </video>
          
          <motion.div className="relative z-50 text-center px-6">
             <motion.span 
               initial={{ letterSpacing: "0.2em", opacity: 0, y: 20 }}
               animate={{ letterSpacing: window?.innerWidth < 768 ? "0.8em" : "1.8em", opacity: 1, y: 0 }}
               transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
               className="text-[#FAF9F6] text-4xl md:text-7xl font-light uppercase inline-block bg-gradient-to-b from-white to-[#BC9B82] bg-clip-text text-transparent whitespace-nowrap"
             >
               Aurelia
             </motion.span>
             <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="mt-6 h-[1px] w-20 md:w-32 bg-gradient-to-r from-transparent via-[#BC9B82] to-transparent mx-auto opacity-60" 
             />
          </motion.div>
          
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-12 text-[#FAF9F6] text-[8px] md:text-[9px] tracking-[0.5em] md:tracking-[0.8em] uppercase font-bold"
          >
            Scroll to Reveal
          </motion.div>
        </motion.div>

        {/* STAGE 2: ARTISTIC BACKGROUND */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#FAF9F6]" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[70%] bg-[#E8E2D9] blur-[100px] md:blur-[160px] rounded-full opacity-60" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[60%] h-[50%] bg-[#F3EFE9] blur-[80px] md:blur-[120px] rounded-full opacity-70" />
        </motion.div>

        {/* STAGE 3: FLOATING PARALLAX CARDS (Optimized for Mobile) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[5%] w-[35vw] md:w-[15vw] h-[50vw] md:h-[21vw] max-w-[210px] opacity-40 md:opacity-100">
            <GalleryCard item={products[0]} />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-[10%] right-[5%] w-[40vw] md:w-[17vw] h-[55vw] md:h-[25vw] max-w-[240px] opacity-40 md:opacity-100">
            <GalleryCard item={products[1]} />
          </motion.div>
        </div>

        {/* STAGE 4: REVEALED CONTENT */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-30 h-full w-full flex flex-col items-center justify-center px-6"
        >
          <div className="w-full max-w-6xl text-center">
            <motion.div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-10">
              <div className="h-[1px] w-8 md:w-12 bg-[#BC9B82]/40" />
              <span className="text-[#BC9B82] text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[1em] font-black uppercase whitespace-nowrap">Established 2026</span>
              <div className="h-[1px] w-8 md:w-12 bg-[#BC9B82]/40" />
            </motion.div>

            <h1 className="text-4xl md:text-[8vw] lg:text-[9.5vw] font-serif leading-[0.9] md:leading-[0.82] mb-8 md:mb-12 tracking-tighter text-[#2C2420]">
              <span className="font-light italic block opacity-90 lowercase mb-1 md:mb-2 text-2xl md:text-5xl lg:text-7xl">Redefining the</span>
              <span className="font-bold uppercase block tracking-tighter drop-shadow-sm">Daily Brew</span>
            </h1>

            <p className="text-[#5D544F] text-sm md:text-xl max-w-2xl mx-auto mb-10 md:mb-16 font-light leading-relaxed font-sans opacity-90 px-4">
              Hand-picked micro-lots, roasted with obsessive precision for the curious palate. 
              A sanctuary where chemistry meets craft.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-12 items-center justify-center">
              <MagneticButton className="group relative px-10 md:px-16 py-5 md:py-7 bg-[#2C2420] text-[#FAF9F6] rounded-full overflow-hidden shadow-[0_20px_50px_rgba(44,36,32,0.15)] active:scale-95 transition-all w-full sm:w-auto">
                <span className="relative z-10 text-[10px] md:text-[11px] tracking-[0.3em] md:tracking-[0.4em] font-bold flex items-center justify-center gap-4">
                  RESERVE A TABLE <ArrowUpRight size={18} />
                </span>
                <div className="absolute inset-0 bg-[#BC9B82] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
              </MagneticButton>
              
              <button className="flex items-center gap-4 md:gap-6 group py-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#2C2420]/10 flex items-center justify-center group-hover:bg-[#2C2420] group-hover:border-[#2C2420] transition-all duration-700 shadow-sm">
                  <Play size={16} className="text-[#2C2420] group-hover:text-white fill-current translate-x-0.5" />
                </div>
                <span className="text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] font-bold uppercase text-[#2C2420] opacity-80 group-hover:opacity-100 transition-opacity">Our Process</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* REFINED FOOTER - Hidden on Mobile for clean UI */}
        <div className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-24 flex justify-between items-end z-40">
           <div className="hidden md:block">
            <p className="text-[10px] tracking-[0.5em] text-[#BC9B82] font-black uppercase mb-3 opacity-60">Roast Intensity</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-[3px] w-8 rounded-full ${i < 5 ? 'bg-[#BC9B82]' : 'bg-[#BC9B82]/20'}`} />
              ))}
            </div>
          </div>
          <div className="text-center md:text-right w-full md:w-auto">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-[#BC9B82] uppercase mb-1 font-black">Aurelia Roasters</p>
            <p className="text-[12px] md:text-[13px] text-[#2C2420] font-serif italic opacity-80">Origin • Craft • Community</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryCard = ({ item }) => (
  <motion.div 
    whileHover={{ scale: 1.05, y: -10 }}
    className="group relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white/20"
  >
    <img src={item.image} className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614]/80 via-[#1A1614]/10 to-transparent" />
    <div className="absolute bottom-4 left-4 md:bottom-10 md:left-8">
      <p className="text-[7px] md:text-[9px] tracking-[0.3em] md:tracking-[0.5em] text-[#BC9B82] font-black uppercase mb-1 md:mb-2">{item.tagline}</p>
      <h3 className="text-sm md:text-2xl font-serif italic text-white leading-none">{item.name}</h3>
    </div>
  </motion.div>
);

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    if (window.innerWidth < 768) return; // Disable magnetic effect on mobile
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };
  return (
    <motion.button 
      ref={ref} 
      onMouseMove={handleMouse} 
      onMouseLeave={() => setPosition({ x: 0, y: 0 })} 
      animate={position} 
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default StunningCafeHero;
