import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Droplets, Leaf, ArrowRight } from 'lucide-react';

const SignatureBrewsSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const brews = [
    {
      id: 1,
      name: "Midnight Velvet",
      flavor: "Dark chocolate & black cherry",
      price: "5.50",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
      icon: <Flame size={20} />,
      accent: "#4A2818"
    },
    {
      id: 2,
      name: "Golden Hour",
      flavor: "Caramel & vanilla bean",
      price: "6.00",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
      icon: <Sparkles size={20} />,
      accent: "#BC9B82"
    },
    {
      id: 3,
      name: "Arctic Breeze",
      flavor: "Mint & white chocolate",
      price: "5.75",
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80",
      icon: <Droplets size={20} />,
      accent: "#7BA5C8"
    },
    {
      id: 4,
      name: "Forest Whisper",
      flavor: "Hazelnut & oak undertones",
      price: "5.25",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
      icon: <Leaf size={20} />,
      accent: "#5A6A5A"
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#F9F6F0] py-24 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#E8E2D9_0%,transparent_50%)] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-[#BC9B82]" />
            <span className="text-[#BC9B82] text-[10px] tracking-[0.5em] font-black uppercase">Seasonal Reserve</span>
            <span className="h-px w-8 bg-[#BC9B82]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif text-[#2C2420] mb-8"
          >
            The <span className="italic font-light opacity-80">Master</span> Collection
          </motion.h2>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
          {brews.map((brew, idx) => (
            <BrewCard 
              key={brew.id} 
              brew={brew} 
              index={idx} 
              hoveredId={hoveredId}
              isDimmed={hoveredId !== null && hoveredId !== brew.id}
              onHover={() => setHoveredId(brew.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrewCard = ({ brew, index, isDimmed, onHover, onLeave, hoveredId }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        filter: isDimmed ? "blur(4px) grayscale(0.5)" : "blur(0px) grayscale(0)",
        opacity: isDimmed ? 0.4 : 1,
        scale: isDimmed ? 0.95 : 1
      }}
      className="relative h-[550px] w-full cursor-pointer transition-all duration-500"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-[#2C2420] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20">
        <motion.img 
          src={brew.image}
          alt={brew.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ transform: "translateZ(-20px) scale(1.1)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420] via-[#2C2420]/20 to-transparent" />

        <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: brew.accent }}
            >
              {brew.icon}
            </div>
            <span className="text-[10px] tracking-widest font-black text-white/50 uppercase">Origin Select</span>
          </div>

          <h3 className="text-3xl font-serif italic text-white mb-2">{brew.name}</h3>
          <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
            {brew.flavor}
          </p>

          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <span className="text-2xl font-serif text-[#BC9B82]">${brew.price}</span>
            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-white text-[10px] font-black tracking-widest uppercase"
            >
              Discover <ArrowRight size={14} className="text-[#BC9B82]" />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {!isDimmed && hoveredId === brew.id && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -100, x: (i - 3) * 20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="absolute bottom-20 left-1/2 w-1 h-1 rounded-full bg-white/40 blur-[1px]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SignatureBrewsSection;