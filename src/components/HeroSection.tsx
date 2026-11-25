import { useState } from 'react';
import { ArrowRight, CreditCard, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS, Product, formatBRL } from '../data/storeData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface HeroSectionProps {
  onSelectProduct: (product: Product) => void;
}

const SPOTLIGHT_IDS = ['ps5-pro-2tb', 'nintendo-switch-2-mario-kart', 'ps5-slim-astro-gt7', 'xbox-series-s-1tb'];

const STORE_PILLARS = [
  {
    icon: CreditCard,
    title: 'Parcelamento em até 18x',
    detail: 'Condições flexíveis no cartão ou desconto especial no PIX.',
  },
  {
    icon: RefreshCw,
    title: 'Aceitamos seu Usado',
    detail: 'Avaliação justa do seu console atual como parte do pagamento.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia Real de Loja',
    detail: 'Até 3 anos nos lacrados e seminovos 100% revisados.',
  },
  {
    icon: Truck,
    title: 'Envio para Todo o Brasil',
    detail: 'Embalagem reforçada, código de rastreio e retirada presencial.',
  },
];

export function HeroSection({ onSelectProduct }: HeroSectionProps) {
  const spotlightProducts = PRODUCTS.filter((p) => SPOTLIGHT_IDS.includes(p.id));
  const [activeIndex, setActiveIndex] = useState(0);
  const currentProduct = spotlightProducts[activeIndex] ?? PRODUCTS[0];

  return (
    <section id="top" className="relative border-b border-white/[0.08] bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
        {/* 2-Column Hero Split with Balanced Height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Storefront Proposition */}
          <Reveal immediate y={16} className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-zinc-400 mb-4">
                Desde 2016 <span aria-hidden="true">·</span> @cutgamesoficial <span aria-hidden="true">·</span> Pronta Entrega
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.02] tracking-tight text-white [text-wrap:balance] max-w-xl">
                Sua próxima geração começa na <span className="text-[#E31B23]">Cut Games</span>.
              </h1>

              <p className="mt-5 text-base sm:text-[17px] text-zinc-300 leading-relaxed max-w-xl">
                Consoles nacionais lacrados, seminovos higienizados com troca de pasta térmica, controles e acessórios temáticos. Atendimento especializado de quem vive videogame todos os dias.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#catalogo"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#troca"
                  className="inline-flex items-center justify-center px-5 py-3.5 min-h-[44px] rounded-lg border border-white/15 hover:border-white/30 bg-[#131317] hover:bg-[#1A1A20] text-zinc-100 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  Avaliar meu usado na troca
                </a>
              </div>
            </div>

            {/* Quiet Store Credibility Line */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400">
              <span>PlayStation 5 Pro &amp; Slim</span>
              <span aria-hidden="true">·</span>
              <span>Nintendo Switch 2</span>
              <span aria-hidden="true">·</span>
              <span>Xbox Series</span>
              <span aria-hidden="true">·</span>
              <span>Seminovos Revisados</span>
            </div>
          </Reveal>

          {/* Right Column: Interactive Real Storefront Product Spotlight */}
          <Reveal immediate delay={0.1} y={16} className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[340px] sm:min-h-[420px] rounded-xl overflow-hidden bg-[#131317] border border-white/[0.08] group">
              <ResilientImage
                src={currentProduct.images[0]}
                alt={currentProduct.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="eager"
              />
              {/* Measured Contrast Scrim */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-300">
                    {currentProduct.brand} <span aria-hidden="true">·</span> {currentProduct.condition}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5 leading-tight">
                    {currentProduct.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-200 tabular-nums font-medium">
                    {formatBRL(currentProduct.pricePix)} no PIX{' '}
                    <span className="text-zinc-400">
                      · ou em até {currentProduct.maxInstallments}x no cartão
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct(currentProduct)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Ver produto</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Clean Segmented Spotlight Selector */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist" aria-label="Destaques Cut Games">
              {spotlightProducts.map((item, idx) => {
                const isActive = idx === activeIndex;
                const shortLabel =
                  item.id === 'ps5-pro-2tb'
                    ? 'PS5 Pro 2TB'
                    : item.id === 'nintendo-switch-2-mario-kart'
                      ? 'Switch 2 Bundle'
                      : item.id === 'ps5-slim-astro-gt7'
                        ? 'PS5 Slim Bundle'
                        : 'Xbox Series S 1TB';

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer border truncate ${
                      isActive
                        ? 'bg-[#1A1A20] border-[#E31B23] text-white'
                        : 'bg-[#111115] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/15'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Full-Width 4-Column Store Trust Strip Below Split */}
        <div className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={idx * 0.06} y={14} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#131317] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#E31B23]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-white">{pillar.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{pillar.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
