
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    try {
      await onLogin(email, password);
      // Success will be handled by App.tsx re-rendering
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <img src={LOGO_URL} alt="Ray Sexshop Logo" className="w-auto h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-red-500">Acesso Administrativo</h1>
        </div>
        <form 
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-8 rounded-xl border border-red-200 shadow-2xl shadow-red-500/10 space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">E-mail</label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-200 border border-red-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="ray@sexshop.com.br"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Senha</label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-200 border border-red-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:bg-red-600 transform hover:scale-105 disabled:bg-red-300 disabled:scale-100 disabled:cursor-wait"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Entrando...</span>
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
            <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium transition-colors"
            >
                <ArrowLeft size={18} />
                Voltar ao site
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
