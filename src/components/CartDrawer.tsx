import { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { Product, STORE_INFO, buildWhatsAppUrl, formatBRL } from '../data/storeData';
import { AppliedTradeIn } from './TradeInSection';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  appliedTradeIn: AppliedTradeIn | null;
  onClearTradeIn: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedTradeIn,
  onClearTradeIn,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'retirada' | 'envio'>('retirada');
  const [paymentMode, setPaymentMode] = useState<'pix' | 'cartao'>('pix');
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotalPix = items.reduce(
    (sum, item) => sum + item.product.pricePix * item.quantity,
    0
  );
  const subtotalCard = items.reduce(
    (sum, item) => sum + item.product.priceCard * item.quantity,
    0
  );

  const tradeInCredit = appliedTradeIn?.estimatedCredit ?? 0;
  const finalPix = Math.max(0, subtotalPix - tradeInCredit);
  const finalCard = Math.max(0, subtotalCard - tradeInCredit);

  const buildOrderText = (orderId: string) => {
    const lines = [
      `Pedido / Orçamento Cut Games (${orderId})`,
      `Cliente: ${customerName || 'Não informado'}`,
      `Telefone: ${customerPhone || 'Não informado'}`,
      `Entrega: ${deliveryMethod === 'retirada' ? 'Retirada na loja' : 'Envio para todo o Brasil'}`,
      `Pagamento: ${paymentMode === 'pix' ? 'À vista no PIX' : 'Parcelado no cartão (até 18x)'}`,
      '',
      'Itens:',
      ...items.map(
        (i) =>
          `- ${i.quantity}x ${i.product.name} (${formatBRL(
            (paymentMode === 'pix' ? i.product.pricePix : i.product.priceCard) * i.quantity
          )})`
      ),
    ];

    if (appliedTradeIn) {
      lines.push(
        '',
        `Troca simulada: ${appliedTradeIn.deviceName} (${appliedTradeIn.conditionLabel}) — Crédito estimado: -${formatBRL(appliedTradeIn.estimatedCredit)}`
      );
    }

    lines.push(
      '',
      `Total estimado: ${formatBRL(paymentMode === 'pix' ? finalPix : finalCard)}`
    );

    return lines.join('\n');
  };

  const handleConfirmQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const randomCode = `CG-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderCode(randomCode);
  };

  const handleCopySummary = async () => {
    if (!confirmedOrderCode) return;
    try {
      await navigator.clipboard.writeText(buildOrderText(confirmedOrderCode));
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  };

  const handleResetAfterConfirm = () => {
    setConfirmedOrderCode(null);
    onClearCart();
    onClearTradeIn();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola e Orçamento Cut Games"
    >
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      <div className="w-full max-w-md bg-[#111115] border-l border-white/10 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#E31B23]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold text-white">
              Sua Sacola
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {confirmedOrderCode ? (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-[#18181D] border border-white/10">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  Orçamento Gerado
                </p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Pedido #{confirmedOrderCode} pronto para atendimento
                </h3>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                  Envie este pedido diretamente para o WhatsApp oficial da Cut Games ({STORE_INFO.phoneDisplay}) ou copie o resumo para confirmar estoque e atendimento.
                </p>
              </div>

              <pre className="p-4 rounded-xl bg-[#0A0A0C] border border-white/[0.08] text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
                {buildOrderText(confirmedOrderCode)}
              </pre>

              <div className="space-y-2.5">
                <a
                  href={buildWhatsAppUrl(buildOrderText(confirmedOrderCode))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Enviar pedido no WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg border border-white/15 hover:bg-white/5 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      <span>Resumo copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Copiar resumo do pedido</span>
                    </>
                  )}
                </button>

                <a
                  href={STORE_INFO.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg border border-white/10 hover:bg-white/5 text-zinc-300 text-sm font-medium transition-colors"
                >
                  <span>Chamar no Instagram @cutgamesoficial</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleResetAfterConfirm}
                  className="w-full px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
                >
                  Limpar sacola e voltar à loja
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#18181D] border border-white/[0.08] flex items-center justify-center text-zinc-400">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-base font-semibold text-white">Sua sacola está vazia</p>
                <p className="text-sm text-zinc-400 mt-1">
                  Adicione consoles ou acessórios do catálogo para montar seu pedido ou orçamento.
                </p>
              </div>
              <a
                href="#catalogo"
                onClick={onClose}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors"
              >
                Ver catálogo
              </a>
            </div>
          ) : (
            <>
              {/* Itemized Products */}
              <ul className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex gap-3.5 p-3.5 rounded-xl bg-[#18181D] border border-white/[0.08]"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#0A0A0C] shrink-0">
                      <ResilientImage
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          className="p-1 text-zinc-500 hover:text-red-400 cursor-pointer shrink-0"
                          aria-label={`Remover ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#0A0A0C]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="px-2.5 text-xs font-mono tabular-nums text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <p className="text-sm font-bold text-white tabular-nums">
                          {formatBRL(
                            (paymentMode === 'pix' ? product.pricePix : product.priceCard) *
                              quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Applied Trade-in Credit */}
              {appliedTradeIn && (
                <div className="p-4 rounded-xl bg-[#1A1315] border border-[#E31B23]/40 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#E31B23]">
                      Troca Aplicada
                    </p>
                    <p className="text-sm font-medium text-white mt-0.5">
                      {appliedTradeIn.deviceName}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {appliedTradeIn.conditionLabel}
                    </p>
                    <p className="text-sm font-semibold text-emerald-400 tabular-nums mt-1">
                      Crédito estimado: -{formatBRL(appliedTradeIn.estimatedCredit)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClearTradeIn}
                    className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                    aria-label="Remover troca aplicada"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              )}

              {/* Payment & Delivery Options + Customer Info */}
              <form id="quote-form" onSubmit={handleConfirmQuote} className="space-y-4 pt-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 mb-2">
                    Forma de pagamento
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('pix')}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                        paymentMode === 'pix'
                          ? 'bg-[#E31B23] border-[#E31B23] text-white'
                          : 'bg-[#0A0A0C] border-white/10 text-zinc-300 hover:border-white/25'
                      }`}
                    >
                      PIX / À vista
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('cartao')}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                        paymentMode === 'cartao'
                          ? 'bg-[#E31B23] border-[#E31B23] text-white'
                          : 'bg-[#0A0A0C] border-white/10 text-zinc-300 hover:border-white/25'
                      }`}
                    >
                      Cartão até 18x
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 mb-2">
                    Entrega ou retirada
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('retirada')}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                        deliveryMethod === 'retirada'
                          ? 'bg-[#22222A] border-white/30 text-white'
                          : 'bg-[#0A0A0C] border-white/10 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Retirar na loja
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('envio')}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                        deliveryMethod === 'envio'
                          ? 'bg-[#22222A] border-white/30 text-white'
                          : 'bg-[#0A0A0C] border-white/10 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Envio nacional
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cart-name" className="block text-xs text-zinc-400 mb-1">
                      Seu nome
                    </label>
                    <input
                      id="cart-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full h-10 px-3 rounded-lg bg-[#0A0A0C] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:border-[#E31B23] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="cart-phone" className="block text-xs text-zinc-400 mb-1">
                      WhatsApp / Contato
                    </label>
                    <input
                      id="cart-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(00) 90000-0000"
                      className="w-full h-10 px-3 rounded-lg bg-[#0A0A0C] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:border-[#E31B23] focus:outline-none"
                    />
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer Total & Submit */}
        {items.length > 0 && !confirmedOrderCode && (
          <div className="p-6 border-t border-white/[0.08] bg-[#0D0D11] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="tabular-nums">
                  {formatBRL(paymentMode === 'pix' ? subtotalPix : subtotalCard)}
                </span>
              </div>
              {appliedTradeIn && (
                <div className="flex justify-between text-emerald-400">
                  <span>Abatimento usado na troca</span>
                  <span className="tabular-nums">-{formatBRL(tradeInCredit)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-white/[0.08] text-white font-bold">
                <span>Total estimado</span>
                <span className="text-xl tabular-nums">
                  {formatBRL(paymentMode === 'pix' ? finalPix : finalCard)}
                </span>
              </div>
              {paymentMode === 'cartao' && (
                <p className="text-xs text-zinc-400 text-right tabular-nums">
                  ou em até 18x de {formatBRL(finalCard / 18)}
                </p>
              )}
            </div>

            <button
              type="submit"
              form="quote-form"
              className="w-full py-3.5 min-h-[44px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Gerar Pedido e Orçamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
