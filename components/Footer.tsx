
import React from 'react';
import { Heart, Mail, MapPin, Clock, Phone, CheckCircle2, Instagram, MessageCircle } from 'lucide-react';

const BRAND_LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

const Footer: React.FC = () => {
    const quickLinks = [
        { name: 'Início', href: '#home' },
        { name: 'Catálogo', href: '#catalog' },
        { name: 'Sobre Nós', href: '#about' },
        { name: 'Contato', href: '#contact' }
    ];

    const confidenceItems = [
        "Produtos Originais",
        "Entrega Discreta",
        "Pagamento Seguro",
        "Atendimento Especializado"
    ];

  return (
    <footer className="bg-red-50 text-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8 text-center sm:text-left">
            
            {/* Column 1: Logo and About */}
            <div className="flex flex-col items-center sm:items-start">
                <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-14 w-auto mb-4" />
                <p className="text-sm max-w-xs mx-auto sm:mx-0 text-gray-600">
                    Sua loja de confiança para moda íntima e produtos sensuais. Qualidade, discrição e satisfação garantida.
                </p>
                <div className="flex space-x-3 mt-6">
                    <a href="https://instagram.com/ray_sexshop_cvel" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                            <Instagram className="text-white" size={20} />
                        </div>
                    </a>
                     <a href="https://wa.me/5545991484617" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <MessageCircle className="text-white" size={20} />
                        </div>
                    </a>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center sm:justify-start gap-2">
                    <Heart size={20} className="text-red-500" /> Links Rápidos
                </h3>
                <ul className="space-y-2 text-sm">
                    {quickLinks.map(link => (
                         <li key={link.name}><a href={link.href} className="text-gray-600 hover:text-red-500 transition-colors">{link.name}</a></li>
                    ))}
                </ul>
            </div>
            
            {/* Column 3: Contact */}
            <div className="text-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center sm:justify-start gap-2">
                    <Mail size={20} className="text-red-500" /> Contato
                </h3>
                <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center justify-center sm:justify-start gap-3">
                        <MapPin size={18} className="text-red-400 flex-shrink-0" />
                        <span>Av. Brasil, Nº 6282 — Central Park Shopping, Loja 305</span>
                    </li>
                    <li className="flex items-center justify-center sm:justify-start gap-3">
                        <Clock size={18} className="text-red-400 flex-shrink-0" />
                        <span>Seg - Sáb: 9h às 19h</span>
                    </li>
                    <li className="flex items-center justify-center sm:justify-start gap-3">
                        <Phone size={18} className="text-red-400 flex-shrink-0" />
                        <span>(45) 99148-4617</span>
                    </li>
                </ul>
            </div>

            {/* Column 4: Shop with Confidence */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Compre com Confiança</h3>
                <ul className="space-y-2 text-sm">
                    {confidenceItems.map(item => (
                        <li key={item} className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                            <CheckCircle2 size={16} className="text-green-500" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

        </div>

        <div className="mt-8 border-t border-red-200/50 pt-6 text-center text-xs text-gray-500">
          <p>&copy; 2025 nexussofttech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
