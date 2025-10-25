
import React, { useState } from 'react';

const LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-grid-purple-900/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <img src={LOGO_URL} alt="Ray Sexshop Logo" className="w-auto h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-pink-400">Acesso Administrativo</h1>
        </div>
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-md p-8 rounded-xl border border-purple-800 shadow-2xl shadow-purple-500/20 space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-purple-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="ray@sexshop.com.br"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-purple-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:bg-pink-600 transform hover:scale-105 disabled:bg-pink-800 disabled:scale-100 disabled:cursor-wait"
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
      </div>
    </div>
  );
};

export default LoginPage;
