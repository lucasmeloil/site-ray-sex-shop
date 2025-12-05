
import React, { useState } from 'react';
import type { Product, AdminUser, HeroSlide } from './types';
import AdminProfilePage from './AdminProfilePage';
import AdminProductRow from './components/AdminProductRow';
import { LogOut, Home } from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onOpenAddModal: () => void;
  onLogout: () => void;
  onBack: () => void;
  adminUsers: AdminUser[];
  onAddAdmin: (newAdmin: Omit<AdminUser, 'id'>) => void;
  onUpdateAdminPassword: (userId: number, newPassword: string) => void;
  currentUser: AdminUser;
  heroSlides: HeroSlide[];
  onUpdateSlide: (slide: HeroSlide) => void;
  onAddSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  onDeleteSlide: (id: number) => void;
}

type AdminTab = 'products' | 'users' | 'hero';

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-red-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-red-600 flex items-center gap-2">
            <span>🛡️</span> Painel Administrativo
        </h1>
        <div className="flex items-center gap-3">
             <button
              onClick={props.onBack}
              className="flex items-center gap-2 bg-white text-gray-700 font-bold py-2 px-4 rounded-full text-sm hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
            >
              <Home size={16} />
              Voltar ao Site
            </button>
            <button
              onClick={props.onLogout}
              className="flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-red-700 transition-colors shadow-sm"
            >
              <LogOut size={16} />
              Sair
            </button>
        </div>
      </header>
      
      <nav className="flex border-b border-gray-200 bg-white px-4 md:px-8 overflow-x-auto shadow-sm">
        <button 
          onClick={() => setActiveTab('products')} 
          className={`py-4 px-6 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'products' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          📦 Produtos
        </button>
        <button 
          onClick={() => setActiveTab('hero')} 
          className={`py-4 px-6 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'hero' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          🖼️ Banners
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          className={`py-4 px-6 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'users' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          👥 Administradores
        </button>
      </nav>

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {activeTab === 'products' && (
          <AdminProductSection
            products={props.products}
            onUpdateProduct={props.onUpdateProduct}
            onDeleteProduct={props.onDeleteProduct}
            onOpenAddModal={props.onOpenAddModal}
          />
        )}
        {activeTab === 'hero' && (
            <AdminHeroSection
                slides={props.heroSlides}
                onUpdate={props.onUpdateSlide}
                onAdd={props.onAddSlide}
                onDelete={props.onDeleteSlide}
            />
        )}
        {activeTab === 'users' && (
          <AdminProfilePage 
            adminUsers={props.adminUsers}
            onAddAdmin={props.onAddAdmin}
            onUpdateAdminPassword={props.onUpdateAdminPassword}
            currentUser={props.currentUser}
          />
        )}
      </main>
    </div>
  );
};

// --- Product Section ---
const AdminProductSection: React.FC<{ products: Product[], onUpdateProduct: any, onDeleteProduct: any, onOpenAddModal: any }> = ({ products, onUpdateProduct, onDeleteProduct, onOpenAddModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'price'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<'all' | 'promotion'>('all');

  const filteredAndSortedProducts = React.useMemo(() => {
    let tempProducts = [...products];

    if (activeFilter === 'promotion') {
        tempProducts = tempProducts.filter(p => p.isPromotion);
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    tempProducts.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'price') {
        const priceA = parseFloat(a.price.replace('R$ ', '').replace(',', '.'));
        const priceB = parseFloat(b.price.replace('R$ ', '').replace(',', '.'));
        comparison = priceA - priceB;
      } else {
        comparison = a.name.localeCompare(b.name);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return tempProducts;
  }, [products, searchTerm, sortKey, sortDirection, activeFilter]);

  const handleSort = (key: 'name' | 'price') => {
    if (key === sortKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  
  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="🔍 Filtrar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-full py-2.5 px-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
           <button onClick={onOpenAddModal} className="w-full sm:w-auto bg-red-600 text-white font-bold py-2.5 px-6 rounded-full text-sm hover:bg-red-700 transition-all shadow-md transform hover:scale-105">
              + Adicionar Produto
            </button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="whitespace-nowrap">Ordenar por:</span>
            <select 
              value={sortKey} 
              onChange={(e) => handleSort(e.target.value as 'name' | 'price')}
              className="bg-white border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-red-500 focus:border-red-500 cursor-pointer"
            >
              <option value="name">Nome</option>
              <option value="price">Preço</option>
            </select>
            <button onClick={() => handleSort(sortKey)} className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      
       <div className="flex border-b border-gray-200 mb-6 gap-6">
        <button 
          onClick={() => setActiveFilter('all')} 
          className={`pb-2 px-1 text-sm font-bold transition-colors ${activeFilter === 'all' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Todos os Produtos
        </button>
        <button 
          onClick={() => setActiveFilter('promotion')} 
          className={`pb-2 px-1 text-sm font-bold transition-colors ${activeFilter === 'promotion' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Apenas Promoções
        </button>
      </div>
      
      <div className="space-y-4">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map(product => (
            <AdminProductRow
              key={product.id}
              product={product}
              onUpdate={onUpdateProduct}
              onDelete={onDeleteProduct}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-lg">Nenhum produto encontrado para os filtros selecionados.</p>
          </div>
        )}
      </div>
    </>
  );
};

// --- Hero Slide Section ---
const AdminHeroSection: React.FC<{ 
    slides: HeroSlide[], 
    onUpdate: (s: HeroSlide) => void, 
    onAdd: (s: Omit<HeroSlide, 'id'>) => void, 
    onDelete: (id: number) => void 
}> = ({ slides, onUpdate, onAdd, onDelete }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newSlide, setNewSlide] = useState({ imageUrl: '', title: '', subtitle: '', buttonText: 'Ver Mais' });

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(newSlide);
        setIsAdding(false);
        setNewSlide({ imageUrl: '', title: '', subtitle: '', buttonText: 'Ver Mais' });
    };
    
    const inputClass = "w-full p-2.5 rounded border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500";

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Slides da Tela Inicial</h2>
                    <p className="text-sm text-gray-500">Gerencie as imagens e textos que aparecem no topo do site.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-red-600 text-white font-bold py-2.5 px-6 rounded-full text-sm hover:bg-red-700 transition-colors shadow-md"
                >
                    + Novo Slide
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border-2 border-red-500 mb-6 shadow-lg">
                    <h3 className="font-bold text-lg text-red-600 mb-4">Adicionar Novo Slide</h3>
                    <form onSubmit={handleAddSubmit} className="space-y-4">
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">URL da Imagem</label>
                            <input type="text" value={newSlide.imageUrl} onChange={e => setNewSlide({...newSlide, imageUrl: e.target.value})} className={inputClass} required placeholder="https://..." />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Título Principal</label>
                            <input type="text" value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} className={inputClass} required placeholder="Ex: Coleção de Verão" />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Subtítulo / Descrição</label>
                            <input type="text" value={newSlide.subtitle} onChange={e => setNewSlide({...newSlide, subtitle: e.target.value})} className={inputClass} required placeholder="Ex: Confira as novidades..." />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Texto do Botão</label>
                            <input type="text" value={newSlide.buttonText} onChange={e => setNewSlide({...newSlide, buttonText: e.target.value})} className={inputClass} required placeholder="Ex: Comprar Agora" />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 font-bold bg-gray-100 rounded-full hover:bg-gray-200">Cancelar</button>
                            <button type="submit" className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700">Adicionar Slide</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-6">
                {slides.map(slide => (
                    <AdminSlideRow key={slide.id} slide={slide} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </div>
        </div>
    )
}

const AdminSlideRow: React.FC<{ slide: HeroSlide, onUpdate: (s: HeroSlide) => void, onDelete: (id: number) => void }> = ({ slide, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSlide, setEditedSlide] = useState(slide);

    const handleSave = () => {
        onUpdate(editedSlide);
        setIsEditing(false);
    };
    
    const inputClass = "w-full p-2 rounded border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm";


    if (isEditing) {
        return (
             <div className="bg-white p-6 rounded-xl border-2 border-red-500 shadow-md space-y-4">
                 <h4 className="font-bold text-gray-800">Editando Slide #{slide.id}</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                         <label className="block text-xs font-bold text-gray-500 mb-1">Título</label>
                         <input type="text" value={editedSlide.title} onChange={e => setEditedSlide({...editedSlide, title: e.target.value})} className={inputClass} />
                     </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-500 mb-1">Texto Botão</label>
                         <input type="text" value={editedSlide.buttonText} onChange={e => setEditedSlide({...editedSlide, buttonText: e.target.value})} className={inputClass} />
                     </div>
                 </div>
                 <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">Subtítulo</label>
                     <input type="text" value={editedSlide.subtitle} onChange={e => setEditedSlide({...editedSlide, subtitle: e.target.value})} className={inputClass} />
                 </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">URL da Imagem</label>
                     <input type="text" value={editedSlide.imageUrl} onChange={e => setEditedSlide({...editedSlide, imageUrl: e.target.value})} className={inputClass} />
                 </div>
                 <div className="flex justify-end gap-2 pt-2">
                     <button onClick={() => setIsEditing(false)} className="text-gray-600 px-4 py-2 font-bold bg-gray-100 rounded-full hover:bg-gray-200">Cancelar</button>
                     <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700">Salvar</button>
                 </div>
             </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow">
            <div className="relative group w-full md:w-48 h-28 flex-shrink-0">
                <img src={slide.imageUrl} alt="Slide Preview" className="w-full h-full object-cover rounded-lg bg-gray-100 border border-gray-200" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
                <h4 className="font-bold text-gray-900 text-lg">{slide.title}</h4>
                <p className="text-sm text-gray-600">{slide.subtitle}</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                    Botão: {slide.buttonText}
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={() => setIsEditing(true)} className="p-2.5 text-gray-500 bg-gray-50 border border-gray-200 rounded-full hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all" title="Editar">✏️</button>
                <button onClick={() => onDelete(slide.id)} className="p-2.5 text-gray-500 bg-gray-50 border border-gray-200 rounded-full hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all" title="Excluir">🗑️</button>
            </div>
        </div>
    )
}

export default AdminPage;
