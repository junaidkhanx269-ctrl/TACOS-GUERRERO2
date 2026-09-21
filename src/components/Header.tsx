import React, { useState } from 'react';
import { Menu as MenuIcon, X, ShoppingBag, Phone, Star, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';

interface HeaderProps {
  onOpenOrder: () => void;
  cartCount: number;
  cartSavings: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrder, cartCount, cartSavings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Menu ($1.50-$4)', href: '#menu' },
    { name: 'Loyalty Club 👑', href: '#loyalty' },
    { name: 'Specials', href: '#specials' },
    { name: 'Salsa Bar', href: '#salsa-bar' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Direct Savings', href: '#calculator' },
    { name: 'Location & Hours', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="main-site-header" className="bg-[#1C1C1C]/95 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-40 transition-all duration-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo + 4.8★ 381 Reviews Badge */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a href="#hero" className="group flex flex-col items-start leading-none text-decoration-none flex-shrink-0">
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-anton text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#FFEB3B] tracking-wider drop-shadow-md group-hover:text-white transition-colors whitespace-nowrap">
                  TACOS GUERRERO
                </span>
                <span className="text-[9px] sm:text-xs uppercase px-1.5 py-0.5 rounded font-black bg-[#C62828] text-white tracking-widest">
                  ATX
                </span>
              </div>
              <span className="text-[9px] sm:text-xs font-semibold text-neutral-400 tracking-wider uppercase mt-0.5 truncate max-w-[170px] sm:max-w-none">
                Auténticos Tacos Callejeros • East Austin
              </span>
            </a>

            {/* Small Badge "4.8★ 381 Reviews" next to logo - visible on sm+ screens */}
            <a
              href="#reviews"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#262626] hover:bg-[#333] border border-[#FFEB3B]/30 hover:border-[#FFEB3B] px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold text-neutral-100 transition-all shadow-sm flex-shrink-0"
              title="See Google Reviews"
            >
              <div className="flex items-center text-[#FFEB3B]">
                <Star className="w-3.5 h-3.5 fill-[#FFEB3B]" />
              </div>
              <span className="text-white font-black">4.8★</span>
              <span className="text-neutral-400 font-medium hidden md:inline">(381 Reviews)</span>
              <span className="text-[10px] bg-red-600/90 text-white px-1.5 py-0.2 rounded-full font-bold">
                Google
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-neutral-300">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-[#FFEB3B] transition-colors py-1 cursor-pointer font-medium"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Phone quick link */}
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              id="header-phone-btn"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-neutral-200 hover:text-[#FFEB3B] px-3 py-2 rounded-lg bg-neutral-800/80 border border-neutral-700 hover:border-neutral-500 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFEB3B]" />
              <span>(512) 939-2308</span>
            </a>

            {/* Cart Button with Count & Savings */}
            {cartCount > 0 && (
              <button
                onClick={onOpenOrder}
                id="header-cart-btn"
                className="relative flex items-center gap-1.5 sm:gap-2 bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-bold text-xs shadow-md transition-all animate-bounce"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{cartCount}</span>
                {cartSavings > 0 && (
                  <span className="hidden sm:inline bg-[#FFEB3B] text-[#C62828] text-[10px] px-1.5 py-0.5 rounded font-black">
                    Save ${cartSavings.toFixed(2)}
                  </span>
                )}
              </button>
            )}

            {/* Join Loyalty Club Button */}
            <button
              onClick={() => handleNavClick('#loyalty')}
              id="header-join-loyalty-btn"
              className="hidden md:inline-flex items-center gap-1.5 font-anton text-xs sm:text-sm bg-[#C62828] hover:bg-[#8E0000] text-[#FFEB3B] border border-[#FFEB3B]/60 px-3 py-2 rounded-lg shadow-md cursor-pointer transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider"
              title="Join Taco Loyalty Club - Buy 10, Get 1 Free Combo"
            >
              <span>👑 Loyalty</span>
            </button>

            {/* Pulsing CTA: Responsive text for mobile and PC */}
            <button
              onClick={onOpenOrder}
              id="header-order-tacos-cta"
              className="animate-pulse-hook font-anton bg-[#FFEB3B] hover:bg-yellow-300 text-[#C62828] border-2 border-[#C62828] text-xs sm:text-sm md:text-base px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2.5 rounded-lg shadow-lg flex items-center gap-1.5 cursor-pointer transform transition active:scale-95 uppercase tracking-wide font-black whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#C62828] text-[#C62828] hidden sm:inline" />
              <span className="hidden sm:inline">ORDER TACOS - $1.50</span>
              <span className="sm:hidden">ORDER $1.50</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden py-4 border-t border-neutral-800 bg-[#171717] space-y-2">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-neutral-800">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-neutral-800 rounded-lg text-xs font-bold text-white"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFEB3B]" />
                Call (512) 939-2308
              </a>
              <a
                href="https://maps.google.com/?q=96+N+Pleasant+Valley+Rd,+Austin,+TX+78702"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-800 rounded-lg text-xs font-bold text-white text-center"
              >
                📍 Get Directions
              </a>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-3 py-2.5 rounded-md text-base font-semibold text-neutral-200 hover:bg-[#262626] hover:text-[#FFEB3B] transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleNavClick('#loyalty')}
                className="w-full py-2.5 px-3 bg-[#C62828] text-[#FFEB3B] font-anton text-base rounded-lg border border-[#FFEB3B]/50 uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>👑 Join Taco Loyalty Club - Free Combo</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="w-full py-3 bg-[#FFEB3B] text-[#C62828] font-anton text-lg rounded-lg border-2 border-[#C62828] shadow-md uppercase tracking-wider text-center cursor-pointer"
              >
                🌮 Start Pickup Order - $1.50
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
