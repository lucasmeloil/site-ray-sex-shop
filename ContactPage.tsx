import React from 'react';

const ContactPage: React.FC = () => {
  const socialLinks = [
    { icon: '🐦', href: '#' },
    { icon: '📸', href: '#' },
    { icon: '📘', href: '#' },
  ];

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
       <div className="max-w-6xl mx-auto pt-12 md:pt-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-500">Contato</h2>
          <p className="mt-4 text-lg text-gray-600">Dúvidas, sugestões ou apenas um olá? Estamos aqui para você.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Form and Social */}
            <div>
                 <form className="space-y-6 bg-white p-8 rounded-lg border border-red-200">
                    <div>
                        <input type="text" placeholder="Seu Nome" className="w-full bg-gray-100 border border-red-200 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" />
                    </div>
                    <div>
                        <input type="email" placeholder="Seu E-mail" className="w-full bg-gray-100 border border-red-200 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" />
                    </div>
                    <div>
                        <textarea placeholder="Sua Mensagem" rows={5} className="w-full bg-gray-100 border border-red-200 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-red-500 text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]">
                        Enviar
                        </button>
                    </div>
                </form>
                <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4">Nos siga nas redes</p>
                    <div className="flex justify-center space-x-6">
                        {socialLinks.map((social, index) => (
                            <a key={index} href={social.href} className="text-4xl transition-transform transform hover:scale-125 hover:rotate-12">
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Address and Map */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg border border-red-200">
                    <h3 className="text-2xl font-bold text-red-500 mb-4">Nosso Endereço</h3>
                    <address className="not-italic text-gray-700 leading-relaxed">
                        Central Park Shopping<br/>
                        Av. Brasil, 6282 - Centro<br/>
                        Cascavel - PR, 85810-000
                    </address>
                </div>
                <div className="rounded-lg overflow-hidden border-2 border-red-200 shadow-lg shadow-red-500/10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.041649931327!2d-53.45781308873091!3d-24.930778977785566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f3d47353fed4c3%3A0x7a63a568b209c1a3!2sCentral%20Park%20Shopping%20Center!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Ray Sexshop"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
