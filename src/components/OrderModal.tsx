import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle, Sparkles, TrendingDown, Clock, User, Phone, MessageSquare, AlertCircle, Globe } from 'lucide-react';
import { CartItem, MenuItem } from '../types';
import { MENU_ITEMS, SALSAS, BUSINESS_INFO } from '../data/restaurantData';
import { useAustinTime } from '../utils/timeZone';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddToCart: (item: MenuItem) => void;
  onClearCart: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onClearCart,
}) => {
  const { currentTimeFormatted, timeZoneAbbr, isOpen: isStoreOpen } = useAustinTime();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('In 15 minutes (ASAP) — Ready ~15 mins CT');
  const [selectedSalsa, setSelectedSalsa] = useState('Verde (Mild) + Roja (Medium)');
  const [notes, setNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  // Calculate totals & savings
  const directTotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const deliveryTotal = cart.reduce((acc, c) => acc + c.item.deliveryPrice * c.quantity, 0) + (directTotal > 0 ? 4.99 + 2.50 : 0); // Include app fees
  const totalSavings = Math.max(0, deliveryTotal - directTotal);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || cart.length === 0) return;

    const generatedId = `TG-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedId);
    setSubmittedOrder(true);
  };

  const handleReset = () => {
    setSubmittedOrder(false);
    onClearCart();
    onClose();
  };

  const pickupOptions = [
    'In 15 minutes (ASAP) — Ready ~15 mins CT',
    'In 30 minutes (Austin CT)',
    'In 45 minutes (Austin CT)',
    'In 1 hour (Austin CT)',
    'Today at 12:30 PM CT (Lunch Rush)',
    'Today at 5:30 PM CT (Dinner Rush)',
    'Today at 7:00 PM CT (Sunset Comal)',
    'Today at 8:30 PM CT (Late Comal)',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div
        className="bg-[#212121] border-2 border-[#FFEB3B]/50 rounded-2xl sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1A1A1A] border-b border-neutral-700 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🌮</span>
              <h3 className="font-anton text-xl sm:text-2xl text-white uppercase tracking-wide">
                DIRECT PICKUP ORDER
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-[#FFEB3B] font-bold mt-0.5">
              Zero delivery fees • Tacos Guerrero Austin • Ready in 15 mins
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-5 sm:space-y-6 flex-1">
          
          {submittedOrder ? (
            /* Order Success Receipt Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>

              <div>
                <span className="text-xs font-black bg-[#FFEB3B] text-[#C62828] px-3 py-1 rounded-md uppercase tracking-wider">
                  Pickup Order Confirmed #{orderNumber}
                </span>
                <h4 className="font-anton text-3xl sm:text-4xl text-white uppercase mt-2">
                  GRACIAS, {customerName.toUpperCase()}!
                </h4>
                <p className="text-sm text-neutral-300 mt-1">
                  Your tacos are being prepared on the hot comal at <strong>96 N Pleasant Valley Rd</strong>.
                </p>
              </div>

              {/* Savings Highlight Box */}
              <div className="bg-[#2E7D32]/20 border-2 border-[#2E7D32] p-4 rounded-2xl max-w-md mx-auto text-center">
                <div className="text-xs uppercase font-extrabold text-emerald-400">Total Saved Today:</div>
                <div className="font-anton text-4xl text-[#FFEB3B]">
                  ${totalSavings.toFixed(2)}
                </div>
                <div className="text-xs text-neutral-200 mt-1">
                  vs UberEats & DoorDash inflated prices and service fees!
                </div>
              </div>

              {/* Order Summary Receipt */}
              <div className="bg-neutral-900 rounded-2xl p-4 text-left border border-neutral-800 text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between font-bold text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>Pickup Time:</span>
                  <span className="text-white font-bold">{pickupTime}</span>
                </div>
                <div className="flex justify-between text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>Store Timezone:</span>
                  <span className="text-[#FFEB3B] font-medium">US Central Time ({timeZoneAbbr} / Austin, TX)</span>
                </div>
                <div className="flex justify-between font-bold text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>Phone:</span>
                  <span className="text-white">{customerPhone}</span>
                </div>
                <div className="flex justify-between font-bold text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>Salsas:</span>
                  <span className="text-[#FFEB3B]">{selectedSalsa}</span>
                </div>
                <div className="py-2 space-y-1">
                  {cart.map((c) => (
                    <div key={c.item.id} className="flex justify-between text-neutral-300">
                      <span>{c.quantity}x {c.item.name}</span>
                      <span className="font-bold text-white">${(c.item.price * c.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between font-anton text-base text-white">
                  <span>TOTAL TO PAY AT PICKUP:</span>
                  <span className="text-[#FFEB3B]">${directTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="py-3 px-6 bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-anton rounded-xl text-center uppercase tracking-wide"
                >
                  Call Stand if Needed
                </a>
                <button
                  onClick={handleReset}
                  className="py-3 px-6 bg-[#C62828] hover:bg-[#b71c1c] text-white font-anton rounded-xl uppercase tracking-wide cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Savings Psychology Banner inside Order Modal */}
              {cart.length > 0 && (
                <div className="bg-gradient-to-r from-[#1b5e20] to-[#2E7D32] text-white p-3.5 rounded-2xl border border-emerald-400/50 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-[#FFEB3B] animate-bounce" />
                    <div>
                      <div className="text-xs uppercase font-extrabold tracking-wide">
                        DIRECT ORDER SAVINGS
                      </div>
                      <div className="text-sm font-bold text-emerald-100">
                        You save <span className="text-[#FFEB3B] font-black text-base">${totalSavings.toFixed(2)}</span> vs UberEats!
                      </div>
                    </div>
                  </div>
                  <span className="text-xs bg-[#FFEB3B] text-[#C62828] px-2 py-0.5 rounded font-black uppercase">
                    30%+ OFF
                  </span>
                </div>
              )}

              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-anton text-lg text-white uppercase tracking-wide">
                    Your Taco Selection ({cart.reduce((acc, c) => acc + c.quantity, 0)} items)
                  </h4>
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-xs text-neutral-400 hover:text-red-400 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8 bg-neutral-900/60 rounded-2xl border border-dashed border-neutral-700">
                    <span className="text-4xl">🌮</span>
                    <p className="text-sm text-neutral-300 font-bold mt-2">
                      Your order is empty!
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Choose from our famous $1.50 street tacos below to get started:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-md mx-auto px-4">
                      {MENU_ITEMS.slice(0, 4).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onAddToCart(item)}
                          className="px-3 py-1.5 bg-neutral-800 hover:bg-[#C62828] text-white text-xs font-bold rounded-lg border border-neutral-700 transition-colors flex items-center gap-1.5"
                        >
                          <Plus className="w-3 h-3 text-[#FFEB3B]" />
                          <span>{item.name} ($1.50)</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {cart.map((c) => (
                      <div
                        key={c.item.id}
                        className="bg-neutral-900/90 p-3 rounded-xl border border-neutral-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-white text-sm truncate">
                            {c.item.name}
                          </h5>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#FFEB3B] font-bold">
                              ${c.item.price.toFixed(2)} each
                            </span>
                            <span className="text-red-400 line-through text-[11px]">
                              app: ${c.item.deliveryPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(c.item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="font-anton text-lg text-white w-5 text-center">
                            {c.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(c.item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-[#C62828] hover:bg-[#b71c1c] text-white flex items-center justify-center font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(c.item.id)}
                            className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-red-900/60 text-neutral-400 hover:text-red-400 flex items-center justify-center ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Add More Tacos Bar */}
              <div className="bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
                <div className="text-[11px] font-bold uppercase text-neutral-400 mb-2">
                  + Add more $1.50 street favorites:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {MENU_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-semibold rounded-md border border-neutral-700 flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3 h-3 text-[#FFEB3B]" />
                      <span>{item.name.replace('Taco ', '')}</span>
                      <span className="text-[#FFEB3B] font-bold">${item.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact & Pickup Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#FFEB3B]" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Gonzalez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-neutral-900 border border-neutral-700 rounded-xl text-white text-base sm:text-sm focus:border-[#FFEB3B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#FFEB3B]" />
                    Phone Number (for pickup SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(512) 555-0199"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-neutral-900 border border-neutral-700 rounded-xl text-white text-base sm:text-sm focus:border-[#FFEB3B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase text-neutral-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FFEB3B]" />
                      Pickup Time *
                    </label>
                    <span className="text-[10px] text-neutral-400">
                      Austin: {currentTimeFormatted} {timeZoneAbbr}
                    </span>
                  </div>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-neutral-900 border border-neutral-700 rounded-xl text-white text-base sm:text-sm focus:border-[#FFEB3B] focus:outline-none"
                  >
                    {pickupOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Complimentary Salsas *
                  </label>
                  <select
                    value={selectedSalsa}
                    onChange={(e) => setSelectedSalsa(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] bg-neutral-900 border border-neutral-700 rounded-xl text-white text-base sm:text-sm focus:border-[#FFEB3B] focus:outline-none"
                  >
                    <option value="Verde (Mild) + Roja (Medium)">Verde (Mild) + Roja (Medium)</option>
                    <option value="All 5 Salsas (Sampler)">All 5 Salsas (Sampler Feaster)</option>
                    <option value="Extra Habanero Fuego (Hot)">Extra Habanero Fuego (Extra Hot!)</option>
                    <option value="Avocado Crema + Chipotle">Avocado Crema + Chipotle Ahumada</option>
                    <option value="Mild Only (Verde & Avocado)">Mild Only (Verde & Avocado)</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Special Instructions (e.g. extra cilantro, grilled cebollitas, limes)
                </label>
                <input
                  type="text"
                  placeholder="Lots of grilled scallions, limes on the side, no onions on pastor..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-neutral-900 border border-neutral-700 rounded-xl text-white text-base sm:text-sm focus:border-[#FFEB3B] focus:outline-none"
                />
              </div>

              {/* Price Calculation Card */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Street Direct Price:</span>
                  <span className="text-white font-bold">${directTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-red-400">
                  <span>If ordered on UberEats/DoorDash:</span>
                  <span className="line-through">${deliveryTotal.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <div className="font-anton text-xl sm:text-2xl text-white">
                    TOTAL DUE AT PICKUP:
                  </div>
                  <div className="font-anton text-3xl text-[#FFEB3B]">
                    ${directTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={cart.length === 0}
                className={`w-full py-4 rounded-xl font-anton text-xl uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  cart.length > 0
                    ? 'bg-[#FFEB3B] hover:bg-yellow-300 text-[#C62828] border-2 border-[#C62828] hover:scale-[1.01] active:scale-95'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                }`}
              >
                <Sparkles className="w-5 h-5 fill-[#C62828]" />
                <span>CONFIRM PICKUP ORDER - ${directTotal.toFixed(2)}</span>
              </button>

              <div className="text-center text-[11px] text-neutral-400">
                🔒 No prepayment required • Pay card or cash when picking up fresh at the comal
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
