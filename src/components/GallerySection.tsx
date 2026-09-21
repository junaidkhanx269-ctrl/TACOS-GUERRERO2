import React, { useState } from 'react';
import { Camera, X, Maximize2, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-16 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-neutral-800 text-[#FFEB3B] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            Vibe & Kitchen Action
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            EAST AUSTIN <span className="text-[#FFEB3B]">STREET TACO</span> GALLERY
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 font-medium">
            Take a look at the comal, the vertical trompo spinning with spiced pastor, and our happy local taco community on Pleasant Valley Rd.
          </p>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-[#FFEB3B]/70 shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag */}
              <div className="absolute top-3 left-3 bg-[#C62828] text-[#FFEB3B] text-[11px] font-anton px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#FFEB3B]/40">
                {item.tag}
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h3 className="font-anton text-lg text-white uppercase tracking-wide group-hover:text-[#FFEB3B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 text-white hover:text-[#FFEB3B] p-2 bg-neutral-900 rounded-full"
            >
              <X className="w-7 h-7" />
            </button>

            <div
              className="max-w-4xl w-full bg-[#212121] rounded-3xl overflow-hidden border-2 border-[#FFEB3B]/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[60vh] max-h-[500px] w-full bg-black">
                <img
                  src={GALLERY_ITEMS[activePhoto].image}
                  alt={GALLERY_ITEMS[activePhoto].title}
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <div className="p-6 bg-[#1a1a1a]">
                <span className="text-xs font-black uppercase text-[#FFEB3B] tracking-wider">
                  {GALLERY_ITEMS[activePhoto].tag}
                </span>
                <h3 className="font-anton text-2xl text-white uppercase mt-1">
                  {GALLERY_ITEMS[activePhoto].title}
                </h3>
                <p className="text-neutral-300 text-sm mt-1">
                  {GALLERY_ITEMS[activePhoto].subtitle}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
