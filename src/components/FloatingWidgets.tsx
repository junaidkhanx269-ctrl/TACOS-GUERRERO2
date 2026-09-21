import React from 'react';

interface FloatingWidgetsProps {
  onOpenOrder: () => void;
  cartCount: number;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ onOpenOrder, cartCount }) => {
  return (
    <>
      {/* Sticky Bottom Button on Mobile: "🌮 ORDER TACOS - $1.50 - Save 30%" - always visible, green */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161616]/95 backdrop-blur-lg border-t-2 border-[#FFEB3B] p-2 sm:p-2.5 shadow-2xl">
        <button
          onClick={onOpenOrder}
          id="mobile-sticky-order-btn"
          className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-anton text-base sm:text-lg rounded-xl border-2 border-[#FFEB3B] shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 uppercase tracking-wide cursor-pointer active:scale-95 transition-all"
        >
          <span className="text-lg sm:text-xl">🌮</span>
          <span className="truncate">ORDER TACOS - $1.50 • SAVE 30%</span>
          {cartCount > 0 && (
            <span className="bg-[#FFEB3B] text-[#C62828] text-xs px-2 py-0.5 rounded-full font-sans font-black ml-1 shrink-0">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
