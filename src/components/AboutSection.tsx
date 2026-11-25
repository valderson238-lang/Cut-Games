import { CheckCircle2, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { STORE_INFO, buildWhatsAppUrl } from '../data/storeData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 lg:py-20 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Row: Owner Photo + Store Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Owner Photo */}
          <Reveal className="lg:col-span-5">
            <div className="h-full min-h-[360px] rounded-2xl overflow-hidden bg-[#131317] border border-white/[0.08] relative">
              <ResilientImage
                src={STORE_INFO.ownerPhoto}
                alt="Fundador da Cut Games em frente ao letreiro luminoso oficial da loja"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                  Atendimento Direto · Loja Física e Online
                </p>
                <p className="font-display text-2xl font-bold text-white mt-0.5">
                  Quem entende de games atende você de verdade
                </p>
              </div>
            </div>
          </Reveal>

          {/* Heritage Copy + Official Banner + Flyer */}
          <Reveal delay={0.08} className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#E31B23]">
                Nossa História
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1.5 [text-wrap:balance]">
                Transformando o Mundo dos Jogos Desde 2016
              </h2>
              <p className="mt-4 text-base text-zinc-300 leading-relaxed">
                A Cut Games nasceu da paixão por consoles e do compromisso de entregar uma compra segura, transparente e sem surpresas. Seja um PlayStation 5 Pro lacrado, um Nintendo Switch 2 para reunir família e amigos, ou um seminovo com limpeza interna e troca de pasta térmica feitas na bancada — cada aparelho sai pronto para anos de jogatina.
              </p>

              {/* Official Store Banner Strip */}
              <div className="mt-6 rounded-xl overflow-hidden border border-white/[0.08] bg-[#131317]">
                <ResilientImage
                  src={STORE_INFO.banner}
                  alt="Banner oficial Cut Games — Transformando o Mundo dos Jogos Desde 2016"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Social & Location Action Links */}
            <div id="contato" className="mt-6 pt-6 border-t border-white/[0.08]">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">
                Fale com a Cut Games ou visite nossos canais oficiais
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={buildWhatsAppUrl('Olá Cut Games! Gostaria de tirar uma dúvida sobre consoles e valores.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-[#131317] border border-[#E31B23]/40 hover:border-[#E31B23] transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">WhatsApp Oficial</p>
                    <p className="text-xs text-zinc-300 tabular-nums truncate">{STORE_INFO.phoneDisplay}</p>
                  </div>
                  <MessageCircle
                    className="w-4 h-4 text-[#E31B23] shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={STORE_INFO.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-[#131317] border border-white/[0.08] hover:border-[#E31B23] transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">Instagram</p>
                    <p className="text-xs text-zinc-400 truncate">@cutgamesoficial</p>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 text-zinc-400 group-hover:text-[#E31B23] shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={STORE_INFO.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-[#131317] border border-white/[0.08] hover:border-[#E31B23] transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">Facebook</p>
                    <p className="text-xs text-zinc-400 truncate">Página Oficial Cut Games</p>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 text-zinc-400 group-hover:text-[#E31B23] shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={STORE_INFO.links.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-[#131317] border border-white/[0.08] hover:border-[#E31B23] transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">Perfil no Google</p>
                    <p className="text-xs text-zinc-400 truncate">Localização e avaliações</p>
                  </div>
                  <MapPin
                    className="w-4 h-4 text-zinc-400 group-hover:text-[#E31B23] shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Store Commitments + Official Flyer Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-white/[0.08]">
          <Reveal className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#131317] border border-white/[0.08]">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#E31B23]">
                Padrão Cut Games
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Compromisso com transparência em cada console
              </h3>
              <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                Cada aparelho novo ou seminovo passa por conferência completa antes de chegar às suas mãos. Consulte as avaliações reais de clientes diretamente no nosso perfil oficial do Google.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E31B23] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Até 3 anos de garantia</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Segurança para consoles novos lacrados e suporte garantido nos seminovos.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E31B23] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Seminovos higienizados</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Limpeza interna completa e troca de pasta térmica feitas antes da venda.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E31B23] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Parcelamento em até 18x</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Condições no cartão de crédito ou desconto especial para pagamento via PIX.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E31B23] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Seu usado na troca</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Avaliamos seu console atual como parte do pagamento na compra do novo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-zinc-400">
                Quer conferir opiniões reais de quem já comprou na Cut Games?
              </p>
              <a
                href={STORE_INFO.links.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[40px] rounded-lg bg-[#E31B23] hover:bg-[#C8141B] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ver avaliações reais no Google</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Official Store Conditions Visual */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="h-full rounded-xl overflow-hidden bg-[#131317] border border-white/[0.08]">
              <ResilientImage
                src={STORE_INFO.promoFlyer}
                alt="Condições oficiais Cut Games: garantia, parcelamento em 18x, usado na troca e envio nacional"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
