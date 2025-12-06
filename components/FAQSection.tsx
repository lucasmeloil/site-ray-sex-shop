
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "A embalagem é discreta?",
      answer: "Absolutamente. Prezamos total sigilo. Nossas embalagens são pardas ou brancas, sem logotipos, sem menção a sexshop ou produtos eróticos. O remetente vem em nome de pessoa física ou razão social neutra."
    },
    {
      question: "O que aparece na fatura do cartão?",
      answer: "Na sua fatura do cartão de crédito aparecerá um nome genérico e discreto, garantindo que ninguém saiba a origem da compra."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo varia de acordo com sua região. Você pode consultar inserindo seu CEP no carrinho ou entrando em contato pelo WhatsApp. Enviamos em até 24h úteis após a confirmação do pagamento."
    },
    {
      question: "Posso retirar pessoalmente?",
      answer: "Sim! Para clientes de Cascavel-PR, oferecemos a opção de retirada rápida em nossa loja física no Central Park Shopping ou entrega via Motoboy."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4 text-red-600">
                <HelpCircle size={24} />
           </div>
           <h2 className="text-3xl md:text-4xl font-black text-gray-900">Perguntas <span className="text-red-600">Frequentes</span></h2>
           <p className="mt-4 text-gray-500">Tire suas dúvidas sobre privacidade, entregas e pagamentos.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden
                ${openIndex === index ? 'border-red-200 bg-red-50/30 shadow-sm' : 'border-gray-100 bg-white hover:border-red-100'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-red-700' : 'text-gray-800'}`}>
                    {faq.question}
                </span>
                <ChevronDown 
                    className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-red-500' : ''}`} 
                    size={20} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-5 pt-0 text-gray-600 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
