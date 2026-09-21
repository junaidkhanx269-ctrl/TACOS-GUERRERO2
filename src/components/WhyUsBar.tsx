import React from 'react';
import { CheckCircle2, Flame, Utensils, Sparkles, Clock } from 'lucide-react';

export const WhyUsBar: React.FC = () => {
  const features = [
    {
      icon: Utensils,
      title: 'Handmade Tortillas Daily',
      desc: 'Pressed and puffed fresh on the hot comal for every order',
      highlight: 'Fresh Masa',
    },
    {
      icon: Flame,
      title: '100% Trompo Al Pastor',
      desc: 'Authentic vertical spit pork sliced thin with roasted pineapple',
      highlight: 'Charred Edges',
    },
    {
      icon: Sparkles,
      title: 'Salsas Frescas',
      desc: '5 stone-ground artisanal salsas made fresh every morning',
      highlight: 'Mild to Fuego',
    },
    {
      icon: Clock,
      title: 'Open Late Till 10pm',
      desc: 'Serving hot street food 7 days a week on Pleasant Valley Rd',
      highlight: 'Mon - Sun',
    },
  ];

  return (
    <section id="why-us" className="bg-[#1C1C1C] border-y-2 border-[#C62828] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#242424] hover:bg-[#2c2c2c] border border-neutral-700/80 hover:border-[#FFEB3B]/50 p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg group relative overflow-hidden"
              >
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C62828] via-[#FFEB3B] to-[#33691E]" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C62828]/20 border border-[#C62828]/40 flex items-center justify-center text-[#FFEB3B] flex-shrink-0 group-hover:scale-110 group-hover:bg-[#C62828] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#FFEB3B] flex-shrink-0" />
                      <h3 className="font-anton text-lg tracking-wide text-white group-hover:text-[#FFEB3B] transition-colors uppercase">
                        {feat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {feat.desc}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-[#FFEB3B] bg-[#171717] px-2 py-0.5 rounded border border-neutral-700">
                      ✓ {feat.highlight}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
