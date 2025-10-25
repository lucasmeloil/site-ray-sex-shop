
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/40">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-400">Quem Somos</h2>
        <div className="mt-2 w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
        <p className="mt-8 text-lg text-gray-300 leading-relaxed">
          Na Ray Sexshop, acreditamos que o prazer é uma forma de arte e autoexpressão. Nascemos da fusão entre tecnologia e desejo, em um universo cyberpunk onde as barreiras são quebradas e a liberdade é a norma. Nossa missão é oferecer produtos inovadores e de alta qualidade que inspirem confiança, exploração e, acima de tudo, prazer. Cada item em nosso catálogo é cuidadosamente selecionado para garantir uma experiência única e segura.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
