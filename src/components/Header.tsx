import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Avalie seu Usado', href: '#troca' },
  { label: 'Sobre a Loja', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0C]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, no subtitles) */}
        <a
          href="#top"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
          aria-label="Cut Games Início"
        >
          <span className="w-9 h-9 rounded-md overflow-hidden bg-white p-0.5 shrink-0">
            <ResilientImage
              src={STORE_INFO.logo}
              alt="Logo Cut Games"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            CUT <span className="text-[#E31B23]">GAMES</span>
          </span>
        </a>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#E31B23] hover:after:w-full after:transition-all after:duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label={`Abrir sacola com ${cartCount} itens`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Sacola</span>
            <span className="tabular-nums font-mono text-xs bg-black/25 px-1.5 py-0.5 rounded">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 text-zinc-200 hover:bg-white/5 transition-colors cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t border-white/[0.08] bg-[#111115] px-4 py-4 space-y-1"
          aria-label="Navegação mobile"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
