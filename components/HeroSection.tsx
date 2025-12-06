
import React, { useState, useEffect } from 'react';
import type { HeroSlide } from '../types';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: 'catalog') => void;
  slides: HeroSlide[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!slides || slides.length === 0) return null;

  // Renderiza o título separando a última palavra para destaque
  const renderStyledTitle = (title: string) => {
      const words = title.split(' ');
      if (words.length <= 1) return <span className="text-white drop-shadow-lg">{title}</span>;
      
      const lastWord = words.pop();
      const initialPart = words.join(' ');
      
      return (
          <>
            <span className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">{initialPart} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-red-600 drop-shadow-none filter brightness-125 relative inline-block whitespace-nowrap">
                {lastWord}
                {/* Underline decoration */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-600 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
            </span>
          </>
      );
  };

  return (
    <section id="home" className="relative h-[85vh] md:h-screen min-h-[600px] w-full overflow-hidden bg-gray-900 group">
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0">
                 <img 
                    src={slide.imageUrl} 
                    alt={slide.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-linear"
                    style={{ transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)' }}
                 />
                 
                 {/* Cinematic Scrim */}
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/40 to-transparent opacity-90"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent md:hidden"></div>
              </div>

              {/* Content Container */}
              <div className="relative z-20 h-full container mx-auto px-6 md:px-12 flex items-center justify-center md:justify-start">
                <div className={`
                    max-w-3xl text-center md:text-left
                    transition-all duration-1000 delay-300
                    ${index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}
                `}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-lg">
                        <Sparkles size={12} className="text-red-500 animate-pulse" />
                        <span>Coleção Exclusiva</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6 font-sans drop-shadow-2xl">
                        {renderStyledTitle(slide.title)}
                    </h1>

                    <p className="text-base md:text-2xl text-gray-200 font-light leading-relaxed mb-10 max-w-xl mx-auto md:mx-0 drop-shadow-md">
                        {slide.subtitle}
                    </p>
                    
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="group relative px-10 py-4 bg-red-600 text-white font-bold text-sm md:text-lg rounded-full overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest">
                            {slide.buttonText} 
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></div>
                    </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Navigation Arrows */}
      <div className="hidden md:flex absolute bottom-12 right-12 z-30 gap-4">
        <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
        >
            <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
        >
            <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all duration-500 rounded-full shadow-sm ${
              index === currentSlide ? 'w-12 bg-red-600' : 'w-3 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
