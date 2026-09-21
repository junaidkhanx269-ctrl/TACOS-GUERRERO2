import React, { useState } from 'react';
import { TopBanner } from './components/TopBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyUsBar } from './components/WhyUsBar';
import { MenuSection } from './components/MenuSection';
import { SalsaBarSection } from './components/SalsaBarSection';
import { TacoLoyaltySection } from './components/TacoLoyaltySection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { SavingsCalculatorSection } from './components/SavingsCalculatorSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { CartItem, MenuItem } from './types';
import { MENU_ITEMS } from './data/restaurantData';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  // Initial pre-loaded popular tacos so the cart already shows real savings right away
  const [cart, setCart] = useState<CartItem[]>([
    {
      item: MENU_ITEMS[0], // Al Pastor
      quantity: 3,
    },
    {
      item: MENU_ITEMS[1], // Carne Asada
      quantity: 2,
    },
  ]);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleAddSpecial = () => {
    // Add Guerrero Special: 5 tacos + drink combo representation
    setCart((prev) => {
      const pastor = MENU_ITEMS[0];
      const asada = MENU_ITEMS[1];
      const carnitas = MENU_ITEMS[2];
      const horchata = MENU_ITEMS.find((m) => m.id === 'drink-horchata') || MENU_ITEMS[8];

      const newItems = [...prev];
      
      const addItem = (item: MenuItem, qty: number) => {
        const idx = newItems.findIndex((c) => c.item.id === item.id);
        if (idx >= 0) {
          newItems[idx] = { ...newItems[idx], quantity: newItems[idx].quantity + qty };
        } else {
          newItems.push({ item, quantity: qty });
        }
      };

      addItem(pastor, 2);
      addItem(asada, 2);
      addItem(carnitas, 1);
      if (horchata) addItem(horchata, 1);

      return newItems;
    });

    setIsOrderModalOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, c) => acc + c.quantity, 0);
  const directTotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const deliveryTotal = cart.reduce((acc, c) => acc + c.item.deliveryPrice * c.quantity, 0) + (directTotal > 0 ? 4.99 + 2.50 : 0);
  const cartSavings = Math.max(0, deliveryTotal - directTotal);

  return (
    <div className="min-h-screen bg-[#171717] text-white flex flex-col font-['Poppins',sans-serif] selection:bg-[#FFEB3B] selection:text-[#C62828] overflow-x-hidden">
      
      {/* 1. Top Banner: Animated marquee */}
      <TopBanner />

      {/* 2. Header: Logo, 4.8★ 381 Reviews badge, Navigation, Pulsing CTA */}
      <Header
        onOpenOrder={() => setIsOrderModalOpen(true)}
        cartCount={totalCartCount}
        cartSavings={cartSavings}
      />

      {/* Main Sections */}
      <main className="flex-1 pb-16 md:pb-0">
        
        {/* 3. Hero: Sizzling tacos on comal, BIG yellow badges, 4.8 star badge, Urgency, Pricing psychology */}
        <Hero
          onOpenOrder={() => setIsOrderModalOpen(true)}
          onScrollToMenu={handleScrollToMenu}
        />

        {/* 4. Why Us Bar: 4 columns with icons + checkmarks */}
        <WhyUsBar />

        {/* 5. Menu Section: Tabs, items with price in BIG bold, delivery app comparison, Special Box */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onAddSpecial={handleAddSpecial}
        />

        {/* Taco Loyalty Club: Progress bar for every 10 tacos purchased to earn free combo */}
        <TacoLoyaltySection
          onOpenOrder={() => setIsOrderModalOpen(true)}
        />

        {/* 6. Salsa Bar Section: 5 salsas with heat meter & interactive hover */}
        <SalsaBarSection />

        {/* 7. Gallery: 6 images (trompo, comal, salsa molcajete, customers eating) */}
        <GallerySection />

        {/* 8. Reviews: 3 real style reviews with stars, profile pics, Google logo, Animated counter */}
        <ReviewsSection />

        {/* 9. Savings Calculator: 'How much you lose to delivery apps', slider 500 orders -> $1500 saved */}
        <SavingsCalculatorSection
          onOpenOrder={() => setIsOrderModalOpen(true)}
        />

        {/* 10. Location & Hours: Left Google Maps embed, Right Hours 10am-10pm, click to call, red & green buttons */}
        <LocationHoursSection />

      </main>

      {/* 11. Footer: Logo, address, phone, social icons, copyright & direct order note */}
      <Footer />

      {/* Online Order Drawer / Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp with unread badge '3' & Mobile Sticky Order Button '🌮 ORDER TACOS - $1.50 - Save 30%' */}
      <FloatingWidgets
        onOpenOrder={() => setIsOrderModalOpen(true)}
        cartCount={totalCartCount}
      />

    </div>
  );
}
