import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Beaker, Wind, Droplets, Sparkles } from 'lucide-react';

const BotanicalAlchemy = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]); 
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]); 
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const qualities = [
    {
      icon: <Wind size={18} />,
      title: "Oxygen Control",
      desc: "Low-pressure roasting preserves volatile aromatic oils."
    },
    {
      icon: <Droplets size={18} />,
      title: "Soft Extraction",
      desc: "92°C balanced water ensures sweetness without bitterness."
    },
    {
      icon: <Beaker size={18} />,
      title: "Botanical Infusion",
      desc: "Fresh herbs layered into the steam cycle for a velvet finish."
    }
  ];

  return (
    <section className="relative py-12 md:py-20 px-4 sm:px-6 overflow-hidden bg-[#FAF9F6]">
      {/* Decorative Parallax Element */}
      <motion.div style={{ y: y1, rotate }} className="absolute top-10 right-[5%] opacity-10 hidden lg:block">
        <div className="w-20 h-20 border border-[#BC9B82] rounded-full flex items-center justify-center p-5">
            <Sparkles className="text-[#BC9B82] w-full h-full" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Visual Composition */}
        <div className="relative group order-2 lg:order-1">
          {/* Reduced Image Height: aspect-video on mobile, aspect-[4/3] on desktop */}
          <div className="relative aspect-video lg:aspect-[4/3] max-h-[400px] lg:max-h-[500px] overflow-hidden rounded-xl shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80" 
               alt="Barista precision" 
               className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-[#2C2420]/5 mix-blend-multiply" />
          </div>
          
          {/* Parallax Card - Hidden on small mobile for cleaner UI */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute -bottom-4 -right-2 hidden sm:block bg-white p-4 lg:p-6 shadow-xl rounded-lg max-w-[200px] lg:max-w-[240px] border border-[#BC9B82]/10 z-10"
          >
            <span className="text-[8px] lg:text-[9px] font-black tracking-[0.4em] uppercase text-[#BC9B82] block mb-2">Laboratory Note</span>
            <p className="text-[11px] lg:text-xs font-serif italic text-[#2C2420] leading-relaxed">
              "The chemistry of the infusion defines the soul of the cup."
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="space-y-8 lg:space-y-10 order-1 lg:order-2 text-center lg:text-left">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#BC9B82] text-[9px] lg:text-[10px] tracking-[0.4em] font-bold uppercase block"
            >
              The Science of Taste
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C2420] leading-[1.1]">
              Botanical <br className="hidden lg:block" /> 
              <span className="italic font-light opacity-60">Alchemy.</span>
            </h2>
            <p className="text-[#6B5E55] text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              We approach coffee as a master chemist approaches a perfume. By controlling every variable, we transform a habit into a ritual.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-6">
            {qualities.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-center lg:items-start group"
              >
                <div className="flex-shrink-0 p-2.5 bg-white text-[#BC9B82] rounded-full shadow-sm group-hover:bg-[#BC9B82] group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-[#2C2420] mb-1">{item.title}</h4>
                  <p className="text-[11px] lg:text-sm text-[#6B5E55] font-light leading-snug lg:leading-relaxed max-w-[200px] lg:max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BotanicalAlchemy;