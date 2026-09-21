import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Check, Copy, ExternalLink, Globe } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';
import { useAustinTime } from '../utils/timeZone';

export const LocationHoursSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { currentTimeFormatted, timeZoneAbbr, timeZoneFull, isOpen, statusBadgeText, currentDayName } = useAustinTime();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rawDays = [
    { day: 'Monday', hours: '10:00 AM - 10:00 PM CT' },
    { day: 'Tuesday', hours: '10:00 AM - 10:00 PM CT ($1.50 Specials)' },
    { day: 'Wednesday', hours: '10:00 AM - 10:00 PM CT' },
    { day: 'Thursday', hours: '10:00 AM - 10:00 PM CT' },
    { day: 'Friday', hours: '10:00 AM - 10:00 PM CT' },
    { day: 'Saturday', hours: '10:00 AM - 10:00 PM CT' },
    { day: 'Sunday', hours: '10:00 AM - 10:00 PM CT' },
  ];

  return (
    <section id="location" className="py-16 bg-[#181818] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C62828]/20 border border-[#C62828] text-[#FFEB3B] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            East Austin Authentic Street Spot
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            LOCATION & <span className="text-[#FFEB3B]">HOURS</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 font-medium">
            Located right on N Pleasant Valley Rd in the heart of East Austin. Plenty of parking, outdoor picnic seating, and hot comal action!
          </p>
        </div>

        {/* 2-Column Layout: Left Google Maps Embed, Right Hours & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Google Maps Embed for 96 N Pleasant Valley Rd */}
          <div className="lg:col-span-7 bg-[#212121] rounded-3xl overflow-hidden border border-neutral-700 shadow-xl flex flex-col min-h-[420px]">
            <div className="p-4 bg-[#1f1f1f] border-b border-neutral-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C62828] flex-shrink-0" />
                <span className="font-bold text-white text-sm sm:text-base">
                  {BUSINESS_INFO.address}
                </span>
              </div>

              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-600 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>
            </div>

            {/* Interactive Embed iframe */}
            <div className="flex-1 w-full min-h-[350px] relative bg-neutral-900">
              <iframe
                title="Tacos Guerrero Location Map"
                src="https://maps.google.com/maps?q=96+N+Pleasant+Valley+Rd,+Austin,+TX+78702&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-[#1b1b1b] border-t border-neutral-700 flex items-center justify-between text-xs text-neutral-400">
              <span>East Austin • Holly Neighborhood</span>
              <a
                href="https://maps.google.com/?q=96+N+Pleasant+Valley+Rd,+Austin,+TX+78702"
                target="_blank"
                rel="noreferrer"
                className="text-[#FFEB3B] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Hours 10am-10pm daily with Open Now indicator, Phone click to call, Red & Green Action Buttons */}
          <div className="lg:col-span-5 bg-[#212121] rounded-3xl p-6 sm:p-8 border border-neutral-700 shadow-xl flex flex-col justify-between">
            
            <div>
              {/* Open Now Indicator & USA Timezone Clock */}
              <div className="pb-4 border-b border-neutral-700 mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3.5 w-3.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    </span>
                    <span className={`font-anton text-xl sm:text-2xl uppercase tracking-wide ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isOpen ? `OPEN NOW • TILL 10:00 PM ${timeZoneAbbr}` : `CLOSED NOW • OPENS 10:00 AM ${timeZoneAbbr}`}
                    </span>
                  </div>
                  <span className="text-[11px] bg-neutral-800 text-[#FFEB3B] font-bold px-2.5 py-1 rounded-full border border-neutral-700">
                    7 Days a Week
                  </span>
                </div>

                {/* Live USA Timing Display */}
                <div className="mt-2 flex items-center justify-between text-xs bg-neutral-900/80 px-3 py-1.5 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-[#FFEB3B]" />
                    <span>Austin, TX Local Time:</span>
                  </div>
                  <span className="font-anton text-sm text-[#FFEB3B] tracking-wide">
                    {currentTimeFormatted} {timeZoneAbbr}
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 text-right mt-0.5">
                  USA Central Time Zone ({timeZoneFull})
                </div>
              </div>

              {/* Hours Schedule */}
              <div className="space-y-2 mb-6">
                <div className="text-xs uppercase tracking-wider font-extrabold text-neutral-400 flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FFEB3B]" />
                    Operating Hours (US Central Time)
                  </span>
                  <span className="text-[10px] text-neutral-400 font-normal">
                    Today is {currentDayName}
                  </span>
                </div>

                <div className="bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800 divide-y divide-neutral-800 text-xs sm:text-sm">
                  {rawDays.map((item, idx) => {
                    const isToday = item.day.toLowerCase() === currentDayName.toLowerCase();
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between py-1.5 transition-colors ${
                          isToday
                            ? 'text-white font-bold bg-[#FFEB3B]/10 -mx-2 px-2 rounded-lg border-l-2 border-[#FFEB3B]'
                            : 'text-neutral-300'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {item.day}
                          {isToday && (
                            <span className="text-[10px] bg-[#FFEB3B] text-[#C62828] font-black px-1.5 py-0.2 rounded uppercase">
                              Today
                            </span>
                          )}
                        </span>
                        <span className={`font-medium ${isToday ? 'text-[#FFEB3B] font-bold' : 'text-neutral-200'}`}>
                          {item.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Phone with click to call */}
              <div className="bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase font-bold text-neutral-400">Order by Phone:</div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-anton text-2xl text-[#FFEB3B] hover:text-white transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
                <span className="text-xs bg-[#242424] text-neutral-300 px-3 py-1.5 rounded-lg border border-neutral-700">
                  Fast Call Pickup
                </span>
              </div>
            </div>

            {/* "Get Directions" (Red) + "Call Now" (Green) Buttons as specified */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Red Button: Get Directions */}
              <a
                href="https://maps.google.com/?q=96+N+Pleasant+Valley+Rd,+Austin,+TX+78702"
                target="_blank"
                rel="noreferrer"
                id="btn-get-directions"
                className="py-3.5 px-4 bg-[#C62828] hover:bg-[#b71c1c] text-white font-anton text-base rounded-xl border border-[#FFEB3B]/50 shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center uppercase tracking-wide"
              >
                <Navigation className="w-4 h-4 text-[#FFEB3B]" />
                <span>Get Directions</span>
              </a>

              {/* Green Button: Call Now (512) 939-2308 */}
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                id="btn-call-now-bottom"
                className="py-3.5 px-4 bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-anton text-base rounded-xl border border-emerald-400/50 shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center uppercase tracking-wide"
              >
                <Phone className="w-4 h-4 text-[#FFEB3B]" />
                <span>Call (512) 939-2308</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
