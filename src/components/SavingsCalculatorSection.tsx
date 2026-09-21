import React, { useState } from 'react';
import { DollarSign, TrendingDown, Percent, Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SavingsCalculatorSectionProps {
  onOpenOrder: () => void;
}

export const SavingsCalculatorSection: React.FC<SavingsCalculatorSectionProps> = ({ onOpenOrder }) => {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(500);
  const [avgTicket, setAvgTicket] = useState<number>(18); // $18 typical taco order

  // Calculations
  const grossRevenue = monthlyOrders * avgTicket;
  const deliveryCommissionPercent = 0.30; // 30% standard DoorDash / UberEats fee
  const deliveryCommissionLost = Math.round(grossRevenue * deliveryCommissionPercent);
  const directCommission = 0;
  const annualSaved = deliveryCommissionLost * 12;

  // Customer savings comparison for a typical 4-taco + drink order
  const directMealPrice = 1.50 * 4 + 3.00; // $9.00
  const deliveryMealPrice = 3.50 * 4 + 5.50 + 4.99 + 3.50; // $27.99 with fees and marked up tacos
  const customerSavingsPerOrder = (deliveryMealPrice - directMealPrice).toFixed(2);

  return (
    <section id="calculator" className="py-16 bg-[#161616] relative overflow-hidden border-t-2 border-[#C62828]">
      {/* Background Graphic Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C62828]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#33691E]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header: OWNER HOOK */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFEB3B] text-[#C62828] border-2 border-[#C62828] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-md animate-pulse">
            <Percent className="w-4 h-4" />
            30% Delivery Commission Killer
          </div>

          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-none">
            HOW MUCH YOU LOSE <span className="text-red-500">TO DELIVERY APPS</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base mt-3 font-medium">
            DoorDash & UberEats siphon <span className="text-red-400 font-bold">30% to 35%</span> from every single order. Direct ordering puts <span className="text-[#FFEB3B] font-bold">100% of the money back in local hands</span>.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="bg-[#212121] rounded-3xl border-2 border-neutral-700 p-6 sm:p-10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Monthly Orders */}
              <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="monthly-orders-range" className="font-anton text-lg sm:text-xl text-white uppercase tracking-wide">
                    Monthly Orders: <span className="text-[#FFEB3B]">{monthlyOrders}</span>
                  </label>
                  <span className="text-xs bg-[#2E7D32] text-white px-2.5 py-1 rounded-full font-bold">
                    ~{Math.round(monthlyOrders / 30)} orders / day
                  </span>
                </div>

                <input
                  id="monthly-orders-range"
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                  className="w-full h-3 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#FFEB3B]"
                />

                <div className="flex justify-between text-[11px] text-neutral-400 font-bold mt-2">
                  <span>50 orders</span>
                  <span>500 orders</span>
                  <span>1,000 orders</span>
                  <span>2,000 orders</span>
                </div>
              </div>

              {/* Slider 2: Average Order Value */}
              <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="avg-ticket-range" className="font-anton text-lg sm:text-xl text-white uppercase tracking-wide">
                    Average Order Value: <span className="text-[#FFEB3B]">${avgTicket}</span>
                  </label>
                  <span className="text-xs text-neutral-400 font-medium">
                    (Tacos + Drinks combo)
                  </span>
                </div>

                <input
                  id="avg-ticket-range"
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full h-3 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#FFEB3B]"
                />

                <div className="flex justify-between text-[11px] text-neutral-400 font-bold mt-2">
                  <span>$10</span>
                  <span>$18 (Typical)</span>
                  <span>$30</span>
                  <span>$40</span>
                </div>
              </div>

              {/* Breakdown comparison pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-red-950/40 border border-red-800/80 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    Delivery App Commission
                  </div>
                  <div className="font-anton text-2xl sm:text-3xl text-red-400">
                    -${deliveryCommissionLost.toLocaleString()} / mo
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    30% cut taken out of local business pockets
                  </div>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-700/80 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Direct Website Orders
                  </div>
                  <div className="font-anton text-2xl sm:text-3xl text-emerald-400">
                    $0 Commission
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    100% kept by Tacos Guerrero & customers
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: High Conversion Visual Hook Box */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#2a1111] to-[#1e0707] border-2 border-[#FFEB3B] rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative">
              
              <div className="inline-block bg-[#FFEB3B] text-[#C62828] text-xs font-black uppercase px-3 py-1 rounded-md tracking-wider mb-4">
                ⭐ ESTIMATED ANNUAL GAIN
              </div>

              <div className="text-xs uppercase font-extrabold text-neutral-300">
                You save with direct website:
              </div>

              <div className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#FFEB3B] my-2 leading-none">
                ${deliveryCommissionLost.toLocaleString()}
                <span className="text-base sm:text-lg font-sans text-white/80 font-normal">/mo</span>
              </div>

              <div className="text-sm font-bold text-emerald-400 mb-6">
                That's <strong className="text-white text-lg">${annualSaved.toLocaleString()}</strong> kept every year!
              </div>

              <div className="bg-black/50 p-4 rounded-2xl border border-neutral-700 text-left text-xs text-neutral-200 space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Monthly gross volume:</span>
                  <span className="font-bold">${grossRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-red-400">
                  <span>Third-party fee (30%):</span>
                  <span className="font-bold">-${deliveryCommissionLost.toLocaleString()}</span>
                </div>
                <div className="h-[1px] bg-neutral-700" />
                <div className="flex items-center justify-between text-[#FFEB3B] font-bold">
                  <span>Direct website fee:</span>
                  <span>$0.00</span>
                </div>
              </div>

              <button
                onClick={onOpenOrder}
                className="w-full py-4 bg-[#FFEB3B] hover:bg-yellow-300 text-[#C62828] font-anton text-lg rounded-xl border-2 border-[#C62828] shadow-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5 fill-[#C62828]" />
                <span>Order Direct & Save 30%</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-[11px] text-neutral-400 mt-3 font-medium">
                🌮 Support East Austin locals • Never pay marked up app prices
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
