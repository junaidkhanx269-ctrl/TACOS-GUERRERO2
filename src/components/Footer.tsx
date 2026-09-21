import React from 'react';
import { Phone, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer id="site-footer" className="bg-[#111111] border-t-2 border-[#C62828] text-neutral-400 text-sm pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-anton text-3xl sm:text-4xl text-[#FFEB3B] tracking-wider">
                {BUSINESS_INFO.name.toUpperCase()}
              </span>
              <span className="text-xs bg-[#C62828] text-white px-2 py-0.5 rounded font-black tracking-widest uppercase">
                Austin TX
              </span>
            </div>
            
            <p className="font-semibold text-white text-base">
              {BUSINESS_INFO.tagline}
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              East Austin's beloved taco stand. Handmade comal tortillas, authentic vertical spit trompo al pastor with grilled pineapple, stone-ground molcajete salsas, and real Mexican street flavor for $1.50.
            </p>

            {/* Social Icons: Instagram / Facebook / TikTok */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#C62828] text-white flex items-center justify-center transition-colors border border-neutral-700"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#C62828] text-white flex items-center justify-center transition-colors border border-neutral-700"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#C62828] text-white flex items-center justify-center transition-colors border border-neutral-700"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 3.12.02 6.24-.03 9.35-.11 2.49-1.28 4.89-3.21 6.43-2.02 1.62-4.77 2.3-7.3 1.83-2.54-.47-4.78-2.09-6.05-4.32-1.27-2.23-1.41-5.02-.37-7.37 1.04-2.35 3.19-4.14 5.76-4.78.36-.09.73-.15 1.1-.19.01 1.43-.01 2.86.01 4.29-.38.07-.76.19-1.12.35-1.36.62-2.38 1.94-2.6 3.42-.23 1.55.37 3.18 1.58 4.2 1.21 1.02 2.92 1.35 4.43.86 1.52-.49 2.66-1.89 2.87-3.48.16-1.25.11-2.52.12-3.78.02-6.22.01-12.44.01-18.66z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Fast Contact */}
          <div className="space-y-2">
            <h4 className="font-anton text-lg text-white uppercase tracking-wider mb-3">
              Visit & Call
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFEB3B] flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFEB3B] flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white font-bold text-sm">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFEB3B] flex-shrink-0" />
                <span>{BUSINESS_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Order Guarantee */}
          <div className="space-y-2">
            <h4 className="font-anton text-lg text-white uppercase tracking-wider mb-3">
              Direct Ordering
            </h4>
            <div className="bg-neutral-900/90 p-4 rounded-xl border border-neutral-800 text-xs space-y-2">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Zero Commission Direct
              </div>
              <p className="text-neutral-400">
                You save 30% on menu items, never pay service fees, and your tacos are handed to you piping hot.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Direct Order Text */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 text-center sm:text-left">
          <div>
            © Tacos Guerrero - Autenticos Tacos Since 2010
          </div>
          <div className="font-semibold text-[#FFEB3B] tracking-wide">
            Built to get direct orders - No commission
          </div>
        </div>

      </div>
    </footer>
  );
};
