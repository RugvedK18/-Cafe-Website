import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Coffee, Leaf, Zap, Award } from 'lucide-react';

const PremiumAccordionMenu = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const menuItems = [
    {
      id: 1,
      category: "The Morning Ritual",
      title: "Almond Charcoal Latte",
      price: "7.25",
      icon: <Zap size={18} />,
      details: "Activated charcoal, organic almond milk, and a double shot of our 'Midnight' roast. Earthy, bold, and detoxifying.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
      stats: { caffeine: "High", body: "Medium" }
    },
    {
      id: 2,
      category: "Signature Cold",
      title: "Maple Oak Cold Brew",
      price: "6.50",
      icon: <Coffee size={18} />,
      details: "18-hour cold extraction infused with barrel-aged maple syrup and a hint of smoked sea salt over crystal ice.",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
      stats: { caffeine: "Very High", body: "Heavy" }
    },
    {
      id: 3,
      category: "Botanical Brews",
      title: "Rosemary Honey Flat White",
      price: "5.75",
      icon: <Leaf size={18} />,
      details: "Wildflower honey and fresh rosemary sprigs steamed into micro-foam, layered over a bright Ethiopian espresso.",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80",
      stats: { caffeine: "Medium", body: "Silky" }
    },
    {
      id: 4,
      category: "Reserve Batch",
      title: "Hacienda Geisha Pour",
      price: "12.00",
      icon: <Award size={18} />,
      details: "Rare Geisha beans from Panama. Notes of jasmine, bergamot, and white peach. The sommelier's choice.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      stats: { caffeine: "Medium", body: "Light/Tea-like" }
    }
  ];

  return (
    <section className="min-h-screen md:h-screen w-full bg-[#F5F2ED] flex flex-col md:flex-row overflow-hidden border-y border-[#2C2420]/10">
      {/* Left: Fixed Narrative Section */}
      <div className="w-full md:w-[35%] p-8 md:p-20 flex flex-col justify-between bg-[#FAF9F6] shrink-0">
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#BC9B82] text-[10px] tracking-[0.5em] font-bold uppercase block mb-4 md:mb-6"
          >
            Spring Selection 2026
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2420] leading-[0.9] mb-6 md:mb-8">
            Curated <br /> <span className="italic font-light opacity-70">Excellence.</span>
          </h2>
          <p className="text-[#6B5E55] text-sm leading-relaxed max-w-xs font-light">
            We don't have a thousand options. We have four masterpieces. Updated every season to reflect the best harvests.
          </p>
        </div>

        <div className="hidden md:block space-y-4">
          <div className="h-[1px] w-full bg-[#2C2420]/10" />
          <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-[#2C2420] uppercase">
            <span>Explore Flavors</span>
            <div className="w-8 h-[1px] bg-[#2C2420]" />
          </div>
        </div>
      </div>

      {/* Right: Interactive Accordion Deck */}
      <div className="flex-1 flex flex-col md:flex-row h-[600px] md:h-full">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={false}
            animate={{ 
              flex: expandedIndex === index ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 4) : 1,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setExpandedIndex(index)}
            className={`relative h-full cursor-pointer overflow-hidden border-t md:border-t-0 md:border-l border-[#2C2420]/10 group transition-colors duration-500 ${expandedIndex === index ? '' : 'bg-[#F5F2ED] hover:bg-[#EAE6E1]'}`}
          >
            {/* Background Image (Vibrant & Natural) */}
            <motion.div 
              className="absolute inset-0 z-0"
              animate={{ opacity: expandedIndex === index ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
              {/* Bottom gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/90 via-[#2C2420]/20 to-transparent" />
            </motion.div>

            {/* Title (Visible when collapsed) */}
            <AnimatePresence>
              {expandedIndex !== index && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <p className="md:rotate-[-90deg] whitespace-nowrap text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] font-black uppercase text-[#2C2420]/60 group-hover:text-[#2C2420] transition-colors">
                    {item.category}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-10 text-white">
              <motion.div
                animate={{ 
                  opacity: expandedIndex === index ? 1 : 0,
                  y: expandedIndex === index ? 0 : 20 
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={expandedIndex === index ? "block" : "hidden"}
              >
                <div className="flex items-center gap-3 mb-3 md:mb-4 text-[#BC9B82]">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-full">{item.icon}</div>
                  <span className="text-[10px] tracking-[0.4em] font-bold uppercase">{item.category}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-serif italic mb-3 md:mb-4 leading-tight">{item.title}</h3>
                <p className="text-white/80 text-xs md:text-sm max-w-sm mb-6 md:mb-8 font-light leading-relaxed">
                  {item.details}
                </p>

                <div className="flex items-center gap-8 md:gap-12 mb-8 md:mb-10">
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-white/50 mb-1">Price</p>
                    <p className="text-lg md:text-xl font-serif">${item.price}</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-white/50 mb-1">Body</p>
                    <p className="text-lg md:text-xl font-serif">{item.stats.body}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto bg-white text-[#2C2420] px-8 py-4 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-2xl"
                >
                  Order This Brew <Plus size={14} />
                </motion.button>
              </motion.div>
            </div>

            {/* Item Number Indicator */}
            <div className={`absolute top-6 left-6 md:top-10 md:left-10 text-[10px] font-bold ${expandedIndex === index ? 'text-white/40' : 'text-[#2C2420]/20'}`}>
              0{index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PremiumAccordionMenu;