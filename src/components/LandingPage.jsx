import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, ArrowRight, Activity } from 'lucide-react';

const GlimpseInsideSection = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // THE TRANSFORMATION: Video starts large and "unlocks" into a card
  const videoWidth = useTransform(scrollYProgress, [0, 0.4], ["95%", "65%"]);
  const videoHeight = useTransform(scrollYProgress, [0, 0.4], ["90vh", "70vh"]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.4], ["0rem", "3rem"]);
  
  // Subtle rotation and blur for that "glimpse" feel
  const videoRotate = useTransform(scrollYProgress, [0, 0.4], [0, -2]);
  const videoBlur = useTransform(scrollYProgress, [0, 0.2, 0.4], ["blur(10px)", "blur(4px)", "blur(0px)"]);
  
  // Text parallax: Comes up as the video shrinks
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] bg-[#0A0908] text-[#F5F2ED]"
    >
      {/* FILM GRAIN - Premium Texture */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://news.files.bbci.co.uk/include/vj-static-assets/film-grain.png')]" />

      {/* STICKY WRAPPER - Keeps video locked while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* THE CINEMATIC WINDOW */}
        <motion.div 
          style={{ 
            width: videoWidth, 
            height: videoHeight, 
            borderRadius: videoRadius,
            rotate: videoRotate,
            filter: videoBlur
          }} 
          className="relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-20 group"
        >
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover scale-110 brightness-[0.5] group-hover:brightness-[0.7] transition-all duration-1000">
            <source src="https://www.pexels.com/download/video/4786576/" type="video/mp4" />
          </video>

          {/* Liquid Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0908]/20 to-[#0A0908]/80" />
          
          {/* Internal Video UI */}
          <div className="absolute inset-0 p-12 flex flex-col justify-between items-start pointer-events-none">
            <motion.div 
               animate={{ opacity: [0.4, 1, 0.4] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="flex items-center gap-3 text-[#D69A3C]"
            >
              <Activity size={16} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Live Roastery Feed</span>
            </motion.div>
            
            <div className="w-full flex justify-between items-end">
               <div className="space-y-1">
                 <p className="text-4xl font-serif italic text-white/90">Batch #702</p>
                 <p className="text-[10px] tracking-widest uppercase text-white/40">Ethiopian Yirgacheffe</p>
               </div>
               <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md">
                 <Play size={20} fill="white" className="ml-1" />
               </div>
            </div>
          </div>
        </motion.div>

        {/* MOUSE FOLLOWING GLOW */}
        <motion.div 
          className="absolute inset-0 z-10 opacity-30 pointer-events-none"
          animate={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(214, 154, 60, 0.1), transparent 80%)`
          }}
        />
      </div>

      {/* CONTENT LAYER - Appears as you scroll down further */}
      <div className="relative z-30 max-w-7xl mx-auto px-12 -mt-[20vh] pb-32">
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="grid grid-cols-1 md:grid-cols-2 gap-24 items-end"
        >
          <div className="space-y-10">
            <div className="h-px w-24 bg-[#D69A3C]" />
            <h2 className="text-6xl md:text-8xl font-serif leading-none tracking-tighter">
              A Glimpse <br />
              <span className="italic font-light opacity-50">Inside the</span> <br />
              Sanctuary.
            </h2>
          </div>

          <div className="space-y-8 pb-4">
            <p className="text-xl text-white/60 font-light leading-relaxed max-w-md">
              Step behind the curtain where fire meets bean. Our master roasters monitor every crack and hue to ensure the velvet texture you've come to expect.
            </p>
            
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-6 group"
            >
              <span className="text-xs font-black tracking-[0.5em] uppercase text-[#D69A3C]">Discover the process</span>
              <div className="w-12 h-px bg-white/20 group-hover:w-24 group-hover:bg-[#D69A3C] transition-all duration-500" />
              <ArrowRight size={18} className="text-[#D69A3C]" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* SIDEBAR DECORATION */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-20 z-40 hidden lg:flex">
         <div className="h-32 w-[1px] bg-white mx-auto" />
         <span className="text-[10px] tracking-[0.5em] uppercase vertical-text font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>Observation Mode</span>
      </div>
    </section>
  );
};

export default GlimpseInsideSection;