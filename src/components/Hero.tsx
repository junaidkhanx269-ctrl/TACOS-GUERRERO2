import React from 'react';
import { Star, ShieldCheck, Flame, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';
import { useAustinTime } from '../utils/timeZone';

interface HeroProps {
  onOpenOrder: () => void;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder, onScrollToMenu }) => {
  const { currentTimeFormatted, timeZoneAbbr, isOpen, statusBadgeText } = useAustinTime();

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#121212] pt-6 pb-16">
      {/* Background Image of sizzling street tacos al pastor on comal */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=2000&q=85"
          alt="Sizzling street tacos al pastor on comal with cilantro onion lime at Tacos Guerrero Austin"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-110"
        />
        {/* Subtle fiery comal glow gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/90 via-transparent to-[#171717]/80" />
      </div>

      {/* Floating Taco Icons with subtle animation */}
      <div className="absolute top-12 left-[6%] z-10 pointer-events-none select-none hidden md:block animate-float-taco">
        <div className="bg-[#262626]/85 backdrop-blur-md border border-[#FFEB3B]/40 p-3 rounded-2xl shadow-xl flex items-center gap-2.5">
          <span className="text-3xl">🌮</span>
          <div>
            <div className="text-[11px] font-black uppercase text-[#FFEB3B] tracking-wider">Handmade Corn Tortilla</div>
            <div className="text-xs font-semibold text-white">Pressed Fresh to Order</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-28 right-[6%] z-10 pointer-events-none select-none hidden lg:block animate-float-taco-reverse">
        <div className="bg-[#262626]/85 backdrop-blur-md border border-[#C62828]/60 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <div className="text-[11px] font-black uppercase text-red-400 tracking-wider">100% Vertical Trompo</div>
            <div className="text-xs font-bold text-white">Al Pastor with Pineapple</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Urgency Pill: USA Timing Zone (Austin, TX) & Today's Orders */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-neutral-900/95 border border-neutral-700/80 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white mb-6 shadow-xl">
          <div className={`flex items-center gap-1.5 font-bold ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span>{statusBadgeText}</span>
          </div>
          <span className="text-neutral-500">•</span>
          <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#FFEB3B]" />
            <span>Austin Time: <strong className="text-white">{currentTimeFormatted} {timeZoneAbbr}</strong></span>
          </div>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-[#FFEB3B] font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
            <span>{BUSINESS_INFO.todayOrdersCount} people ordered today</span>
          </div>
        </div>

        {/* PRO TIP 1: Big Yellow Badges with Red Border - Pulsing Animation (HOOK FOR OWNER) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 w-full max-w-2xl px-2">
          <div className="street-badge-yellow animate-pulse-hook px-4 sm:px-6 py-2.5 rounded-xl text-center w-full sm:w-auto flex-1">
            <div className="text-[10px] sm:text-xs tracking-widest uppercase font-black">TOP RATED IN EAST AUSTIN</div>
            <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-anton tracking-wide">
              ⭐ 381+ 5-STAR REVIEWS
            </div>
          </div>

          <div className="street-badge-yellow animate-pulse-hook px-4 sm:px-6 py-2.5 rounded-xl text-center w-full sm:w-auto flex-1">
            <div className="text-[10px] sm:text-xs tracking-widest uppercase font-black">AUTHENTIC STREET PRICING</div>
            <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-anton tracking-wide">
              🌮 $1.50 TACOS EVERY DAY!
            </div>
          </div>
        </div>

        {/* Main Street Hero Headline: AUSTIN'S FAVORITE STREET TACOS */}
        <h1 className="font-anton text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.98] max-w-5xl mb-4 drop-shadow-2xl px-2">
          AUSTIN'S <span className="text-[#FFEB3B] underline decoration-[#C62828] decoration-4 md:decoration-8 underline-offset-8">FAVORITE</span> STREET TACOS
        </h1>

        {/* Subtitle: Handmade Tortillas • Trompo Al Pastor • Salsas Made Fresh Daily */}
        <p className="font-poppins text-sm sm:text-lg md:text-2xl font-semibold text-neutral-200 max-w-3xl mb-4 tracking-wide px-2">
          Handmade Tortillas <span className="text-[#FFEB3B]">•</span> Trompo Al Pastor <span className="text-[#FFEB3B]">•</span> Salsas Made Fresh Daily
        </p>

        {/* PRO TIP 5: Pricing Psychology - HUGE $1.50 with strikethrough delivery app price */}
        <div className="bg-[#212121]/95 border-2 border-[#FFEB3B]/50 px-4 sm:px-6 py-3 rounded-2xl mb-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 shadow-2xl backdrop-blur-sm max-w-xl w-full mx-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase font-extrabold text-neutral-400">Our Street Price:</span>
            <span className="font-anton text-3xl sm:text-5xl text-[#FFEB3B] leading-none">
              $1.50
            </span>
            <span className="text-xs text-neutral-300 font-bold">/ taco</span>
          </div>

          <div className="h-6 w-[1px] bg-neutral-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="line-through text-red-400 font-bold text-base sm:text-xl">
              $3.50+ delivery apps
            </span>
            <span className="bg-[#2E7D32] text-white text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-1 rounded-full uppercase tracking-wider">
              SAVE 57% DIRECT
            </span>
          </div>
        </div>

        {/* 2 CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-xl mb-8 px-2">
          <button
            onClick={onOpenOrder}
            id="hero-pickup-btn"
            className="font-anton text-base sm:text-xl px-6 sm:px-8 py-3.5 sm:py-4 bg-[#C62828] hover:bg-[#b71c1c] text-[#FFEB3B] rounded-xl border-2 border-[#FFEB3B] shadow-xl hover:shadow-red-900/50 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
          >
            <Sparkles className="w-5 h-5 fill-[#FFEB3B]" />
            <span>Order for Pickup - Save 30%</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onScrollToMenu}
            id="hero-menu-btn"
            className="font-anton text-base sm:text-xl px-6 sm:px-7 py-3.5 sm:py-4 bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-xl border border-neutral-600 hover:border-[#FFEB3B] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto"
          >
            <span>See Full Menu $1.50-$4</span>
          </button>
        </div>

        {/* PRO TIP 4: Trust Badge - Google Logo, 4.8 star rating, As seen on Google Maps Top Rated */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm bg-neutral-900/85 px-6 py-3 rounded-2xl border border-neutral-800 shadow-md">
          {/* Google Logo */}
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-bold text-white">Google Maps Top Rated</span>
          </div>

          <div className="flex items-center gap-1 text-[#FFEB3B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FFEB3B] text-[#FFEB3B]" />
            ))}
          </div>

          <span className="font-extrabold text-white">
            4.8 Stars <span className="text-neutral-400 font-normal">({BUSINESS_INFO.reviewCount} Reviews)</span>
          </span>

          <span className="hidden md:inline text-neutral-600">|</span>

          <span className="text-neutral-300 font-medium hidden md:inline">
            📍 Serving East Austin Since 2010
          </span>
        </div>

      </div>
    </section>
  );
};
