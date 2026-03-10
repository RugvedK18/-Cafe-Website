import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Coffee, Cloud, MapPin, Award } from 'lucide-react';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      icon: <Coffee size={20} />,
      title: "Artisanal Roastery",
      desc: "Master roasters treating every bean as a masterpiece in small batches."
    },
    {
      icon: <Cloud size={20} />,
      title: "Micro-Climate Sourcing",
      desc: "Beans grown at specific altitudes where mist creates unparalleled profiles."
    },
    {
      icon: <MapPin size={20} />,
      title: "Direct Origin",
      desc: "Face-to-face farmer relations ensuring transparency and premium pay."
    },
    {
      icon: <Award size={20} />,
      title: "Barista Mastery",
      desc: "Certified sensory experts dedicated to the chemistry of the perfect pour."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="bg-[#F9F6F0] py-12 md:py-16 overflow-hidden selection:bg-[#2D2926] selection:text-[#F9F6F0]">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Header Section with Symmetrical Side Bars */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-[#C79041]/40" />
            <span className="text-[#C79041] text-[10px] font-black uppercase tracking-[0.4em]">
              The Craft
            </span>
            <div className="h-[1px] w-12 bg-[#C79041]/40" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-4xl lg:text-5xl text-[#2D2926] whitespace-nowrap tracking-tighter"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Elevating the <span className="italic font-light">Coffee Ritual</span> through obsessive detail.
          </motion.h2>
        </div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2D2926]/10 text-[#2D2926] group-hover:bg-[#2D2926] group-hover:text-[#F9F6F0] transition-all duration-500">
                  {feature.icon}
                </div>
                <span className="text-[9px] font-bold text-[#C79041]/50 uppercase tracking-widest">0{index + 1}</span>
              </div>
              
              <h3 
                className="text-lg text-[#2D2926] mb-2 font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {feature.title}
              </h3>
              
              <p className="text-[#5E5852] text-xs leading-relaxed mb-4 font-light opacity-80" style={{ fontFamily: "'Lato', sans-serif" }}>
                {feature.desc}
              </p>

              <div className="relative h-[1px] w-full bg-[#2D2926]/5 overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={isInView ? { x: "0%" } : {}}
                  transition={{ duration: 1.2, delay: 0.3 + (index * 0.1) }}
                  className="absolute inset-0 bg-[#C79041]"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;