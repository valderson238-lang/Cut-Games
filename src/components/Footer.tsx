import { STORE_INFO } from '../data/storeData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

export function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-white/[0.08] py-12">
      <Reveal y={14} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-md overflow-hidden bg-white p-0.5 shrink-0">
                <ResilientImage
                  src={STORE_INFO.logo}
                  alt="Logo Cut Games"
                  className="w-full h-full object-contain"
                />
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                CUT <span className="text-[#E31B23]">GAMES</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-400 max-w-sm leading-relaxed">
              {STORE_INFO.tagline}. Consoles novos lacrados, seminovos revisados com garantia, controles e acessórios para todo o Brasil.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Navegação
            </p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Catálogo de Consoles
                </a>
              </li>
              <li>
                <a href="#troca" className="hover:text-white transition-colors">
                  Simulador de Troca
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Nossa História
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Canais Oficiais
                </a>
              </li>
            </ul>
          </div>

          {/* Official Channels */}
          <div className="md:col-span-4 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Contato e Redes Oficiais
            </p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a
                  href={STORE_INFO.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  WhatsApp: {STORE_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram ({STORE_INFO.handle})
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook Cut Games
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.links.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Perfil e Avaliações no Google
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Cut Games. Todos os direitos reservados.</p>
          <p>Parcelamento em até 18x · Aceitamos seu usado · Envio para todo o Brasil</p>
        </div>
      </Reveal>
    </footer>
  );
}
