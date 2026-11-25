export type Category = 'Todos' | 'PlayStation' | 'Nintendo' | 'Xbox' | 'Acessórios';
export type Condition = 'Todos' | 'Lacrado' | 'Seminovo Revisado' | 'Novo';

export interface Product {
  id: string;
  name: string;
  brand: Exclude<Category, 'Todos'>;
  condition: Exclude<Condition, 'Todos'>;
  availability: string;
  pricePix: number;
  priceCard: number;
  maxInstallments: number;
  shortDesc: string;
  description: string;
  specs: string[];
  warranty: string;
  images: string[];
  featured?: boolean;
}

export interface TradeInDevice {
  id: string;
  name: string;
  brand: string;
  baseValue: number;
}

export const STORE_INFO = {
  name: 'Cut Games',
  tagline: 'Transformando o Mundo dos Jogos Desde 2016',
  handle: '@cutgamesoficial',
  website: 'www.cutgames.com.br',
  phoneDisplay: '+55 11 98262-5049',
  whatsappNumber: '5511982625049',
  logo: '/assets/aistudio/channels4_profile_ea41b8e1.jpg',
  banner: '/assets/aistudio/channels4_banner_21940c95.jpg',
  ownerPhoto: '/assets/aistudio/images_46d843b9.jpeg',
  promoFlyer:
    '/assets/aistudio/___PS5_PRO_2TB_DISPON_VEL_NA_CUT_GAMES_____Novo__lacrado_e_nacional______Pronta_entrega___Brindes_especiais___Aceitamos_seu_vi_JPG__1_5fceb81f.jpg',
  links: {
    whatsapp: 'https://wa.me/5511982625049',
    instagram: 'https://www.instagram.com/cutgamesoficial?bqrl=MnplbGVrc252Nzlw',
    facebook: 'https://www.facebook.com/share/1L6kmUvCUQ/',
    google: 'https://share.google/aTZILWMe8WewbaLUY',
  },
};

export function buildWhatsAppUrl(message?: string): string {
  if (!message) return STORE_INFO.links.whatsapp;
  return `${STORE_INFO.links.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ps5-pro-2tb',
    name: 'PlayStation 5 Pro 2TB — Edição Nacional',
    brand: 'PlayStation',
    condition: 'Lacrado',
    availability: 'Pronta entrega · Brindes especiais',
    pricePix: 6299,
    priceCard: 6999,
    maxInstallments: 18,
    shortDesc: 'SSD de 2TB, Ray Tracing avançado e PlayStation Spectral Super Resolution.',
    description:
      'Console novo, lacrado e homologado nacionalmente. A versão mais poderosa da família PlayStation com 2TB de armazenamento interno, entrega imediata na Cut Games e brindes exclusivos na retirada ou envio.',
    specs: [
      'Armazenamento SSD ultrarrápido de 2 TB',
      'Edição Nacional lacrada com nota e garantia',
      'Resolução 4K 120Hz com PSSR e Ray Tracing aprimorado',
      'Acompanha 1 controle DualSense sem fio e cabos originais',
    ],
    warranty: 'Até 3 anos de garantia com suporte Cut Games',
    images: [
      '/assets/aistudio/___PS5_PRO_2TB_DISPON_VEL_NA_CUT_GAMES_____Novo__lacrado_e_nacional______Pronta_entrega___Brindes_especiais___Aceitamos_seu_vide_JPG__0897c6a7.jpg',
      '/assets/aistudio/___PS5_PRO_2TB_DISPON_VEL_NA_CUT_GAMES_____Novo__lacrado_e_nacional______Pronta_entrega___Brindes_especiais___Aceitamos_seu_vi_JPG__1_5fceb81f.jpg',
    ],
    featured: true,
  },
  {
    id: 'nintendo-switch-2-mario-kart',
    name: 'Nintendo Switch 2 + Mario Kart World',
    brand: 'Nintendo',
    condition: 'Lacrado',
    availability: 'Pronta entrega · Inclui 3 meses Online',
    pricePix: 4299,
    priceCard: 4799,
    maxInstallments: 18,
    shortDesc: 'Bundle oficial com download completo de Mario Kart World e Joy-Con 2 magnéticos.',
    description:
      'A nova geração híbrida da Nintendo já chegou na Cut Games. Este bundle especial inclui o console Nintendo Switch 2 lacrado, download completo do novo Mario Kart World e 3 meses de assinatura individual Nintendo Switch Online.',
    specs: [
      'Inclui código oficial de download de Mario Kart World',
      '3 meses de assinatura individual Nintendo Switch Online',
      'Novos controles Joy-Con 2 com encaixe magnético',
      'Modo portátil, semiportátil e TV em alta definição',
    ],
    warranty: 'Até 3 anos de garantia com suporte Cut Games',
    images: [
      '/assets/aistudio/___O_NINTENDO_SWITCH_2_J__EST__NA_CUT_GAMES_____A_divers_o_ganhou_um_novo_n_vel_____J__imaginou_reunir_a_fam_lia_e_os_amigos_para_di_JPG__1_898b2ab8.jpg',
      '/assets/aistudio/___O_NINTENDO_SWITCH_2_J__EST__NA_CUT_GAMES_____A_divers_o_ganhou_um_novo_n_vel_____J__imaginou_reunir_a_fam_lia_e_os_amigos_para_di_JPG__3_32f84409.jpg',
      '/assets/aistudio/___O_NINTENDO_SWITCH_2_J__EST__NA_CUT_GAMES_____A_divers_o_ganhou_um_novo_n_vel_____J__imaginou_reunir_a_fam_lia_e_os_amigos_para_di_JPG__2_1e54d34e.jpg',
      '/assets/aistudio/___O_NINTENDO_SWITCH_2_J__EST__NA_CUT_GAMES_____A_divers_o_ganhou_um_novo_n_vel_____J__imaginou_reunir_a_fam_lia_e_os_amigos_para_disp_JPG__3e323b55.jpg',
    ],
    featured: true,
  },
  {
    id: 'ps5-slim-astro-gt7',
    name: 'PS5 Slim Digital 825GB — Bundle Astro Bot & GT7',
    brand: 'PlayStation',
    condition: 'Lacrado',
    availability: 'Pronta entrega · 2 jogos inclusos',
    pricePix: 3699,
    priceCard: 4149,
    maxInstallments: 18,
    shortDesc: 'Edição Digital compacta acompanhada de Astro Bot e Gran Turismo 7.',
    description:
      'Entre na nova geração com dois dos maiores sucessos do PlayStation 5 já inclusos na caixa. Aparelho nacional lacrado, design Slim e estoque físico disponível para envio imediato.',
    specs: [
      'Armazenamento SSD de 825 GB',
      'Acompanha códigos completos de Astro Bot e Gran Turismo 7',
      'Saída de vídeo 4K 120Hz com HDR',
      'Controle DualSense original incluso na caixa',
    ],
    warranty: 'Até 3 anos de garantia com suporte Cut Games',
    images: [
      '/assets/aistudio/___PLAYSTATION_5_SLIM_DIGITAL_825GB___PRONTA_ENTREGA_NA_CUT_GAMES________Chegou_a_hora_de_garantir_seu_PS5_e_entrar_de_vez_na_nova_ger_JPG__2_bec7fea3.jpg',
      '/assets/aistudio/___PLAYSTATION_5_SLIM_DIGITAL_825GB___PRONTA_ENTREGA_NA_CUT_GAMES________Chegou_a_hora_de_garantir_seu_PS5_e_entrar_de_vez_na_nova_gera_JPG__e6ce05a3.jpg',
    ],
    featured: true,
  },
  {
    id: 'ps5-slim-digital',
    name: 'PlayStation 5 Slim Digital 825GB',
    brand: 'PlayStation',
    condition: 'Lacrado',
    availability: 'Pronta entrega · Estoque físico',
    pricePix: 3399,
    priceCard: 3799,
    maxInstallments: 18,
    shortDesc: 'Design compacto, SSD de 825GB e resposta tátil do DualSense.',
    description:
      'Console PlayStation 5 Edição Digital Slim novo e lacrado. Ideal para quem joga pela PlayStation Store ou PS Plus, com carregamentos instantâneos e áudio 3D Tempest.',
    specs: [
      'SSD de 825 GB de alta velocidade',
      'Design Slim mais leve e silencioso',
      'Suporte a 4K, 120fps e HDR10',
      'Aceitamos seu console anterior como parte do pagamento',
    ],
    warranty: 'Até 3 anos de garantia com suporte Cut Games',
    images: [
      '/assets/aistudio/___PLAYSTATION_5_SLIM_DIGITAL_825GB___PRONTA_ENTREGA_NA_CUT_GAMES________Chegou_a_hora_de_garantir_seu_PS5_e_entrar_de_vez_na_nova_ger_JPG__1_6892e470.jpg',
      '/assets/aistudio/___PLAYSTATION_5_SLIM_DIGITAL_825GB___PRONTA_ENTREGA_NA_CUT_GAMES________Chegou_a_hora_de_garantir_seu_PS5_e_entrar_de_vez_na_nova_gera_JPG__e6ce05a3.jpg',
    ],
  },
  {
    id: 'xbox-series-s-1tb',
    name: 'Xbox Series S 1TB SSD — Edição Branca',
    brand: 'Xbox',
    condition: 'Seminovo Revisado',
    availability: 'Última unidade · Com R$ 100 OFF aplicado',
    pricePix: 2299,
    priceCard: 2599,
    maxInstallments: 18,
    shortDesc: 'Com caixa original, controle original e 1TB de armazenamento SSD.',
    description:
      'Oportunidade única na Cut Games: Xbox Series S com 1TB de SSD interno na cor branca, acompanhado de caixa original e controle sem fio original em estado impecável. Testado e revisado pela nossa bancada.',
    specs: [
      'SSD NVMe de 1 TB (dobro do espaço padrão)',
      'Acompanha caixa original e controle Xbox Series original',
      'Quick Resume e suporte até 120fps para Game Pass',
      'Desconto promocional de R$ 100 já aplicado no valor',
    ],
    warranty: 'Garantia de loja Cut Games com revisão completa',
    images: [
      '/assets/aistudio/___SUPER_PROMO__O_NA_CUT_GAMES________Xbox_Series_S_1TB___Com_caixa___controle_original____APENAS_1_UNIDADE_COM_R_100_DE_DESCONTO__JPG__d0f9759c.jpg',
      '/assets/aistudio/___SUPER_PROMO__O_NA_CUT_GAMES________Xbox_Series_S_1TB___Com_caixa___controle_original____APENAS_1_UNIDADE_COM_R_100_DE_DESCONT_JPG__1_05b4f4b3.jpg',
    ],
  },
  {
    id: 'ps4-fat-500gb',
    name: 'PlayStation 4 Fat 500GB — Revisado',
    brand: 'PlayStation',
    condition: 'Seminovo Revisado',
    availability: 'Promoção · Limpeza e pasta térmica novas',
    pricePix: 1499,
    priceCard: 1699,
    maxInstallments: 18,
    shortDesc: 'Higienizado, troca de pasta térmica realizada e controle DualShock 4 incluso.',
    description:
      'Seminovo com padrão Cut Games de qualidade: passou por limpeza interna completa, higienização externa e troca de pasta térmica para rodar silencioso e com temperatura ideal. Pronto para jogar.',
    specs: [
      'HD de 500 GB testado e formatado',
      'Limpeza interna completa + troca de pasta térmica recente',
      'Acompanha 1 controle DualShock 4, cabo HDMI e cabo de força',
      'Ideal para quem busca custo-benefício com garantia real',
    ],
    warranty: 'Garantia de loja Cut Games pós-revisão',
    images: [
      '/assets/aistudio/__DISPON_VEL_NA_PROMO__O_____PlayStation_4_Fat_500GB___Limpeza_completa_realizada___Troca_de_pasta_t_rmica_e_higieniza__o___Acompanha_JPG__832810d9.jpg',
      '/assets/aistudio/__DISPON_VEL_NA_PROMO__O_____PlayStation_4_Fat_500GB___Limpeza_completa_realizada___Troca_de_pasta_t_rmica_e_higieniza__o___Acompan_JPG__1_94c0f644.jpg',
    ],
  },
  {
    id: 'suporte-resident-evil',
    name: 'Suporte de Controle Temático Resident Evil',
    brand: 'Acessórios',
    condition: 'Novo',
    availability: 'Pronta entrega · Compatível DualSense, DualShock e Xbox',
    pricePix: 119,
    priceCard: 135,
    maxInstallments: 6,
    shortDesc: 'Escultura detalhada inspirada em Resident Evil para expor seu controle no setup.',
    description:
      'Deixe sua estante ou mesa gamer com personalidade única. Suporte temático de alta resistência com acabamento detalhado, compatível com controles DualSense (PS5), DualShock 4 (PS4), Xbox Series e Switch Pro.',
    specs: [
      'Compatível com controles PlayStation, Xbox e Nintendo',
      'Base estável com gravação em relevo Resident Evil',
      'Disponível em acabamento Preto Fosco ou Cinza Grafite',
      'Excelente item colecionável para setups gamers',
    ],
    warranty: 'Garantia contra defeitos de fabricação',
    images: [
      '/assets/aistudio/______SUPORTE_DE_CONTROLE_RESIDENT_EVIL_____Deixe_seu_setup_ainda_mais_incr_vel_com_esse_suporte_tem_tico_inspirado_em_Resident_Evil____JPG__a9160995.jpg',
    ],
  },
];

export const TRADE_IN_DEVICES: TradeInDevice[] = [
  { id: 'ps4-fat', name: 'PlayStation 4 Fat 500GB / 1TB', brand: 'PlayStation', baseValue: 950 },
  { id: 'ps4-slim', name: 'PlayStation 4 Slim 500GB / 1TB', brand: 'PlayStation', baseValue: 1150 },
  { id: 'ps4-pro', name: 'PlayStation 4 Pro 1TB', brand: 'PlayStation', baseValue: 1450 },
  { id: 'xbox-series-s', name: 'Xbox Series S 512GB / 1TB', brand: 'Xbox', baseValue: 1350 },
  { id: 'switch-v2', name: 'Nintendo Switch V2 / OLED', brand: 'Nintendo', baseValue: 1300 },
  { id: 'ps5-base', name: 'PlayStation 5 Standard / Slim', brand: 'PlayStation', baseValue: 2450 },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}
