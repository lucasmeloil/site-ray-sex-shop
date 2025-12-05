
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
    <footer className="bg-gradient-to-b from-white via-gray-50 to-red-50 text-gray-600 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center sm:text-left">
            
            {/* Column 1: Logo and About */}
            <div className="flex flex-col items-center sm:items-start">
                <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-12 w-auto mb-6" />
                <p className="text-sm max-w-xs mx-auto sm:mx-0 text-gray-500 leading-relaxed font-light">
                    Sua boutique de prazer. Moda íntima e produtos sensuais com estética elegante. Qualidade, discrição e satisfação garantida.
                </p>
                <div className="flex space-x-4 mt-8">
                    <a href="https://instagram.com/ray_sexshop_cvel" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 rounded-full">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:border-red-600 group transition-all duration-300 shadow-sm">
                            <Instagram className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                        </div>
                    </a>
                     <a href="https://wa.me/5545991484617" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 rounded-full">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-green-600 hover:border-green-600 group transition-all duration-300 shadow-sm">
                            <MessageCircle className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                        </div>
                    </a>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h3 className="text-gray-900 font-bold mb-6 flex items-center justify-center sm:justify-start gap-2 uppercase tracking-wider text-sm">
                   Links Rápidos
                </h3>
                <ul className="space-y-3 text-sm">
                    {quickLinks.map(link => (
                         <li key={link.name}>
                             <a href={link.href} className="text-gray-500 hover:text-red-600 transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                {link.name}
                             </a>
                         </li>
                    ))}
                </ul>
            </div>
            
            {/* Column 3: Contact */}
            <div className="text-sm">
                <h3 className="text-gray-900 font-bold mb-6 flex items-center justify-center sm:justify-start gap-2 uppercase tracking-wider text-sm">
                   Contato
                </h3>
                <ul className="space-y-4 text-gray-500">
                    <li className="flex items-start justify-center sm:justify-start gap-3">
                        <MapPin size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Av. Brasil, Nº 6282 <br/>Central Park Shopping, Loja 305</span>
                    </li>
                    <li className="flex items-center justify-center sm:justify-start gap-3">
                        <Clock size={18} className="text-red-600 flex-shrink-0" />
                        <span>Seg - Sáb: 9h às 19h</span>
                    </li>
                    <li className="flex items-center justify-center sm:justify-start gap-3">
                        <Phone size={18} className="text-red-600 flex-shrink-0" />
                        <span>(45) 99148-4617</span>
                    </li>
                </ul>
            </div>

            {/* Column 4: Shop with Confidence */}
            <div>
                <h3 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Segurança</h3>
                <ul className="space-y-3 text-sm">
                    {confidenceItems.map(item => (
                        <li key={item} className="flex items-center justify-center sm:justify-start gap-3 text-gray-500">
                            <CheckCircle2 size={16} className="text-green-500" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

        </div>

        <div className="mt-12 border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; 2025 Ray Sexshop. Todos os direitos reservados.</p>
          <div className="flex gap-4">
              <span className="hover:text-red-600 cursor-pointer transition-colors">Termos de Uso</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">Política de Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
