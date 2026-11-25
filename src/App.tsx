/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { PRODUCTS, Product } from './data/storeData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { AppliedTradeIn, TradeInSection } from './components/TradeInSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [appliedTradeIn, setAppliedTradeIn] = useState<AppliedTradeIn | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2600);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`${product.name} adicionado à sacola`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyTradeIn = (tradeIn: AppliedTradeIn, targetProductId: string) => {
    setAppliedTradeIn(tradeIn);
    const targetProduct = PRODUCTS.find((p) => p.id === targetProductId);
    if (targetProduct) {
      setCartItems((prev) => {
        const alreadyInCart = prev.some((item) => item.product.id === targetProduct.id);
        if (alreadyInCart) return prev;
        return [...prev, { product: targetProduct, quantity: 1 }];
      });
    }
    setIsCartOpen(true);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#0A0A0C] text-[#F4F4F5]">
        <Header cartCount={totalCount} onOpenCart={() => setIsCartOpen(true)} />

        <main className="flex-1">
          <HeroSection onSelectProduct={setSelectedProduct} />
          <CatalogSection
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
          <TradeInSection onApplyTradeIn={handleApplyTradeIn} />
          <AboutSection />
        </main>

        <Footer />

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={() => setCartItems([])}
          appliedTradeIn={appliedTradeIn}
          onClearTradeIn={() => setAppliedTradeIn(null)}
        />

        {/* Non-intrusive Cart Feedback Toast */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#18181D] border border-white/15 shadow-xl text-sm text-white"
          >
            <span className="w-5 h-5 rounded-full bg-[#E31B23] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </span>
            <span className="max-w-[260px] truncate">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="ml-2 text-xs font-semibold text-[#E31B23] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Abrir sacola
            </button>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}

