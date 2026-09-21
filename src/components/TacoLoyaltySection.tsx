import React, { useState, useEffect } from 'react';
import { Award, Gift, Sparkles, CheckCircle2, Trophy, Star, ArrowRight, User, Phone, Zap } from 'lucide-react';

interface TacoLoyaltySectionProps {
  onOpenOrder: () => void;
  externalTacoPurchases?: number;
}

export const TacoLoyaltySection: React.FC<TacoLoyaltySectionProps> = ({ onOpenOrder, externalTacoPurchases = 0 }) => {
  const [isMember, setIsMember] = useState<boolean>(() => {
    return localStorage.getItem('tg_loyalty_member') === 'true';
  });
  const [memberName, setMemberName] = useState<string>(() => {
    return localStorage.getItem('tg_loyalty_name') || '';
  });
  const [memberPhone, setMemberPhone] = useState<string>(() => {
    return localStorage.getItem('tg_loyalty_phone') || '';
  });
  const [tacoCount, setTacoCount] = useState<number>(() => {
    const saved = localStorage.getItem('tg_loyalty_tacos');
    return saved !== null ? parseInt(saved, 10) : 7; // Default to 7 to show realistic high progress!
  });
  const [claimedReward, setClaimedReward] = useState<boolean>(false);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);

  // Sync with external taco purchases if user places orders
  useEffect(() => {
    if (externalTacoPurchases > 0) {
      setTacoCount((prev) => {
        const next = Math.min(30, prev + externalTacoPurchases);
        localStorage.setItem('tg_loyalty_tacos', next.toString());
        return next;
      });
    }
  }, [externalTacoPurchases]);

  // Current cycle progress (0-10)
  const currentStamps = tacoCount % 10;
  const completedCombos = Math.floor(tacoCount / 10);
  const isRewardReady = tacoCount >= 10 && currentStamps === 0 && !claimedReward;
  const progressPercent = Math.min(100, Math.round((currentStamps === 0 && tacoCount > 0 ? 10 : currentStamps) * 10));

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberPhone.trim()) return;

    setIsMember(true);
    localStorage.setItem('tg_loyalty_member', 'true');
    localStorage.setItem('tg_loyalty_name', memberName);
    localStorage.setItem('tg_loyalty_phone', memberPhone);
    // Give 2 bonus starter stamps if brand new
    if (tacoCount === 0) {
      setTacoCount(2);
      localStorage.setItem('tg_loyalty_tacos', '2');
    }
    setShowJoinModal(false);
  };

  const handleAddDemoTaco = (amount: number) => {
    const updated = tacoCount + amount;
    setTacoCount(updated);
    localStorage.setItem('tg_loyalty_tacos', updated.toString());
    if (updated % 10 === 0) {
      setClaimedReward(false);
    }
  };

  const handleResetDemo = () => {
    setTacoCount(0);
    setClaimedReward(false);
    localStorage.setItem('tg_loyalty_tacos', '0');
  };

  const handleClaimCombo = () => {
    setClaimedReward(true);
  };

  return (
    <section id="loyalty" className="py-16 bg-[#151515] border-t-2 border-b-2 border-[#FFEB3B]/60 relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFEB3B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-[-100px] w-96 h-96 bg-[#C62828]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFEB3B] text-[#C62828] border-2 border-[#C62828] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-md animate-pulse">
            <Trophy className="w-4 h-4" />
            VIP TACO REWARDS
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            TACO <span className="text-[#FFEB3B]">LOYALTY CLUB</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 font-medium">
            Buy 10 Tacos, get a <strong>FREE Guerrero Combo</strong> (5 Tacos + Drink, $12 value)! Every taco ordered online or at the comal counts.
          </p>
        </div>

        {/* Interactive Loyalty Card & Progress Display */}
        <div className="bg-[#202020] border-2 border-[#FFEB3B] rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.7)] relative">
          
          {/* Member Status Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-neutral-700/80 mb-8">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFEB3B] to-[#FBC02D] text-[#C62828] flex items-center justify-center font-anton text-2xl shadow-md flex-shrink-0">
                🌮
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                    {isMember ? `${memberName}'s Taco Passport` : 'Guerrero Taco Stamp Card'}
                  </h3>
                  <span className="text-[10px] bg-[#C62828] text-[#FFEB3B] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {isMember ? 'Active VIP Member' : 'Guest Pass'}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {isMember ? `Phone: ${memberPhone} • Austin, TX Member` : 'Join now to track your stamps across all pickup orders'}
                </p>
              </div>
            </div>

            <div>
              {!isMember ? (
                <button
                  onClick={() => setShowJoinModal(true)}
                  id="loyalty-card-join-now-btn"
                  className="font-anton text-base px-6 py-3 bg-[#FFEB3B] hover:bg-yellow-300 text-[#C62828] rounded-xl border-2 border-[#C62828] shadow-lg flex items-center gap-2 cursor-pointer transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wide"
                >
                  <Sparkles className="w-4 h-4 fill-[#C62828]" />
                  <span>Join Loyalty Club Free</span>
                </button>
              ) : (
                <div className="text-center sm:text-right">
                  <div className="text-xs uppercase font-extrabold text-neutral-400">Total Combos Earned</div>
                  <div className="font-anton text-2xl text-[#FFEB3B]">
                    🏆 {completedCombos} Free {completedCombos === 1 ? 'Combo' : 'Combos'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar & Status Text */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="font-anton text-xl sm:text-2xl text-white uppercase tracking-wide">
                  Progress to Next Free Combo:
                </span>
                <span className="ml-2 font-anton text-2xl sm:text-3xl text-[#FFEB3B]">
                  {currentStamps === 0 && tacoCount > 0 ? '10' : currentStamps} / 10 TACOS
                </span>
              </div>

              <div className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full">
                {10 - (currentStamps === 0 && tacoCount > 0 ? 0 : currentStamps)} more tacos until your FREE $12 Combo!
              </div>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="w-full bg-neutral-900 h-5 rounded-full p-1 border border-neutral-700 relative overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C62828] via-[#FF8F00] to-[#FFEB3B] transition-all duration-700 shadow-md relative"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* 10 Taco Stamp Visuals Grid */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 sm:gap-2.5 md:gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => {
              const activeEffective = currentStamps === 0 && tacoCount > 0 ? 10 : currentStamps;
              const isStamped = step <= activeEffective;
              const isGoal = step === 10;

              return (
                <div
                  key={step}
                  className={`relative p-1.5 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                    isGoal
                      ? isStamped
                        ? 'bg-gradient-to-b from-[#2e7d32] to-[#1b5e20] border-[#FFEB3B] shadow-[0_0_20px_rgba(255,235,59,0.5)] scale-105'
                        : 'bg-[#2a1a00] border-[#FFEB3B] border-dashed animate-pulse'
                      : isStamped
                      ? 'bg-[#2a2a2a] border-[#FFEB3B]/70 shadow-md'
                      : 'bg-neutral-900 border-neutral-800 opacity-60'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-anton text-neutral-400 mb-0.5 sm:mb-1">
                    #{step}
                  </span>

                  <span className={`text-xl sm:text-2xl md:text-3xl transition-transform ${isStamped ? 'scale-110 drop-shadow-md' : 'grayscale opacity-40'}`}>
                    {isGoal ? '👑' : '🌮'}
                  </span>

                  <span className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-center line-clamp-1">
                    {isGoal ? (
                      <span className="text-[#FFEB3B]">FREE</span>
                    ) : isStamped ? (
                      <span className="text-emerald-400">✓ Stamp</span>
                    ) : (
                      <span className="text-neutral-500">Taco</span>
                    )}
                  </span>

                  {isStamped && (
                    <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#2E7D32] border border-white text-white flex items-center justify-center text-[8px] sm:text-[9px] font-bold">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reward Unlocked State Alert */}
          {(progressPercent === 100 || isRewardReady) && !claimedReward && (
            <div className="mb-8 p-5 bg-gradient-to-r from-[#1b5e20] via-[#2e7d32] to-[#1b5e20] border-2 border-[#FFEB3B] rounded-2xl text-center shadow-xl animate-pulse">
              <div className="text-2xl">🎉 🌮 🥤 👑</div>
              <h4 className="font-anton text-2xl sm:text-3xl text-[#FFEB3B] uppercase mt-1">
                YOU'VE UNLOCKED A FREE GUERRERO COMBO!
              </h4>
              <p className="text-white text-xs sm:text-sm max-w-xl mx-auto mt-1 font-medium">
                Congratulations! You’ve collected 10 tacos. Enjoy 5 tacos of your choice + any 24oz handmade Agua Fresca or Mexican glass Coke 100% free ($12 value).
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleClaimCombo}
                  className="px-6 py-2.5 bg-[#FFEB3B] hover:bg-yellow-300 text-[#C62828] font-anton text-base rounded-xl border-2 border-[#C62828] shadow-md uppercase cursor-pointer"
                >
                  Reveal Reward Voucher Code
                </button>
              </div>
            </div>
          )}

          {/* Voucher Code Reveal Modal / Box */}
          {claimedReward && (
            <div className="mb-8 p-5 bg-[#171717] border-2 border-emerald-400 rounded-2xl text-center shadow-lg">
              <span className="text-xs uppercase font-extrabold text-emerald-400">
                ✓ Free Combo Voucher Code:
              </span>
              <div className="font-anton text-3xl text-[#FFEB3B] my-1 tracking-widest selection:bg-white selection:text-black">
                GUERRERO-FREE-COMBO-12
              </div>
              <p className="text-xs text-neutral-300">
                Show this code or tell your phone number ({memberPhone || 'at checkout'}) when picking up your order at 96 N Pleasant Valley Rd!
              </p>
              <button
                onClick={onOpenOrder}
                className="mt-3 px-5 py-2 bg-[#2E7D32] hover:bg-[#1b5e20] text-white text-xs font-anton rounded-lg uppercase tracking-wide cursor-pointer"
              >
                Apply to Pickup Order Now
              </button>
            </div>
          )}

          {/* Stamp Simulator / Order Interaction Bar */}
          <div className="bg-neutral-900/90 rounded-2xl p-4 sm:p-5 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-bold text-[#FFEB3B] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                How to Earn Taco Stamps
              </div>
              <p className="text-xs text-neutral-300 mt-0.5">
                Stamps automatically add with every online pickup order! You can also simulate adding tacos right here:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleAddDemoTaco(1)}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg border border-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Simulate buying 1 taco"
              >
                <span>+1 Taco</span>
              </button>
              <button
                onClick={() => handleAddDemoTaco(3)}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg border border-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Simulate buying 3 tacos"
              >
                <span>+3 Tacos</span>
              </button>
              <button
                onClick={onOpenOrder}
                className="px-4 py-2 bg-[#C62828] hover:bg-[#b71c1c] text-[#FFEB3B] font-anton text-xs rounded-lg uppercase tracking-wide flex items-center gap-1.5 border border-[#FFEB3B]/50 cursor-pointer"
              >
                <span>Order Tacos to Earn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {tacoCount > 0 && (
                <button
                  onClick={handleResetDemo}
                  className="text-[11px] text-neutral-500 hover:text-neutral-400 px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* 4 Member Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-neutral-800">
            <div className="bg-[#1c1c1c] p-4 rounded-xl border border-neutral-800 flex items-start gap-3">
              <span className="text-2xl">🌮</span>
              <div>
                <h5 className="font-anton text-base text-white uppercase">1 Free Combo / 10 Tacos</h5>
                <p className="text-[11px] text-neutral-400 mt-0.5">Every 10 street tacos gives you a free 5-taco combo + drink.</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c] p-4 rounded-xl border border-neutral-800 flex items-start gap-3">
              <span className="text-2xl">🎂</span>
              <div>
                <h5 className="font-anton text-base text-white uppercase">Birthday Feast</h5>
                <p className="text-[11px] text-neutral-400 mt-0.5">Free 3 tacos and cold Agua Fresca during your birthday week.</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c] p-4 rounded-xl border border-neutral-800 flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h5 className="font-anton text-base text-white uppercase">VIP Fast Line</h5>
                <p className="text-[11px] text-neutral-400 mt-0.5">Skip the line on Taco Tuesdays at 96 N Pleasant Valley Rd.</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c] p-4 rounded-xl border border-neutral-800 flex items-start gap-3">
              <span className="text-2xl">🌶️</span>
              <div>
                <h5 className="font-anton text-base text-white uppercase">Secret Salsa Tastings</h5>
                <p className="text-[11px] text-neutral-400 mt-0.5">First taste of limited-edition fire-roasted chiles and salsas.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Join Now Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-[#212121] border-2 border-[#FFEB3B] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <span className="text-4xl">👑</span>
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide mt-2">
                JOIN TACO LOYALTY CLUB
              </h3>
              <p className="text-xs text-[#FFEB3B] font-bold mt-1">
                100% Free • Get 2 Bonus Starter Stamps Instantly!
              </p>
            </div>

            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#FFEB3B]" />
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Gonzalez"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:border-[#FFEB3B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#FFEB3B]" />
                  Mobile Phone (to track stamps) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(512) 555-0199"
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:border-[#FFEB3B] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FFEB3B] hover:bg-yellow-300 text-[#C62828] font-anton text-lg rounded-xl border-2 border-[#C62828] shadow-lg uppercase tracking-wider cursor-pointer"
                >
                  Confirm & Claim 2 Starter Stamps
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="w-full py-2.5 text-neutral-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
