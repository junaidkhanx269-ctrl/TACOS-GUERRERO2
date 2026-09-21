import React from 'react';
import { useAustinTime } from '../utils/timeZone';

export const TopBanner: React.FC = () => {
  const { currentTimeFormatted, timeZoneAbbr, isOpen, statusBadgeText } = useAustinTime();

  const bannerText = (
    <>
      <span className="font-extrabold text-[#FFEB3B] tracking-wide">🌮 381+ 5-STAR REVIEWS</span>
      <span className="text-white/40">|</span>
      <span className="font-bold text-white tracking-wide">🔥 $1.50 TACOS EVERY DAY</span>
      <span className="text-white/40">|</span>
      <span className="inline-flex items-center gap-1.5 font-bold bg-black/30 px-2 py-0.5 rounded text-amber-200">
        <span>⏰ Austin, TX Time: {currentTimeFormatted} {timeZoneAbbr}</span>
      </span>
      <span className="text-white/40">|</span>
      <span className={`inline-flex items-center gap-1.5 font-bold ${isOpen ? 'text-[#bbf7d0]' : 'text-amber-300'}`}>
        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#22c55e] animate-ping' : 'bg-amber-400'}`} />
        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#22c55e]' : 'bg-amber-400'}`} />
        {isOpen ? `Open Now Till 10:00 PM ${timeZoneAbbr}` : statusBadgeText}
      </span>
      <span className="text-white/40">|</span>
      <span className="font-semibold text-white tracking-wide">📍 96 N Pleasant Valley Rd, Austin, TX</span>
      <span className="text-white/40">|</span>
      <a href="tel:5129392308" className="font-bold text-[#FFEB3B] hover:underline underline-offset-2">
        📞 Call: (512) 939-2308
      </a>
      <span className="text-white/40">|</span>
      <span className="font-semibold text-white/90">⚡ Skip Delivery App Fees — Save 30% Direct Pickup</span>
      <span className="text-white/40">|</span>
    </>
  );

  return (
    <div id="top-announcement-banner" className="bg-[#8E0000] border-b-2 border-[#FFEB3B] text-xs sm:text-sm py-2 overflow-hidden relative z-50 shadow-md">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex items-center gap-6 text-white font-medium">
          {bannerText}
          {bannerText}
        </div>
      </div>
    </div>
  );
};

