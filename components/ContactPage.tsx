
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-red-100/50 blur-[120px] rounded-full pointer-events-none opacity-60"></div>

       <div className="max-w-6xl mx-auto pt-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Entre em <span className="text-red-600">Contato</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Dúvidas, sugestões ou apenas um olá? Nossa equipe está pronta para te atender com total discrição.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column: Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
                 <h3 className="text-2xl font-bold text-gray-900 mb-8">Envie uma mensagem</h3>
                 <form className="space-y-6">
                    <div className="group">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Seu Nome</label>
                        <input type="text" placeholder="Digite seu nome" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Seu E-mail</label>
                        <input type="email" placeholder="Digite seu e-mail" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mensagem</label>
                        <textarea placeholder="Como podemos ajudar?" rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all resize-none"></textarea>
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl text-lg uppercase tracking-wider hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/40 flex items-center justify-center gap-3 group transform hover:-translate-y-1">
                          <span>Enviar Mensagem</span>
                          <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Column: Address and Info */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Informações</h3>
                    <div className="space-y-8">
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0 shadow-sm border border-red-100">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold mb-2 text-lg">Localização</h4>
                                <address className="not-italic text-gray-500 leading-relaxed">
                                    Central Park Shopping<br/>
                                    Av. Brasil, 6282 - Centro<br/>
                                    Cascavel - PR, 85810-000
                                </address>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0 shadow-sm border border-red-100">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold mb-2 text-lg">Telefone / WhatsApp</h4>
                                <p className="text-gray-600 text-lg font-medium">(45) 99148-4617</p>
                                <p className="text-gray-400 text-sm mt-1">Seg a Sáb das 9h às 19h</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0 shadow-sm border border-red-100">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold mb-2 text-lg">E-mail</h4>
                                <p className="text-gray-600">contato@raysexshop.com.br</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl h-64 md:h-80 hover:shadow-2xl transition-all duration-500">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.587841793548!2d-53.46043648499576!3d-24.94639998401344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f3d58b37113d87%3A0x1440bf8abd097da1!2sRay%20Sexshop%20%26%20moda%20%C3%ADntima!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="100%"
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
