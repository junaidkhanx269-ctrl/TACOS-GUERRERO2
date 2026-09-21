import React, { useState } from 'react';
import { Flame, Sparkles, Info, Check } from 'lucide-react';
import { SALSAS } from '../data/restaurantData';
import { Salsa } from '../types';

export const SalsaBarSection: React.FC = () => {
  const [selectedSalsa, setSelectedSalsa] = useState<Salsa>(SALSAS[1]); // Default to Roja

  return (
    <section id="salsa-bar" className="py-16 bg-[#1a1a1a] border-t border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#33691E]/30 border border-[#33691E] text-[#bbf7d0] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FFEB3B]" />
            Stone Ground Molcajete Salsas
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            THE LEGENDARY <span className="text-[#C62828]">SALSA BAR</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 font-medium">
            Every order comes with fresh house salsas. Hover or click each salsa to see the authentic fire level, roasted chiles, and chef pairing recommendations!
          </p>
        </div>

        {/* 5 Salsas Heat Meter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {SALSAS.map((salsa) => {
            const isSelected = selectedSalsa.id === salsa.id;
            return (
              <div
                key={salsa.id}
                id={`salsa-card-${salsa.id}`}
                onClick={() => setSelectedSalsa(salsa)}
                onMouseEnter={() => setSelectedSalsa(salsa)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#282828] border-[#FFEB3B] shadow-[0_0_25px_rgba(255,235,59,0.25)] -translate-y-1'
                    : 'bg-[#212121] border-neutral-800 hover:border-neutral-600 hover:bg-[#252525]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl filter drop-shadow-md">{salsa.icon}</span>
                    <span
                      className="text-xs font-black px-2 py-0.5 rounded-full uppercase"
                      style={{
                        backgroundColor: `${salsa.color}25`,
                        color: salsa.color === '#4CAF50' ? '#81C784' : salsa.color === '#7CB342' ? '#AED581' : '#FF8A80',
                        border: `1px solid ${salsa.color}60`,
                      }}
                    >
                      {salsa.heatName}
                    </span>
                  </div>

                  <h3 className="font-anton text-xl text-white uppercase tracking-wide mb-1">
                    {salsa.name}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-2 mb-4">
                    {salsa.description}
                  </p>
                </div>

                {/* Heat Meter Bar */}
                <div className="pt-3 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 mb-1.5">
                    <span>Heat Level</span>
                    <span className="text-[#FFEB3B]">{salsa.level}/5</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-full flex-1 rounded-full transition-all ${
                          lvl <= salsa.level
                            ? lvl >= 4
                              ? 'bg-[#C62828]'
                              : lvl >= 3
                              ? 'bg-orange-500'
                              : 'bg-yellow-400'
                            : 'bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FFEB3B] text-[#C62828] text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Salsa Detail Spotlight */}
        <div className="bg-[#242424] border border-neutral-700 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-5xl bg-neutral-900 border-2 border-[#FFEB3B]/50 flex-shrink-0 shadow-inner">
              {selectedSalsa.icon}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
                <h4 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                  {selectedSalsa.name}
                </h4>
                <span className="bg-[#C62828] text-[#FFEB3B] font-bold text-xs px-2.5 py-0.5 rounded-full uppercase">
                  {selectedSalsa.heatName}
                </span>
              </div>

              <p className="text-sm text-neutral-200 mb-3 font-medium">
                {selectedSalsa.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[#FFEB3B] font-bold block uppercase tracking-wider mb-0.5">Ingredients:</span>
                  <span className="text-neutral-300">{selectedSalsa.ingredients}</span>
                </div>
                <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-emerald-400 font-bold block uppercase tracking-wider mb-0.5">Best Paired With:</span>
                  <span className="text-neutral-300">{selectedSalsa.bestPairedWith}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
