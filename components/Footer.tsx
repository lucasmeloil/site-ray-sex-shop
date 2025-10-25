import React from 'react';

const BRAND_LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

const Footer: React.FC = () => {
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Catálogo', href: '#catalog' },
        { name: 'Contato', href: '#contact' }
    ];

    const socialLinks = [
        { icon: '📸', href: '#', name: 'Instagram' },
        { icon: '📘', href: '#', name: 'Facebook' },
        { icon: '🐦', href: '#', name: 'Twitter' },
    ];

  return (
    <footer className="bg-gray-900/50 border-t border-purple-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
            {/* Column 1: Logo and Address */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
                <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-16 w-auto mb-4" />
                <address className="not-italic text-sm leading-relaxed">
                    <p className="font-bold text-gray-300">Nosso Endereço:</p>
                    Central Park Shopping<br/>
                    Av. Brasil, 6282 - Centro<br/>
                    Cascavel - PR, 85810-000
                </address>
            </div>

            {/* Column 2: Navigation */}
            <div className="flex flex-col items-center md:items-start">
                <h3 className="text-lg font-bold text-pink-400 mb-4">Navegação</h3>
                <ul className="space-y-2 text-sm">
                    {navLinks.map(link => (
                         <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                    ))}
                </ul>
            </div>
            
            {/* Column 3: Social */}
            <div className="flex flex-col items-center md:items-start">
                <h3 className="text-lg font-bold text-pink-400 mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                    {socialLinks.map(social => (
                        <a key={social.name} href={social.href} className="text-3xl transition-transform transform hover:scale-125" aria-label={social.name}>
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-8 border-t border-purple-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ray Sexshop. Todos os direitos reservados.</p>
           <p className="mt-2">
            Criado por <a href="http://www.nexussofttech.com.br" target="_blank" rel="noopener noreferrer" className="font-bold text-purple-400 hover:text-pink-400 transition-colors">NEXUS SOFT TECH</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;