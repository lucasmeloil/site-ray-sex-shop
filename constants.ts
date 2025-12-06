import type { Product, NavLink, AdminUser, HeroSlide, PageBanner } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Início', id: 'home' },
  { name: 'Catálogo', id: 'catalog' },
  { name: 'Sobre', id: 'about' },
  { name: 'Contato', id: 'contact' },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
    { id: 1, email: 'ray@sexshop.com.br' },
    { id: 2, email: 'lucasmelo@nexus.com' }
];

export const INITIAL_SLIDES: HeroSlide[] = [
    {
        id: 1,
        imageUrl: 'https://image2url.com/images/1761343426235-89f30e35-bc5c-4d5d-b852-460f4e058853.png',
        title: 'Explore Seus Desejos',
        subtitle: 'A fronteira final do prazer. Descubra uma nova dimensão de sensações.',
        buttonText: 'Ver Coleção'
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1596451190630-186aff535bf2?q=80&w=2070&auto=format&fit=crop',
        title: 'Lingeries Exclusivas',
        subtitle: 'Sinta-se poderosa com nossa linha de peças íntimas de luxo.',
        buttonText: 'Comprar Agora'
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1620331309628-842c2d43e57f?q=80&w=2072&auto=format&fit=crop',
        title: 'Kits para Casais',
        subtitle: ' reacenda a chama com nossos kits preparados para noites inesquecíveis.',
        buttonText: 'Ver Kits'
    }
];

export const INITIAL_PAGE_BANNERS: PageBanner[] = [
    {
        pageId: 'catalog',
        imageUrl: 'https://images.unsplash.com/photo-1507919909716-c8262e491cde?q=80&w=2000&auto=format&fit=crop',
        title: 'Encontre o seu Prazer',
        subtitle: 'Navegue por nossa seleção curada de produtos íntimos de alta qualidade.'
    },
    {
        pageId: 'contact',
        imageUrl: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2000&auto=format&fit=crop',
        title: 'Fale Conosco',
        subtitle: 'Estamos aqui para tirar suas dúvidas com total discrição.'
    }
];

// Helper to generate extra images for demo
const getImages = (mainUrl: string) => [
    mainUrl,
    'https://placehold.co/300x300/ef4444/ffffff?text=Foto+2',
    'https://placehold.co/300x300/1f2937/ffffff?text=Foto+3'
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Vibrador Pulsar', category: 'Vibradores', price: 'R$ 299,90', originalPrice: 'R$ 349,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Vibrador potente com múltiplos padrões de pulsação.', shortDescription: '15% de desconto no PIX', sku: 'RAY-001', isPromotion: true },
  { id: 2, name: 'Kit Sedução Red', category: 'Kits', price: 'R$ 199,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Kit completo para noites inesquecíveis.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-002', isPromotion: false },
  { id: 3, name: 'Óleo Deslizante', category: 'Lubrificantes', price: 'R$ 79,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Lubrificante à base de água com efeito duradouro.', shortDescription: 'Compre 2, leve 3', sku: 'RAY-003', isPromotion: false },
  { id: 4, name: 'Algemas de Veludo', category: 'Acessórios', price: 'R$ 129,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Algemas macias e seguras para jogos de dominação.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-004', isPromotion: false },
  { id: 5, name: 'Chicote Pluma Negra', category: 'Acessórios', price: 'R$ 149,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Chicote com plumas para sensações suaves e excitantes.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-005', isPromotion: false },
  { id: 6, name: 'Ovo Vibratório Remoto', category: 'Vibradores', price: 'R$ 349,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Ovo vibratório controlado por controle remoto sem fio.', shortDescription: 'Frete grátis', sku: 'RAY-006', isPromotion: false },
  { id: 7, name: 'Lingerie Lace Red', category: 'Lingeries', price: 'R$ 249,90', originalPrice: 'R$ 299,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Lingerie sensual com detalhes tecnológicos.', shortDescription: 'Últimas unidades', sku: 'RAY-007', isPromotion: true },
  { id: 8, name: 'Filme Adulto VR', category: 'Mídias', price: 'R$ 99,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Experiência imersiva de realidade virtual.', shortDescription: 'Acesso vitalício', sku: 'RAY-008', isPromotion: false },
  { id: 9, name: 'Plug Anal Glass', category: 'Acessórios', price: 'R$ 189,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Plug com design moderno e material seguro.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-009', isPromotion: false },
  { id: 10, name: 'Fantasia Nurse', category: 'Fantasias', price: 'R$ 499,90', originalPrice: 'R$ 549,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Fantasia futurista para roleplay.', shortDescription: '10% de desconto no PIX', sku: 'RAY-010', isPromotion: true },
  { id: 11, name: 'Gel Estimulante Hot', category: 'Lubrificantes', price: 'R$ 89,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Gel que proporciona sensações de aquecimento e vibração.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-011', isPromotion: false },
  { id: 12, name: 'Venda de Cetim', category: 'Acessórios', price: 'R$ 99,90', originalPrice: 'R$ 119,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Venda para os olhos com uma experiência única.', shortDescription: 'Melhor preço', sku: 'RAY-012', isPromotion: true },
  { id: 13, name: 'Vibrador Duplo', category: 'Vibradores', price: 'R$ 459,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Estimulação dupla para clitóris e ponto G.', shortDescription: 'Frete grátis', sku: 'RAY-013', isPromotion: false },
  { id: 14, name: 'Kit Shibari Red', category: 'Kits', price: 'R$ 229,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Cordas de algodão macio.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-014', isPromotion: false },
  { id: 15, name: 'Dados Eróticos', category: 'Mídias', price: 'R$ 49,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'App de dados para jogos eróticos.', shortDescription: 'Acesso vitalício', sku: 'RAY-015', isPromotion: false },
  { id: 16, name: 'Body Chain Gold', category: 'Lingeries', price: 'R$ 179,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Corrente corporal para adornar e seduzir.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-016', isPromotion: false },
  { id: 17, name: 'Fantasia Secretária', category: 'Fantasias', price: 'R$ 450,00', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Fantasia completa.', shortDescription: 'Em até 5x sem juros', sku: 'RAY-017', isPromotion: false },
  { id: 18, name: 'Vela de Massagem', category: 'Acessórios', price: 'R$ 320,00', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Vela que vira óleo de massagem.', shortDescription: 'Frete grátis', sku: 'RAY-018', isPromotion: false },
  { id: 19, name: 'Vibrador Sônico', category: 'Vibradores', price: 'R$ 599,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Tecnologia sônica para orgasmos intensos.', shortDescription: 'Em até 10x sem juros', sku: 'RAY-019', isPromotion: false },
  { id: 20, name: 'Kit Spa Sensual', category: 'Kits', price: 'R$ 259,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Inclui óleo de massagem, velas e acessórios.', shortDescription: 'Brinde exclusivo', sku: 'RAY-020', isPromotion: false },
  { id: 21, name: 'Máscara Veneziana', category: 'Fantasias', price: 'R$ 159,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Máscara elegante.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-021', isPromotion: false },
  { id: 22, name: 'Capa Texturizada', category: 'Acessórios', price: 'R$ 89,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Aumenta o prazer com texturas estimulantes.', shortDescription: 'Leve 2 pague 1', sku: 'RAY-022', isPromotion: false },
  { id: 23, name: 'Lubrificante Morango', category: 'Lubrificantes', price: 'R$ 69,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Lubrificante comestível.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-023', isPromotion: false },
  { id: 24, name: 'Meia-calça Arrastão', category: 'Lingeries', price: 'R$ 99,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Meia-calça com design clássico.', shortDescription: 'Em até 3x sem juros', sku: 'RAY-024', isPromotion: false },
  { id: 25, name: 'Vibrador Bullet', category: 'Vibradores', price: 'R$ 129,90', imageUrl: 'https://placehold.co/300x300/dc2626/ffffff?text=Produto', images: getImages('https://placehold.co/300x300/dc2626/ffffff?text=Produto'), description: 'Discreto e potente.', shortDescription: 'Frete grátis', sku: 'RAY-025', isPromotion: false }
];