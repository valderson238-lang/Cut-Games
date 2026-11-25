import { useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Category, Condition, PRODUCTS, Product, formatBRL } from '../data/storeData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface CatalogSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const CATEGORIES: Category[] = ['Todos', 'PlayStation', 'Nintendo', 'Xbox', 'Acessórios'];
const CONDITIONS: Condition[] = ['Todos', 'Lacrado', 'Seminovo Revisado'];

export function CatalogSection({ onSelectProduct, onAddToCart }: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [selectedCondition, setSelectedCondition] = useState<Condition>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.brand === selectedCategory;

      const matchesCondition =
        selectedCondition === 'Todos' ||
        (selectedCondition === 'Lacrado'
          ? product.condition === 'Lacrado' || product.condition === 'Novo'
          : product.condition === selectedCondition);

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.shortDesc.toLowerCase().includes(query);

      return matchesCategory && matchesCondition && matchesSearch;
    });
  }, [selectedCategory, selectedCondition, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('Todos');
    setSelectedCondition('Todos');
    setSearchQuery('');
  };

  return (
    <section id="catalogo" className="py-16 lg:py-20 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#E31B23]">
              Estoque Físico e Envio Nacional
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1.5 [text-wrap:balance]">
              Catálogo Oficial Cut Games
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
              Fotos reais dos aparelhos disponíveis na loja. Clique em qualquer item para ver todas as fotos, especificações e condições de garantia.
            </p>
          </div>

          <p className="text-xs text-zinc-400 tabular-nums shrink-0">
            Exibindo {filteredProducts.length} de {PRODUCTS.length} itens
          </p>
        </Reveal>

        {/* Interactive Filter & Search Toolbar */}
        <Reveal delay={0.06} className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Brand Segmented Control */}
            <div
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#131317] border border-white/[0.08]"
              role="group"
              aria-label="Filtrar por plataforma"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#E31B23] text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Condition Segmented Control */}
            <div
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#131317] border border-white/[0.08]"
              role="group"
              aria-label="Filtrar por condição"
            >
              {CONDITIONS.map((condition) => {
                const active = selectedCondition === condition;
                return (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => setSelectedCondition(condition)}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#22222A] text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {condition}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar console ou acessório..."
              aria-label="Buscar console ou acessório"
              className="w-full h-11 pl-10 pr-9 rounded-lg bg-[#131317] border border-white/[0.08] text-sm text-white placeholder:text-zinc-500 focus:border-[#E31B23] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </Reveal>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-xl bg-[#131317] border border-white/[0.08] p-12 text-center">
            <p className="text-base font-semibold text-white">
              Nenhum produto encontrado para essa combinação.
            </p>
            <p className="text-sm text-zinc-400 mt-1.5">
              Limpe os filtros para visualizar todos os consoles e acessórios disponíveis na loja.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Mostrar todo o catálogo
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product, idx) => {
              const installmentValue = product.priceCard / product.maxInstallments;
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 3) * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col rounded-xl bg-[#131317] border border-white/[0.08] hover:border-white/20 transition-all duration-150 hover:-translate-y-0.5 overflow-hidden"
                >
                  {/* Lead with Imagery (Uniform 4:3 Ratio) */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E0E12] cursor-pointer text-left"
                    aria-label={`Ver detalhes de ${product.name}`}
                  >
                    <ResilientImage
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {product.images.length > 1 && (
                      <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/75 text-[11px] font-medium text-zinc-200 tabular-nums">
                        +{product.images.length - 1} fotos
                      </span>
                    )}
                  </button>

                  {/* Card Body with Uniform Field Order */}
                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div>
                      {/* Clean Unboxed Metadata */}
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                        {product.brand} <span aria-hidden="true">·</span> {product.condition}
                      </p>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="mt-1.5 text-left cursor-pointer group-hover:text-white"
                      >
                        <h3 className="font-sans text-[17px] font-semibold text-zinc-100 leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                      </button>

                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {product.shortDesc}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                          À vista no PIX
                        </p>
                        <p className="text-xl font-bold text-white tabular-nums mt-0.5">
                          {formatBRL(product.pricePix)}
                        </p>
                        <p className="text-xs text-zinc-400 tabular-nums mt-0.5">
                          ou {product.maxInstallments}x de {formatBRL(installmentValue)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[40px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          aria-label={`Adicionar ${product.name} à sacola`}
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Sacola</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
