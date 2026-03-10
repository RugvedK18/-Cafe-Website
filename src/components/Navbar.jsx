import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'py-4 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#2C2420]/5' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center">
        
        {/* LOGO DESIGN */}
        <Link to="/" className="group flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase text-[#2C2420]">
            Aurelia
          </span>
          <div className="h-[1px] w-full bg-[#BC9B82] scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
          <span className="text-[7px] tracking-[0.7em] uppercase font-black text-[#BC9B82] mt-1">Roasters</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                text-[10px] tracking-[0.4em] font-bold uppercase transition-all duration-300
                ${isActive ? 'text-[#BC9B82]' : 'text-[#2C2420]/60 hover:text-[#2C2420]'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-[#2C2420]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-[#2C2420]/10 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[10px] tracking-[0.5em] font-black uppercase text-[#2C2420]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;