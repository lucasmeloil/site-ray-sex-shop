
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import type { PageBanner } from '../types';

interface ContactPageProps {
    pageBanner: PageBanner;
}

const ContactPage: React.FC<ContactPageProps> = ({ pageBanner }) => {
  return (
    <section id="contact" className="bg-gray-50 min-h-screen pb-20 relative overflow-hidden">
        
       {/* --- BANNER HEADER (Dynamic) --- */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden flex items-center justify-center bg-gray-900">
         {/* Background Image */}
         <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
            style={{ backgroundImage: `url('${pageBanner.imageUrl}')` }}
         ></div>
         
         {/* Overlay - Elegant Gradient */}
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                Atendimento Exclusivo
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-4">
               {pageBanner.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-lg font-light leading-relaxed">
               {pageBanner.subtitle}
            </p>
         </div>
      </div>

       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Form */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 animate-slide-in-right relative overflow-hidden group">
                 {/* Decorative top bar */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-300"></div>

                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Envie sua mensagem</h3>
                 <form className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nome</label>
                        <input 
                            type="text" 
                            placeholder="Seu nome completo" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all duration-300" 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">E-mail</label>
                        <input 
                            type="email" 
                            placeholder="seu@email.com" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all duration-300" 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mensagem</label>
                        <textarea 
                            placeholder="Como podemos te ajudar hoje?" 
                            rows={4} 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all duration-300 resize-none"
                        ></textarea>
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/40 flex items-center justify-center gap-2 group active:scale-95">
                          <span>Enviar Agora</span>
                          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Column: Address and Info */}
            <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                {/* Contact Cards */}
                <div className="grid gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5 group">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                            <MapPin size={22} />
                        </div>
                        <div>
                            <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-1">Visite-nos</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Central Park Shopping<br/>
                                Av. Brasil, 6282, Cascavel - PR
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5 group">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                            <MessageCircle size={22} />
                        </div>
                        <div>
                            <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-1">WhatsApp</h4>
                            <p className="text-gray-600 text-lg font-bold">(45) 99148-4617</p>
                            <p className="text-xs text-gray-400">Atendimento rápido</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5 group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Mail size={22} />
                        </div>
                        <div>
                            <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-1">E-mail</h4>
                            <p className="text-gray-600 text-sm">contato@raysexshop.com.br</p>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl h-64 md:h-72 hover:shadow-2xl transition-all duration-500 relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.041649931327!2d-53.45781308873091!3d-24.930778977785566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f3d47353fed4c3%3A0x7a63a568b209c1a3!2sCentral%20Park%20Shopping%20Center!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Ray Sexshop"
                        className="grayscale group-hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
