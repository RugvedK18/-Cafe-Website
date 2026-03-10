import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#FAF9F6] pt-24 pb-12 px-6 md:px-12 border-t border-[#2C2420]/5 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-[#E8E2D9] blur-[120px] rounded-full opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group">
              <span className="text-3xl font-serif tracking-widest uppercase text-[#2C2420]">Aurelia</span>
              <div className="h-[1px] w-full bg-[#BC9B82] scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
            <p className="text-[#6B5E55] text-sm font-light leading-relaxed max-w-xs">
              Crafting sensory experiences through micro-batch roasting and botanical infusion since 2026.
            </p>
            <div className="flex gap-5">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -3, color: '#BC9B82' }}
                  href="#" 
                  className="text-[#2C2420]/40 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-[#BC9B82]">Navigate</h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-sm text-[#2C2420]/70 hover:text-[#2C2420] transition-colors flex items-center gap-2 group"
                  >
                    {item}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-[#BC9B82]">Visit Us</h4>
            <div className="space-y-4 text-sm text-[#2C2420]/70 font-light">
              <p>124 Artisan Way,<br />Pusad, Maharashtra</p>
              <p>Mon — Sun: 08:00 - 20:00</p>
              <p className="pt-2 text-[#2C2420] font-medium underline underline-offset-4">hello@aurelia.com</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-[#BC9B82]">Join the Club</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-[#2C2420]/10 py-3 text-sm focus:outline-none focus:border-[#BC9B82] transition-colors placeholder:text-[#2C2420]/20"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#BC9B82] hover:text-[#2C2420] transition-colors">
                <Mail size={18} />
              </button>
            </div>
            <p className="text-[10px] text-[#2C2420]/40 italic">Receive brewing guides & first-harvest alerts.</p>
          </div>
        </div>

        {/* BOTTOM ANIMATED LOGO SECTION */}
        <div className="relative border-t border-[#2C2420]/5 pt-12 overflow-hidden">
          <motion.div 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-[15vw] leading-none font-serif text-[#2C2420]/5 uppercase tracking-tighter select-none">
              Aurelia
            </h1>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
            <p className="text-[9px] tracking-[0.3em] font-bold uppercase text-[#2C2420]/40">
              © {currentYear} Aurelia Roasters. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-[9px] tracking-[0.3em] font-bold uppercase text-[#2C2420]/40">
              <a href="#" className="hover:text-[#BC9B82] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#BC9B82] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;