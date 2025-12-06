import React, { useState } from 'react';
import type { AdminUser } from './types';

interface AdminProfilePageProps {
  adminUsers: AdminUser[];
  onAddAdmin: (newAdmin: { email: string; password: string }) => void;
  onUpdateAdminPassword: (userId: number, newPassword: string) => void;
  currentUser: AdminUser;
}

const AdminProfilePage: React.FC<AdminProfilePageProps> = ({ onAddAdmin, onUpdateAdminPassword, currentUser }) => {
  // State for changing password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // State for adding new admin
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [addAdminMessage, setAddAdminMessage] = useState({ type: '', text: '' });
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (currentPassword !== currentUser.password) {
      setPasswordMessage({ type: 'error', text: 'A senha atual está incorreta.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'As novas senhas não coincidem.' });
      return;
    }
    if (newPassword.length < 6) {
        setPasswordMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres.' });
        return;
    }

    onUpdateAdminPassword(currentUser.id, newPassword);
    setPasswordMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
  };
  
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAddAdminMessage({ type: '', text: '' });

    if (!newAdminEmail || !newAdminPassword) {
        setAddAdminMessage({ type: 'error', text: 'Preencha todos os campos.' });
        return;
    }
    if (newAdminPassword.length < 6) {
        setAddAdminMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres.' });
        return;
    }

    onAddAdmin({ email: newAdminEmail, password: newAdminPassword });
    setAddAdminMessage({ type: 'success', text: 'Novo administrador adicionado com sucesso!' });
    setNewAdminEmail('');
    setNewAdminPassword('');
    setTimeout(() => setAddAdminMessage({ type: '', text: '' }), 3000);
  };

  const Message: React.FC<{ message: { type: string, text: string } }> = ({ message }) => {
    if (!message.text) return null;
    const color = message.type === 'success' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';
    return <p className={`text-sm text-center p-2 rounded border font-bold ${color}`}>{message.text}</p>;
  };

  const inputClass = "w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow";

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Change Password Form */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🔑 Alterar sua Senha
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Senha Atual</label>
            <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Nova Senha</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Confirmar Nova Senha</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••"
            />
          </div>
          <Message message={passwordMessage} />
          <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors shadow-md mt-2">
            Salvar Nova Senha
          </button>
        </form>
      </div>

      {/* Add New Admin Form */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            ➕ Novo Administrador
        </h2>
        <form onSubmit={handleAddAdmin} className="space-y-4">
          <div>
             <label className="block text-sm font-bold text-gray-600 mb-1">E-mail do Novo Admin</label>
             <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className={inputClass}
                placeholder="email@exemplo.com"
            />
          </div>
          <div>
             <label className="block text-sm font-bold text-gray-600 mb-1">Senha Temporária</label>
             <input
                type="password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••"
            />
          </div>
          <Message message={addAdminMessage} />
          <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-full hover:bg-gray-900 transition-colors shadow-md mt-2">
            Adicionar Administrador
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilePage;