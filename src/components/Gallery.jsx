import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800", title: "The Perfect Pour", size: "tall" },
  { id: 2, src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800", title: "Morning Light", size: "square" },
  { id: 3, src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800", title: "Roasted to Perfection", size: "wide" },
  { id: 4, src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800", title: "Artisanal Space", size: "tall" },
  { id: 5, src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800", title: "The Flat White", size: "square" },
  { id: 6, src: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800", title: "Alchemy", size: "wide" },
];

export default function CafeGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-[#F9F6F0] py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#D9B99B] uppercase tracking-[0.5em] text-[10px] font-bold block mb-4">Visual Stories</span>
            <h2 className="text-6xl font-serif italic text-[#4A3728]">Captured Moments.</h2>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#1A1A1A] pb-2"
          >
            Follow @TheCafeRitual
          </motion.button>
        </div>

        {/* MASONRY GRID */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              onClick={() => setSelectedImage(img)}
              className="relative group cursor-pointer overflow-hidden rounded-sm"
            >
              {/* IMAGE HOVER ZOOM */}
              <motion.img
                src={img.src}
                alt={img.title}
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
              />

              {/* OVERLAY WITH TEXT */}
              <div className="absolute inset-0 bg-[#4A3728]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                <motion.div 
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  className="border border-[#F9F7F2]/30 p-6 w-full h-full flex flex-col justify-center items-center"
                >
                  <p className="text-[#F9F7F2] font-serif italic text-2xl mb-2">{img.title}</p>
                  <span className="text-[#F9F7F2]/70 text-[9px] uppercase tracking-[0.3em]">View Close-up</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/95 p-4 lg:p-20"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="relative max-w-5xl max-h-full overflow-hidden shadow-2xl"
            >
              <img 
                src={selectedImage.src} 
                className="w-full h-auto max-h-[80vh] object-contain border border-white/10" 
              />
              <div className="bg-[#F9F7F2] p-6 flex justify-between items-center">
                <span className="font-serif italic text-2xl text-[#4A3728]">{selectedImage.title}</span>
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">Close ×</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}