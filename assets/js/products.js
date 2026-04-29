const PRODUCT_ALIASES = {
  'sony-fx3-full-frame': 'sony-fx3',
  'canon-eos-r50': 'canon-eos-r5',
  'bateria-dji-mavic-3-intelligent': 'dji-mavic-3-intelligent-flight-battery',
  'dji-mavic-3-nd-filter-set': 'dji-mavic-3-pro-nd-filter-set'
};

const PRODUCT_CATALOG = {
  'dji-mavic-3-pro': {
    name: 'DJI Mavic 3 Pro', category: 'Drone Profissional', anchor: 'drones', availability: 'Disponivel', rating: '4.9', reviewCount: 238,
    tags: ['Triple-Cam', '5.1K', '43 min'],
    description: 'Drone flagship da DJI com sistema tri-camera Hasselblad e autonomia alta para publicidade, cinema leve e captacao aerea premium.',
    gallery: [
      ['../assets/img/DJIMavic3Pro.png', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80'],
      ['https://dji-official-fe.djicdn.com/dps/0b2a2d5898ef82fd56dde53a55c86e2b.jpg', 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=900&q=80'],
      ['https://images.unsplash.com/photo-1506947411487-a56738267384?w=900&q=80', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80']
    ],
    rent: [['Diaria', 'Minimo 1 dia', 'R$650', '/dia', true], ['Semanal', '7 dias com 15% off', 'R$3.860', '/semana'], ['Mensal', '30 dias com 30% off', 'R$13.650', '/mes']],
    buyPrice: 'R$16.999', installments: 'ou <strong>12x de R$1.567</strong> sem juros no cartao',
    delivery: [['??', 'Entrega express', 'Receba em ate 48h para todo o Brasil', 'GRATIS'], ['??', 'Suporte 24h', 'Time tecnico acompanha todo o aluguel']],
    specs: [['Sensor', '4/3 CMOS Hasselblad'], ['Video', '5.1K/50 fps'], ['Tele media', '70 mm'], ['Tele longa', '166 mm'], ['Autonomia', '43 minutos'], ['Transmissao', 'O3+ ate 15 km']],
    includes: [['??', 'Drone Mavic 3 Pro'], ['??', 'Controle RC'], ['??', '3 baterias'], ['?', 'Hub de carga'], ['??', 'Bag premium']],
    reviews: [['Marcos Rodrigues', '15 de marco de 2026', '?????', 'Chegou calibrado, com kit completo e imagem muito acima do padrao.'], ['Ana Carolina', '2 de fevereiro de 2026', '?????', 'Reserva rapida e resultado excelente em casamento e publicidade.']]
  },
  'dji-air-3s': {
    name: 'DJI Air 3S', category: 'Drone Compacto', anchor: 'drones', availability: 'Disponivel', rating: '4.8', reviewCount: 181,
    tags: ['1 polegada', '4K/120', '45 min'],
    description: 'Drone intermediario premium com camera principal de 1 polegada e tele media dedicada para travel, conteudo de marca e operacao agil.',
    gallery: [
      ['https://se-cdn.djiits.com/tpc/uploads/carousel/image/d4a1adddd5c1ebe61cbd4b5b54107345@ultra.webp', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=900&q=80'],
      ['https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=900&q=80', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80'],
      ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=900&q=80', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80']
    ],
    rent: [['Diaria', 'Ideal para job pontual', 'R$320', '/dia', true], ['Semanal', '7 dias com 12% off', 'R$1.970', '/semana'], ['Mensal', '30 dias com 28% off', 'R$6.900', '/mes']],
    buyPrice: 'R$8.499', installments: 'ou <strong>12x de R$785</strong> sem juros no cartao',
    delivery: [['??', 'Entrega expressa', 'Despacho prioritario para capitais', '48H'], ['???', 'Config pronto para voo', 'Sensores e firmware conferidos']],
    specs: [['Sensor', '1 polegada CMOS'], ['Video', '4K/120 fps HDR'], ['Tele', '70 mm equivalente'], ['Foto', 'ate 50 MP'], ['Autonomia', 'ate 45 minutos'], ['Deteccao', 'Omnidirecional']],
    includes: [['??', 'Drone Air 3S'], ['??', 'Controle DJI RC'], ['??', '2 baterias'], ['?', 'Carregador'], ['??', 'Bolsa compacta']],
    reviews: [['Julia Prado', '10 de marco de 2026', '?????', 'Perfeito para travel content e publicidade leve.'], ['Rafael Nunes', '27 de fevereiro de 2026', '?????', 'A camera de 1 polegada entrega imagem limpa e muito boa.']]
  },
  'dji-mini-4-pro': {
    name: 'DJI Mini 4 Pro', category: 'Mini Drone', anchor: 'drones', availability: 'Disponivel', rating: '4.8', reviewCount: 209,
    tags: ['249 g', '4K/60', 'ActiveTrack 360'],
    description: 'Mini drone premium para creators que precisam de portabilidade real com captura vertical, rastreio completo e imagem forte para redes sociais e turismo.',
    gallery: [
      ['https://dji-official-fe.djicdn.com/dps/6c8d9929c43c6c0a4cf45c3e0d66a58c.jpg', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80'],
      ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80', 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=900&q=80'],
      ['https://images.unsplash.com/photo-1506947411487-a56738267384?w=900&q=80', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80']
    ],
    rent: [['Diaria', 'Ideal para viagens e reels', 'R$200', '/dia', true], ['Semanal', '7 dias com 10% off', 'R$1.260', '/semana'], ['Mensal', '30 dias com 25% off', 'R$4.500', '/mes']],
    buyPrice: 'R$5.499', installments: 'ou <strong>12x de R$508</strong> sem juros no cartao',
    delivery: [['??', 'Entrega rapida', 'Kit leve com envio agil', '48H'], ['??', 'Facil de pilotar', 'Configurado para voos assistidos']],
    specs: [['Sensor', '1/1.3 polegada CMOS'], ['Video', '4K/60 fps HDR'], ['Vertical', 'Captura vertical real'], ['Tracking', 'ActiveTrack 360'], ['Peso', 'menos de 249 g'], ['Autonomia', 'ate 34 min']],
    includes: [['??', 'Mini 4 Pro'], ['??', 'Controle RC 2'], ['??', '2 baterias'], ['?', 'Hub compacto'], ['??', 'Bag slim']],
    reviews: [['Lais Menezes', '11 de abril de 2026', '?????', 'Excelente para reels e viagem.'], ['Bruno Esteves', '5 de marco de 2026', '?????', 'Tracking muito bom para captacao de esportes leves.']]
  },
  'dji-avata-2': {
    name: 'DJI Avata 2', category: 'Drone FPV', anchor: 'drones', availability: 'Sob consulta', rating: '4.7', reviewCount: 94,
    tags: ['FPV', '4K', 'Acro'],
    description: 'Drone FPV para trajetorias imersivas em velocidade, com visual dinamico para esportes, turismo e branded content.',
    gallery: [
      ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=900&q=80', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80'],
      ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80', 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=900&q=80']
    ],
    rent: [['Diaria', 'Inclui kit FPV', 'R$300', '/dia', true], ['Semanal', '7 dias com 10% off', 'R$1.890', '/semana']],
    buyPrice: 'R$6.990', installments: 'ou <strong>12x de R$646</strong> sem juros no cartao',
    delivery: [['??', 'Kit imersivo', 'Compativel com goggles e motion controller', 'FPV'], ['???', 'Orientacao de voo', 'Recomendado para piloto com experiencia']],
    specs: [['Video', '4K estabilizado'], ['Perfil', 'D-Log M'], ['Formato', 'FPV protegido'], ['Controle', 'Motion / RC'], ['Uso', 'Movimentos rapidos'], ['Perfil de voo', 'Imersivo']],
    includes: [['??', 'Avata 2'], ['??', 'Goggles'], ['??', 'Controlador'], ['??', 'Baterias extras']],
    reviews: [['Vitor Sena', '6 de abril de 2026', '?????', 'Sensacao de voo absurda e imagens muito dinamicas.'], ['Gabi Paes', '13 de fevereiro de 2026', '?????', 'Para quem ja tem nocao de FPV, o resultado visual e incrivel.']]
  },
  'sony-fx3': {
    name: 'Sony FX3', category: 'Camera Cinema', anchor: 'cameras', availability: 'Disponivel', rating: '4.9', reviewCount: 143,
    tags: ['Full-frame', '4K/120', 'Cinema Line'],
    description: 'Camera cinema full-frame compacta da Sony, focada em video profissional com baixo ruido, operacao agil de run-and-gun e integracao facil em rigs leves.',
    gallery: [
      ['../assets/img/sonyfx3.png', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80'],
      ['https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80'],
      ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80']
    ],
    rent: [['Diaria', 'Corpo somente', 'R$450', '/dia', true], ['Semanal', '7 dias com 15% off', 'R$2.680', '/semana'], ['Mensal', '30 dias com 30% off', 'R$9.450', '/mes']],
    buyPrice: 'R$28.000', installments: 'ou <strong>12x de R$2.333</strong> sem juros no cartao',
    delivery: [['??', 'Envio protegido', 'Case com espuma para set', 'PRO'], ['??', 'Pronta para rig', 'Roscas e audio XLR via handle']],
    specs: [['Sensor', 'Full-frame Exmor R'], ['Resolucao', '12.1 MP'], ['Video', '4K ate 120 fps'], ['Codec', '10-bit 4:2:2'], ['Audio', 'XLR no handle'], ['Montura', 'Sony E']],
    includes: [['??', 'Corpo Sony FX3'], ['??', 'Handle XLR'], ['??', '2 baterias'], ['??', 'Cartao CFexpress ou SD'], ['??', 'Case rigido']],
    reviews: [['Daniel Freitas', '8 de abril de 2026', '?????', 'Perfeita para run-and-gun. ISO alto salva muito.'], ['Carla Mota', '14 de fevereiro de 2026', '?????', 'Muito compacta para cinema e com audio excelente.']]
  },
  'canon-eos-r5': {
    name: 'Canon EOS R5', category: 'Camera Mirrorless', anchor: 'cameras', availability: 'Disponivel', rating: '4.8', reviewCount: 127,
    tags: ['45 MP', '8K RAW', 'IBIS'],
    description: 'Mirrorless full-frame de alto desempenho para foto e video, com resolucao alta, autofocus rapido e estabilizacao no corpo para producao hibrida.',
    gallery: [
      ['https://www.usa.canon.com/content/dam/canon/en/product-info/eos-r5/body/eos-r5-front-slant.png', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80'],
      ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80'],
      ['https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80']
    ],
    rent: [['Diaria', 'Corpo para foto e video', 'R$380', '/dia', true], ['Semanal', '7 dias com 12% off', 'R$2.340', '/semana'], ['Mensal', '30 dias com 28% off', 'R$8.200', '/mes']],
    buyPrice: 'R$24.000', installments: 'ou <strong>12x de R$2.000</strong> sem juros no cartao',
    delivery: [['??', 'Entrega segura', 'Case almofadado e envio rastreado', 'PRO'], ['??', 'Camera hibrida', 'Excelente para still e video']],
    specs: [['Sensor', 'Full-frame CMOS'], ['Resolucao', '45 MP'], ['Burst', 'ate 20 fps'], ['Video', '8K RAW interno'], ['Foco', 'Dual Pixel AF II'], ['IBIS', 'ate 8 stops']],
    includes: [['??', 'Corpo EOS R5'], ['??', '2 baterias'], ['??', 'Cartao CFexpress'], ['??', 'Case de transporte'], ['??', 'Preset de imagem']],
    reviews: [['Mirela Costa', '1 de abril de 2026', '?????', 'Uso para foto e video no mesmo job. Resolve tudo muito bem.'], ['Andre Pires', '19 de fevereiro de 2026', '?????', 'AF confiavel e imagem muito detalhada para publicidade.']]
  },
  'gopro-hero-13-black': {
    name: 'GoPro Hero 13 Black', category: 'Action Camera', anchor: 'cameras', availability: 'Disponivel', rating: '4.7', reviewCount: 156,
    tags: ['5.3K/60', 'HyperSmooth', 'GPS'],
    description: 'Action cam para esportes, bastidores e conteudo dinamico, com estabilizacao forte e ecossistema de lentes e suportes para varios cenarios.',
    gallery: [
      ['https://www.bhphotovideo.com/images/images500x500/gopro_chdhx_133_master_hero13_black_1692112302_1773695.jpg', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80'],
      ['https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80', 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&q=80']
    ],
    rent: [['Diaria', 'Esporte, travel e making of', 'R$100', '/dia', true], ['Semanal', '7 dias com 10% off', 'R$630', '/semana']],
    buyPrice: 'R$3.100', installments: 'ou <strong>12x de R$287</strong> sem juros no cartao',
    delivery: [['??', 'Pronta para acao', 'Uso em esporte, agua e travel', 'ACTION'], ['??', 'Kit compacto', 'Muito facil de transportar']],
    specs: [['Video', '5.3K/60 fps'], ['Slow motion', 'ate 400 fps em 720p'], ['Cor', 'HLG HDR / 10-bit'], ['GPS', 'Sim'], ['Fixacao', 'Magnetica + fingers'], ['Uso', 'Outdoor intenso']],
    includes: [['??', 'GoPro Hero 13 Black'], ['??', '2 baterias Enduro'], ['??', 'Cabo e carregador'], ['??', 'Base de fixacao']],
    reviews: [['Pedro Araujo', '29 de marco de 2026', '?????', 'Usei em bike e jetski. Estabilizacao segura muito bem.'], ['Aline Passos', '12 de fevereiro de 2026', '?????', 'Leve, facil e com imagem muito boa para bastidores.']]
  },
  'dji-osmo-action-5-pro': {
    name: 'DJI Osmo Action 5 Pro', category: 'Action Camera', anchor: 'cameras', availability: 'Disponivel', rating: '4.7', reviewCount: 103,
    tags: ['4K/120', '1/1.3', '20 m'],
    description: 'Action camera da DJI para captacao robusta em movimento, com sensor maior, boa latitude para HDR e autonomia forte para esportes e viagem.',
    gallery: [
      ['https://www.bhphotovideo.com/images/images500x500/dji_cp_os_00000029_01_osmo_action_5_pro_1726844050_1780649.jpg', 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&q=80'],
      ['https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&q=80', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80']
    ],
    rent: [['Diaria', 'Esporte e travel', 'R$110', '/dia', true], ['Semanal', '7 dias com 10% off', 'R$695', '/semana']],
    buyPrice: 'R$2.899', installments: 'ou <strong>12x de R$268</strong> sem juros no cartao',
    delivery: [['??', 'A prova d agua', 'Ate 20 m sem case', '20M'], ['???', 'HDR em movimento', 'Bom alcance dinamico para a categoria']],
    specs: [['Sensor', '1/1.3 polegada CMOS'], ['Video', '4K/120 fps'], ['Latitude', 'ate 13.5 stops'], ['Bateria', 'ate 145 min'], ['Resistencia', '20 m sem case'], ['Telas', 'Frontal e traseira']],
    includes: [['??', 'Action 5 Pro'], ['??', '2 baterias'], ['??', 'Case compacto'], ['??', 'Base de fixacao']],
    reviews: [['Caio Diniz', '30 de marco de 2026', '?????', 'Bateria dura bastante e o material fica bem limpo.'], ['Fernanda Reis', '18 de fevereiro de 2026', '?????', 'Usei em trilha e praia, sem problemas de aquecimento.']]
  },
  'dji-rs-4-pro': {
    name: 'DJI RS 4 Pro', category: 'Estabilizador / Gimbal', anchor: 'acessorios', availability: 'Disponivel', rating: '4.8', reviewCount: 88,
    tags: ['4.5 kg', 'LiDAR', 'Pro'],
    description: 'Gimbal profissional da DJI para cameras maiores, com controle refinado, integracao com foco via LiDAR e estrutura pronta para rigs mais exigentes.',
    gallery: [
      ['https://http2.mlstatic.com/D_NQ_NP_2X_834120-MLB89753735806_082025-F.webp', 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=900&q=80'],
      ['https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=900&q=80', 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&q=80']
    ],
    rent: [['Diaria', 'Gimbal para set profissional', 'R$150', '/dia', true], ['Semanal', '7 dias com 10% off', 'R$945', '/semana']],
    buyPrice: 'R$9.900', installments: 'ou <strong>12x de R$917</strong> sem juros no cartao',
    delivery: [['??', 'Pronto para rig', 'Balanceamento conferido', 'PRO'], ['??', 'Foco assistido', 'Compativel com sistema LiDAR DJI']],
    specs: [['Payload', 'ate 4.5 kg'], ['Material', 'Liga de aluminio e fibra'], ['Eixos', 'Travamento automatico'], ['Foco', 'LiDAR AF'], ['Controle', 'Bluetooth e joystick'], ['Uso', 'Cinema, publicidade e eventos']],
    includes: [['??', 'RS 4 Pro'], ['??', 'Bateria integrada'], ['???', 'Placa de camera'], ['??', 'Maleta']],
    reviews: [['Leo Barros', '7 de abril de 2026', '?????', 'Muito estavel com cinema camera leve e lente zoom curta.'], ['Ariane Lima', '9 de fevereiro de 2026', '?????', 'Fez diferenca no set e o setup com DJI fica bem integrado.']]
  },
  'dji-osmo-mobile-6': {
    name: 'DJI Osmo Mobile 6', category: 'Gimbal para Smartphone', anchor: 'acessorios', availability: 'Disponivel', rating: '4.6', reviewCount: 118,
    tags: ['3 eixos', 'ActiveTrack 6', 'Dobravels'],
    description: 'Gimbal para smartphone que melhora muito a linguagem visual de videos mobile com estabilizacao de 3 eixos, rastreio de assunto e formato facil de carregar.',
    gallery: [
      ['https://www.bhphotovideo.com/images/images500x500/dji_cp_os_00000197_01_osmo_mobile_6_smartphone_1664380220_1720454.jpg', 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80'],
      ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80', 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&q=80']
    ],
    rent: [['Diaria', 'Criacao mobile e cobertura rapida', 'R$60', '/dia', true], ['Semanal', '7 dias com 10% off', 'R$378', '/semana']],
    buyPrice: 'R$899', installments: 'ou <strong>12x de R$83</strong> sem juros no cartao',
    delivery: [['??', 'Criacao mobile', 'Ideal para reels, vlog e social', 'MOBILE'], ['??', 'Tracking inteligente', 'ActiveTrack 6.0 para rosto e corpo']],
    specs: [['Sistema', '3 eixos'], ['Tracking', 'ActiveTrack 6.0'], ['Formato', 'Dobravels'], ['Compatibilidade', 'iPhone e Android'], ['Extensao', 'Bastao embutido'], ['Aplicacao', 'Vlog, reels e cobertura rapida']],
    includes: [['??', 'Osmo Mobile 6'], ['??', 'Cabo e carga'], ['??', 'Bolsa de transporte'], ['??', 'Guia de operacao']],
    reviews: [['Renata Alves', '4 de abril de 2026', '?????', 'Melhorou muito meus videos de loja e bastidores.'], ['Ivan Melo', '23 de fevereiro de 2026', '?????', 'Portatil e muito bom para social media todo dia.']]
  },
  'dji-mic-2': {
    name: 'DJI Mic 2', category: 'Audio / Microfone', anchor: 'acessorios', availability: 'Disponivel', rating: '4.8', reviewCount: 97,
    tags: ['32-bit float', '250 m', '2 TX'],
    description: 'Sistema de microfone sem fio para creators, entrevistas e producao leve, com gravacao interna e boa distancia operacional.',
    gallery: [
      ['https://www.bhphotovideo.com/images/images500x500/dji_cp_en_00000419_01_mic_2_2_tx_1_rx_1751282308_1826174.jpg', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&q=80'],
      ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&q=80', 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&q=80']
    ],
    rent: [['Diaria', 'Entrevista, vlog e podcast', 'R$70', '/dia', true], ['Semanal', '7 dias com 10% off', 'R$441', '/semana']],
    buyPrice: 'R$2.199', installments: 'ou <strong>12x de R$203</strong> sem juros no cartao',
    delivery: [['??', 'Audio limpo', 'Capta voz com muito mais clareza', 'PRO AUDIO'], ['??', 'Gravacao de seguranca', 'Memoria interna nos transmissores']],
    specs: [['Transmissores', '2'], ['Receptor', '1'], ['Alcance', 'ate 250 m'], ['Formato', '32-bit float'], ['Conectividade', 'Camera, USB-C e Lightning'], ['Uso', 'Entrevista, curso e vlog']],
    includes: [['??', '2 transmissores'], ['??', '1 receptor'], ['??', 'Cabos e adaptadores'], ['??', 'Case de carga']],
    reviews: [['Rita Xavier', '26 de marco de 2026', '?????', 'Muito facil de usar e a gravacao de seguranca salva bastante.'], ['Tiago Vale', '11 de fevereiro de 2026', '?????', 'Uso com camera e iPhone, funciona muito bem.']]
  },
  'dji-mavic-3-pro-nd-filter-set': {
    name: 'DJI Mavic 3 Pro ND Filter Set', category: 'Filtros ND', anchor: 'acessorios', availability: 'Disponivel', rating: '4.7', reviewCount: 61,
    tags: ['ND64-512', 'Glass', 'Magnetico'],
    description: 'Kit de filtros ND para controlar exposicao em cenas muito iluminadas e manter motion blur mais cinematografico em captacao aerea.',
    gallery: [
      ['https://se-cdn.djiits.com/tpc/uploads/photo/image/8a4e785b5f95741a12b981550a888724@large.jpg', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80'],
      ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80']
    ],
    rent: [['Diaria', 'Complemento para o Mavic 3 Pro', 'R$25', '/dia', true]],
    buyPrice: 'R$675,88', installments: 'ou <strong>6x de R$112,65</strong> sem juros no cartao',
    delivery: [['??', 'Controle de luz', 'Mais consistencia em dias abertos', 'ND'], ['??', 'Look cinematografico', 'Ajuda a manter shutter mais natural']],
    specs: [['Filtros', 'ND64 / ND128 / ND256 / ND512'], ['Encaixe', 'Rapido e preciso'], ['Material', 'Vidro optico'], ['Uso', 'Luz forte e cenas abertas']],
    includes: [['??', 'Estojo do kit'], ['??', '4 filtros ND']],
    reviews: [['Igor Teles', '2 de abril de 2026', '?????', 'Ajudou bastante a segurar shutter em pleno sol.'], ['Bia Romano', '15 de fevereiro de 2026', '?????', 'Bom acabamento e encaixe rapido no drone.']]
  },
  'dji-mavic-3-intelligent-flight-battery': {
    name: 'Bateria DJI Mavic 3 Intelligent Flight', category: 'Bateria para Drone', anchor: 'acessorios', availability: 'Disponivel', rating: '4.8', reviewCount: 74,
    tags: ['5000 mAh', '46 min', '65 W'],
    description: 'Bateria extra para a linha Mavic 3, essencial para operacoes mais longas e para quem precisa de mais ciclos de voo no set.',
    gallery: [
      ['https://www.bhphotovideo.com/images/images500x500/dji_cp_ma_00000216_01_mavic_3_intelligent_flight_1638475803_1655462.jpg', 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80'],
      ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=80']
    ],
    rent: [['Diaria', 'Amplia o tempo de operacao', 'R$30', '/dia', true]],
    buyPrice: 'R$799', installments: 'ou <strong>8x de R$99,88</strong> sem juros no cartao',
    delivery: [['??', 'Mais autonomia', 'Ate 46 min de voo por bateria', 'EXTRA'], ['?', 'Carga rapida', 'Compativel com hub de 65 W']],
    specs: [['Capacidade', '5000 mAh'], ['Autonomia', 'ate 46 minutos'], ['Carga', 'Hub 65 W'], ['Uso', 'Mavic 3 series']],
    includes: [['??', 'Bateria Mavic 3']],
    reviews: [['Celso Pacheco', '3 de abril de 2026', '?????', 'Indispensavel para trabalho comercial com varias tomadas.'], ['Monica Salles', '10 de fevereiro de 2026', '?????', 'Chegou com carga boa e sem perda perceptivel de autonomia.']]
  },
  'dji-mavic-3-pro-fly-more-kit': {
    name: 'DJI Mavic 3 Pro Fly More Kit', category: 'Kit Combo', anchor: 'acessorios', availability: 'Disponivel', rating: '4.8', reviewCount: 53,
    tags: ['2 baterias', 'Hub', 'Bolsa'],
    description: 'Pacote de expansao para o Mavic 3 Pro com baterias extras, hub de carregamento e bolsa, pensado para aumentar a autonomia pratica em jobs externos.',
    gallery: [
      ['https://www.bhphotovideo.com/images/images500x500/dji_cp_ma_00000655_01_mavic_3_pro_fly_more_1685633218_1738344.jpg', 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80'],
      ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80']
    ],
    rent: [['Diaria', 'Complemento do kit Mavic 3 Pro', 'R$75', '/dia', true]],
    buyPrice: 'R$2.499', installments: 'ou <strong>12x de R$231</strong> sem juros no cartao',
    delivery: [['??', 'Mais tempo de voo', 'Ideal para diaria de set e viagem', 'COMBO'], ['?', 'Fluxo agil', 'Hub organiza a recarga entre baterias']],
    specs: [['Baterias', '2 extras'], ['Hub', 'Carregamento multiplo'], ['Bag', 'Transporte dedicado'], ['Uso', 'Mais autonomia para o Mavic 3 Pro']],
    includes: [['??', '2 baterias extras'], ['?', 'Hub de carga'], ['??', 'Bolsa de transporte']],
    reviews: [['Fabio Queiroz', '28 de marco de 2026', '?????', 'Faz muita diferenca para quem passa o dia gravando externo.'], ['Nina Braga', '9 de fevereiro de 2026', '?????', 'Kit bem pratico e resolve a logistica do drone no set.']]
  }
};

window.PRODUCT_ALIASES = PRODUCT_ALIASES;
window.PRODUCT_CATALOG = PRODUCT_CATALOG;

