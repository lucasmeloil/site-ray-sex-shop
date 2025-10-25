
import React, { useState } from 'react';
import type { AdminUser } from './types';

interface AdminProfilePageProps {
  adminUsers: AdminUser[];
  onAddAdmin: (newAdmin: Omit<AdminUser, 'id'>) => void;
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
    const color = message.type === 'success' ? 'text-green-400' : 'text-red-400';
    return <p className={`text-sm text-center ${color}`}>{message.text}</p>;
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Change Password Form */}
      <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-900">
        <h2 className="text-xl font-bold text-pink-400 mb-4">Alterar sua Senha</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Senha Atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded border border-purple-700"
          />
          <input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded border border-purple-700"
          />
          <input
            type="password"
            placeholder="Confirmar Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded border border-purple-700"
          />
          <Message message={passwordMessage} />
          <button type="submit" className="w-full bg-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-500 transition-colors">
            Salvar Nova Senha
          </button>
        </form>
      </div>

      {/* Add New Admin Form */}
      <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-900">
        <h2 className="text-xl font-bold text-pink-400 mb-4">Adicionar Novo Administrador</h2>
        <form onSubmit={handleAddAdmin} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail do Novo Admin"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded border border-purple-700"
          />
          <input
            type="password"
            placeholder="Senha para Novo Admin"
            value={newAdminPassword}
            onChange={(e) => setNewAdminPassword(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded border border-purple-700"
          />
          <Message message={addAdminMessage} />
          <button type="submit" className="w-full bg-pink-500 font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition-colors">
            Adicionar Administrador
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilePage;
