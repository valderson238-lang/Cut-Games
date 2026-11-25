import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, RefreshCw } from 'lucide-react';
import { PRODUCTS, TRADE_IN_DEVICES, buildWhatsAppUrl, formatBRL } from '../data/storeData';
import { Reveal } from './Reveal';

export interface AppliedTradeIn {
  deviceName: string;
  conditionLabel: string;
  estimatedCredit: number;
}

interface TradeInSectionProps {
  onApplyTradeIn: (tradeIn: AppliedTradeIn, targetProductId: string) => void;
}

const CONDITION_MULTIPLIERS = [
  { id: 'complete', label: 'Completo com caixa e controle original', factor: 1.0 },
  { id: 'good', label: 'Console + 1 controle original (sem caixa)', factor: 0.88 },
  { id: 'fair', label: 'Uso visível ou detalhes estéticos leves', factor: 0.75 },
];

export function TradeInSection({ onApplyTradeIn }: TradeInSectionProps) {
  const targetConsoles = useMemo(
    () => PRODUCTS.filter((p) => p.brand !== 'Acessórios'),
    []
  );

  const [selectedDeviceId, setSelectedDeviceId] = useState(TRADE_IN_DEVICES[1].id);
  const [selectedConditionId, setSelectedConditionId] = useState(CONDITION_MULTIPLIERS[0].id);
  const [targetProductId, setTargetProductId] = useState(targetConsoles[0].id);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const device = TRADE_IN_DEVICES.find((d) => d.id === selectedDeviceId) ?? TRADE_IN_DEVICES[0];
  const condition =
    CONDITION_MULTIPLIERS.find((c) => c.id === selectedConditionId) ?? CONDITION_MULTIPLIERS[0];
  const targetProduct =
    targetConsoles.find((p) => p.id === targetProductId) ?? targetConsoles[0];

  const estimatedCredit = Math.round((device.baseValue * condition.factor) / 50) * 50;
  const remainingBalance = Math.max(0, targetProduct.pricePix - estimatedCredit);

  const handleApply = () => {
    onApplyTradeIn(
      {
        deviceName: device.name,
        conditionLabel: condition.label,
        estimatedCredit,
      },
      targetProduct.id
    );
    setAppliedSuccess(true);
    window.setTimeout(() => setAppliedSuccess(false), 3000);
  };

  return (
    <section
      id="troca"
      className="py-16 lg:py-20 bg-[#0E0E12] border-y border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Explanation */}
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#E31B23]">
              Avaliação Transparente Cut Games
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1.5 [text-wrap:balance]">
              Use seu console atual como parte do pagamento
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              Quer dar upgrade para o PS5 Pro, PS5 Slim ou Nintendo Switch 2? Na Cut Games você não precisa vender seu aparelho por conta própria. Faça uma pré-simulação aqui e leve para a sacola de orçamento.
            </p>

            <div className="mt-8 space-y-4 pt-6 border-t border-white/[0.08] text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#E31B23] font-semibold mt-0.5">01.</span>
                <p>Informe qual videogame você possui hoje e o estado de conservação.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#E31B23] font-semibold mt-0.5">02.</span>
                <p>Escolha o console da Cut Games para ver a diferença estimada no PIX ou em até 18x.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-[#E31B23] font-semibold mt-0.5">03.</span>
                <p>Aplique a simulação na sacola e finalize a avaliação rápida com nossa equipe.</p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Interactive Simulator Card */}
          <Reveal delay={0.1} className="lg:col-span-7 rounded-2xl bg-[#131317] border border-white/[0.08] p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Current Device */}
              <div>
                <label
                  htmlFor="tradein-device"
                  className="block text-xs font-medium uppercase tracking-wide text-zinc-400 mb-2"
                >
                  Seu console atual
                </label>
                <select
                  id="tradein-device"
                  value={selectedDeviceId}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-sm text-white focus:border-[#E31B23] focus:outline-none cursor-pointer"
                >
                  {TRADE_IN_DEVICES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Console */}
              <div>
                <label
                  htmlFor="tradein-target"
                  className="block text-xs font-medium uppercase tracking-wide text-zinc-400 mb-2"
                >
                  Console desejado na Cut Games
                </label>
                <select
                  id="tradein-target"
                  value={targetProductId}
                  onChange={(e) => setTargetProductId(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-[#0A0A0C] border border-white/10 text-sm text-white focus:border-[#E31B23] focus:outline-none cursor-pointer"
                >
                  {targetConsoles.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({formatBRL(item.pricePix)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Condition Selector */}
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 mb-2.5">
                Estado de conservação
              </p>
              <div className="grid grid-cols-1 gap-2">
                {CONDITION_MULTIPLIERS.map((cond) => {
                  const active = cond.id === selectedConditionId;
                  return (
                    <button
                      key={cond.id}
                      type="button"
                      onClick={() => setSelectedConditionId(cond.id)}
                      className={`w-full px-4 py-3 rounded-lg text-left text-sm transition-colors cursor-pointer border flex items-center justify-between gap-3 ${
                        active
                          ? 'bg-[#1D1316] border-[#E31B23] text-white font-medium'
                          : 'bg-[#0A0A0C] border-white/[0.08] text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      <span>{cond.label}</span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          active ? 'border-[#E31B23] bg-[#E31B23]' : 'border-zinc-600'
                        }`}
                        aria-hidden="true"
                      >
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Calculation Summary */}
            <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-1">
                <p className="text-xs text-zinc-400">
                  Crédito estimado no seu usado:{' '}
                  <span className="text-emerald-400 font-semibold tabular-nums">
                    - {formatBRL(estimatedCredit)}
                  </span>
                </p>
                <p className="text-xs text-zinc-400">Diferença estimada no PIX</p>
                <p className="text-3xl font-bold text-white tabular-nums">
                  {formatBRL(remainingBalance)}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-2.5">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[44px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  {appliedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Aplicado à Sacola</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" aria-hidden="true" />
                      <span>Levar Troca para a Sacola</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
                <a
                  href={buildWhatsAppUrl(
                    `Olá Cut Games! Quero avaliar meu ${device.name} (${condition.label}) na troca pelo ${targetProduct.name}. Simulação estimada: -${formatBRL(estimatedCredit)}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#E31B23]" aria-hidden="true" />
                  <span>Ou enviar simulação direto no WhatsApp</span>
                </a>
                <p className="text-[11px] text-zinc-500">
                  Valor final confirmado após conferência técnica rápida na loja ou por vídeo.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
