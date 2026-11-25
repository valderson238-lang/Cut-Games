import { useEffect, useState } from 'react';
import { Check, CreditCard, MessageCircle, RefreshCw, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { Product, buildWhatsAppUrl, formatBRL } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeImage = product.images[selectedImageIdx] ?? product.images[0];
  const installmentValue = product.priceCard / product.maxInstallments;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111115] border border-white/10 shadow-2xl">
        {/* Top Close Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#111115]/95 backdrop-blur border-b border-white/[0.08]">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            {product.brand} <span aria-hidden="true">·</span> {product.condition}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Fechar detalhes do produto"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* 2-Column Contiguous PDP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 space-y-3">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#0A0A0C] border border-white/[0.08]">
              <ResilientImage
                src={activeImage}
                alt={`${product.name} — foto ${selectedImageIdx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5">
                {product.images.map((img, idx) => {
                  const active = idx === selectedImageIdx;
                  return (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        active
                          ? 'border-[#E31B23] ring-1 ring-[#E31B23]'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Ver foto ${idx + 1} de ${product.name}`}
                    >
                      <ResilientImage
                        src={img}
                        alt={`${product.name} miniatura ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-400">{product.availability}</p>
              <h2
                id="pdp-title"
                className="font-display text-3xl font-bold text-white mt-1 leading-tight"
              >
                {product.name}
              </h2>

              {/* Pricing Box */}
              <div className="mt-5 p-4 rounded-xl bg-[#18181D] border border-white/[0.08]">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-400">Valor promocional no PIX</p>
                    <p className="text-3xl font-bold text-white tabular-nums mt-0.5">
                      {formatBRL(product.pricePix)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400">Parcelado no cartão</p>
                    <p className="text-sm font-semibold text-zinc-200 tabular-nums mt-0.5">
                      {product.maxInstallments}x de {formatBRL(installmentValue)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <ul className="mt-5 space-y-2.5">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-[#E31B23] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              {/* Trust Notes */}
              <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0" aria-hidden="true" />
                  <span>{product.warranty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-zinc-300 shrink-0" aria-hidden="true" />
                  <span>Parcelamento em até 18x no cartão de crédito</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-zinc-300 shrink-0" aria-hidden="true" />
                  <span>Aceitamos seu console usado como parte do pagamento</span>
                </div>
              </div>
            </div>

            {/* Primary Action */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Adicionar à Sacola</span>
              </button>
              <a
                href={buildWhatsAppUrl(
                  `Olá Cut Games! Tenho interesse no ${product.name} (${formatBRL(product.pricePix)} no PIX).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 min-h-[44px] rounded-lg border border-white/15 hover:bg-white/5 text-zinc-200 text-sm font-medium transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#E31B23]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
