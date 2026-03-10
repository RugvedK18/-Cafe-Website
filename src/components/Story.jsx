import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

const StorySection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section 
      ref={containerRef}
      /* Clean Deep Botanical Green Background */
      className="relative bg-[#1A2421] py-20 md:py-24 lg:py-32 overflow-hidden selection:bg-[#C79041]/30"
    >
      {/* Background Texture Only (No Yellow Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Image Section */}
          <motion.div 
            ref={imageRef}
            style={{ y: imageY }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isImageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] group">
                <motion.img 
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1.2 }}
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80"
                  alt="Café Interior"
                  className="w-full h-[500px] md:h-[580px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421]/60 via-transparent to-transparent opacity-80" />
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl max-w-[260px] border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-10 h-10 rounded-full bg-[#C79041] flex items-center justify-center shadow-md shadow-[#C79041]/20"
                    >
                      <Heart size={18} fill="white" className="text-white" />
                    </motion.div>
                    <div>
                      <p className="text-[#0f0b08] font-bold text-xs uppercase tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Since 2010
                      </p>
                      <p className="text-[#8B7355] text-[10px] font-bold uppercase tracking-widest">Small Batch</p>
                    </div>
                  </div>
                  <p className="text-[#4A3C2E] text-[12px] leading-relaxed italic border-l border-[#C79041]/40 pl-3" style={{ fontFamily: "'Lato', sans-serif" }}>
                    "Every cup is a dialogue between the earth and our craft."
                  </p>
                </motion.div>
              </div>

              {/* Signature Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isImageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute -bottom-6 -right-2 lg:-right-8 bg-[#131B19] rounded-2xl p-6 shadow-2xl max-w-[260px] border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                    alt="Owner"
                    className="w-12 h-12 rounded-full object-cover border border-[#C79041]"
                  />
                  <div>
                    <h4 className="bg-[#F2EFE9] font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                      James Morrison
                    </h4>
                    <p className="text-[#C79041] text-[10px] font-bold uppercase tracking-widest">Master Roaster</p>
                  </div>
                </div>
                <div className="opacity-70 h-10">
                  <motion.svg 
                    viewBox="0 0 200 60" 
                    className="w-full h-full"
                    initial={{ pathLength: 0 }}
                    animate={isImageInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 1.2 }}
                  >
                    <motion.path
                      d="M10,40 Q30,10 50,40 T90,40 M95,40 L110,20 L115,40 M120,40 Q130,20 140,40 M145,40 L160,40 M165,40 Q175,30 185,40"
                      fill="none"
                      stroke="#C79041"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Text Content */}
          <motion.div 
            ref={textRef}
            style={{ y: textY }}
            className="relative order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isTextInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-[1px] w-8 bg-[#C79041]/60" />
                <span className="text-[#C79041] text-[10px] tracking-[0.5em] uppercase font-black">
                  Our Story
                </span>
                <div className="h-[1px] w-8 bg-[#C79041]/60" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl text-[#FAF8F3] mb-8 leading-[1.1] tracking-tighter"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Where Passion
                <br />
                <span className="italic font-light text-[#C79041]/70">Meets Purpose</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-6 mb-10"
              >
                <p className="text-[#E0E7E5] text-lg leading-relaxed font-light" style={{ fontFamily: "'Lato', sans-serif" }}>
                  In 2010, we opened our doors with a simple conviction: that <span className="font-bold text-white">exceptional coffee</span> shouldn't be a luxury, but a shared moment of human connection.
                </p>
                <p className="text-[#E0E7E5] text-base leading-relaxed font-light opacity-60" style={{ fontFamily: "'Lato', sans-serif" }}>
                  We navigate the world's most remote hillsides to source beans directly from farmers who treat their soil with the same reverence we treat our roast.
                </p>
              </motion.div>

              {/* Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
                className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-white/10"
              >
                {[
                  { number: "14", label: "Years" },
                  { number: "50K", label: "Cups" },
                  { number: "12", label: "Origins" },
                ].map((stat, index) => (
                  <div key={index}>
                    <h3 className="text-3xl font-bold text-[#FAF8F3] tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {stat.number}<span className="text-[#C79041]">+</span>
                    </h3>
                    <p className="text-[#C79041] text-[9px] font-black uppercase tracking-widest opacity-80">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <motion.a
                  href="#full-story"
                  className="group inline-flex items-center gap-4 text-[#FAF8F3]"
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] relative" style={{ fontFamily: "'Lato', sans-serif" }}>
                    Explore Manifesto
                    <motion.span
                      className="absolute left-0 -bottom-1 h-[2px] bg-[#C79041]"
                      initial={{ width: "0%" }}
                      animate={isTextInView ? { width: "100%" } : {}}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#C79041]/40 flex items-center justify-center group-hover:bg-[#C79041] transition-all duration-300">
                    <ArrowRight size={16} className="group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StorySection;