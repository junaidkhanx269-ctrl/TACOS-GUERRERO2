import React, { useState } from 'react';
import { Plus, Check, Sparkles, Flame, DollarSign, Tag, TrendingDown } from 'lucide-react';
import { MENU_ITEMS, BUSINESS_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onAddSpecial: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, onAddSpecial }) => {
  const [activeTab, setActiveTab] = useState<'tacos' | 'quesadillas' | 'tortas' | 'burritos' | 'drinks'>('tacos');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const tabs = [
    { id: 'tacos', label: 'Street Tacos', price: '$1.50', icon: '🌮', badge: 'Most Popular' },
    { id: 'quesadillas', label: 'Quesadillas', price: '$6.00', icon: '🧀', badge: 'Oaxaca Cheese' },
    { id: 'tortas', label: 'Tortas', price: '$9.00', icon: '🥪', badge: 'Huge Telera' },
    { id: 'burritos', label: 'Burritos', price: '$8.00', icon: '🌯', badge: 'Comal Griddled' },
    { id: 'drinks', label: 'Aguas Frescas', price: '$3.00', icon: '🥤', badge: 'Handmade' },
  ] as const;

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1200);
  };

  return (
    <section id="menu" className="py-16 bg-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#C62828]/20 border border-[#C62828] text-[#FFEB3B] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-[#FFEB3B]" />
            Pure East Austin Street Flavor
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            CALLEJERO <span className="text-[#FFEB3B]">MENU</span> & PRICES
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 font-medium">
            Real corn tortillas pressed fresh, vertical trompo al pastor, and tender braised meats. Order direct & never pay inflated delivery app markups!
          </p>
        </div>

        {/* Special Box: Highlighted in yellow border "Guerrero Special - 5 Tacos + Drink $12 - Most Popular 🔥" */}
        <div id="specials" className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241a05] via-[#212121] to-[#2b0808] border-4 border-[#FFEB3B] shadow-[0_0_35px_rgba(255,235,59,0.3)] p-6 sm:p-8">
            <div className="absolute top-0 right-0 bg-[#C62828] text-[#FFEB3B] font-anton text-xs sm:text-sm px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider border-l border-b border-[#FFEB3B]">
              🔥 Most Popular Deal
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-black bg-[#FFEB3B] text-[#C62828] px-3 py-1 rounded-md uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 fill-[#C62828]" />
                  TAQUERO COMBO FEAST
                </div>
                <h3 className="font-anton text-2xl sm:text-4xl text-white uppercase tracking-wide">
                  {BUSINESS_INFO.specialPromo}
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base mt-2 max-w-2xl">
                  Choose any 5 handmade street tacos (Al Pastor, Carne Asada, Carnitas, Barbacoa, Pollo, or Lengua) plus an ice-cold handmade 24oz Agua Fresca (Horchata or Jamaica) or Mexican glass Coke. Includes all 5 fresh salsas & grilled limes!
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4 text-xs font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1">
                    ✓ Direct Price: <strong className="text-white text-lg">$12.00</strong>
                  </span>
                  <span className="text-red-400 line-through">
                    Delivery Apps: $21.50
                  </span>
                  <span className="bg-[#2E7D32] text-white px-2 py-0.5 rounded font-black text-[11px]">
                    YOU SAVE $9.50 INSTANTLY
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-3">
                <div className="text-center lg:text-right hidden sm:block">
                  <div className="font-anton text-4xl sm:text-5xl text-[#FFEB3B] leading-none">$12</div>
                  <div className="text-[11px] text-neutral-400 font-bold uppercase">5 Tacos + Drink</div>
                </div>
                <button
                  onClick={onAddSpecial}
                  id="add-guerrero-special-btn"
                  className="font-anton text-base sm:text-xl px-6 sm:px-8 py-3.5 sm:py-4 bg-[#2E7D32] hover:bg-[#1b5e20] text-white rounded-2xl border-2 border-[#bbf7d0] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Special to Order - $12</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs with Edge-to-Edge Mobile Scrolling */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-8 scrollbar-none touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-anton text-sm sm:text-lg transition-all flex items-center gap-1.5 sm:gap-2 border-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#C62828] text-[#FFEB3B] border-[#FFEB3B] shadow-[0_4px_15px_rgba(198,40,40,0.5)] scale-105'
                    : 'bg-[#212121] text-neutral-300 border-neutral-700 hover:border-neutral-500 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-sans font-bold ${
                  isActive ? 'bg-[#FFEB3B] text-[#C62828]' : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {tab.price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredItems.map((item) => {
            const isAdded = addedItemId === item.id;
            const savings = (item.deliveryPrice - item.price).toFixed(2);

            return (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                className="bg-[#212121] rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#FFEB3B]/60 transition-all duration-300 flex flex-col group hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#212121] via-transparent to-black/30" />

                  {/* Top Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-[#C62828] text-[#FFEB3B] font-anton text-xs px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#FFEB3B]/60 shadow-md">
                      {item.badge}
                    </div>
                  )}

                  {/* Savings Pill */}
                  <div className="absolute bottom-3 right-3 bg-[#2E7D32] text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Save ${savings} Direct
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-anton text-xl sm:text-2xl text-white tracking-wide uppercase group-hover:text-[#FFEB3B] transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing Psychology Box */}
                  <div className="pt-3 border-t border-neutral-800/80">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-neutral-400">Our Street Price</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-anton text-3xl sm:text-4xl text-[#FFEB3B] leading-none">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] uppercase font-medium text-neutral-500">Delivery App Price</div>
                        <div className="text-sm font-bold text-red-400 line-through">
                          ${item.deliveryPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Green Add to Order Button */}
                    <button
                      onClick={() => handleAdd(item)}
                      id={`add-btn-${item.id}`}
                      className={`w-full py-3 px-4 rounded-xl font-anton text-base tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-[#2E7D32] text-white scale-95'
                          : 'bg-[#2E7D32] hover:bg-[#1b5e20] active:scale-95 text-white border border-[#81c784]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-5 h-5 text-[#FFEB3B]" />
                          <span>Added to Pickup Order!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 text-[#FFEB3B]" />
                          <span>Add to Order - ${item.price.toFixed(2)}</span>
                        </>
                      )}
                    </button>
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
