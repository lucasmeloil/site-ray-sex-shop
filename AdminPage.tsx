import React, { useState } from 'react';
import type { Product, AdminUser, HeroSlide, PageBanner } from './types';
import AdminProfilePage from './AdminProfilePage';
import AdminProductRow from './components/AdminProductRow';
import { LogOut, Home, Image as ImageIcon, Type, MousePointer2, FileText, LayoutTemplate } from 'lucide-react';

interface AdminPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onOpenAddModal: () => void;
  onLogout: () => void;
  onBack: () => void;
  adminUsers: AdminUser[];
  onAddAdmin: (newAdmin: { email: string; password: string }) => void;
  onUpdateAdminPassword: (userId: number, newPassword: string) => void;
  currentUser: AdminUser;
  heroSlides: HeroSlide[];
  onUpdateSlide: (slide: HeroSlide) => void;
  onAddSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  onDeleteSlide: (id: number) => void;
  pageBanners: PageBanner[];
  onUpdatePageBanner: (banner: PageBanner) => void;
}

type AdminTab = 'products' | 'users' | 'hero' | 'pages';

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
          🖼️ Banners (Home)
        </button>
         <button 
          onClick={() => setActiveTab('pages')} 
          className={`py-4 px-6 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'pages' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          📄 Páginas
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
        {activeTab === 'pages' && (
            <AdminPagesSection
                banners={props.pageBanners}
                onUpdate={props.onUpdatePageBanner}
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
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Banners da Tela Inicial</h2>
                    <p className="text-sm text-gray-500 mt-1">Gerencie as imagens rotativas (sliders) da página principal.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-red-600 text-white font-bold py-3 px-8 rounded-full text-sm hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/30"
                >
                    + Novo Banner
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border-2 border-red-500 mb-6 shadow-xl animate-fade-in-up">
                    <h3 className="font-bold text-lg text-red-600 mb-4 flex items-center gap-2">
                        <ImageIcon size={20} />
                        Adicionar Novo Banner
                    </h3>
                    <form onSubmit={handleAddSubmit} className="space-y-4">
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">URL da Imagem de Fundo</label>
                            <input type="text" value={newSlide.imageUrl} onChange={e => setNewSlide({...newSlide, imageUrl: e.target.value})} className={inputClass} required placeholder="https://exemplo.com/imagem.jpg" />
                            <p className="text-xs text-gray-500 mt-1">Recomendado: Imagens horizontais de alta qualidade (1920x1080).</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Título Principal</label>
                                <input type="text" value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} className={inputClass} required placeholder="Ex: Coleção de Verão" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Texto do Botão</label>
                                <input type="text" value={newSlide.buttonText} onChange={e => setNewSlide({...newSlide, buttonText: e.target.value})} className={inputClass} required placeholder="Ex: Comprar Agora" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Subtítulo / Descrição</label>
                            <input type="text" value={newSlide.subtitle} onChange={e => setNewSlide({...newSlide, subtitle: e.target.value})} className={inputClass} required placeholder="Ex: Confira as novidades..." />
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2.5 text-gray-600 font-bold bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">Cancelar</button>
                            <button type="submit" className="px-8 py-2.5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-md">Salvar Banner</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-6">
                {slides.map((slide, index) => (
                    <AdminSlideRow key={slide.id} slide={slide} index={index} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </div>
        </div>
    )
}

const AdminSlideRow: React.FC<{ slide: HeroSlide, index: number, onUpdate: (s: HeroSlide) => void, onDelete: (id: number) => void }> = ({ slide, index, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSlide, setEditedSlide] = useState(slide);

    const handleSave = () => {
        onUpdate(editedSlide);
        setIsEditing(false);
    };
    
    const inputClass = "w-full p-2.5 rounded border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm";

    if (isEditing) {
        return (
             <div className="bg-white p-6 rounded-xl border-2 border-red-500 shadow-md space-y-4">
                 <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <ImageIcon size={18} className="text-red-500" />
                    Editando Banner #{index + 1}
                 </h4>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Preview Column */}
                     <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500">Pré-visualização da Imagem</label>
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                             <img src={editedSlide.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=Erro+Imagem')} />
                        </div>
                     </div>

                     {/* Fields Column */}
                     <div className="space-y-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><ImageIcon size={12}/> URL da Imagem</label>
                             <input type="text" value={editedSlide.imageUrl} onChange={e => setEditedSlide({...editedSlide, imageUrl: e.target.value})} className={inputClass} />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><Type size={12}/> Título Principal</label>
                             <input type="text" value={editedSlide.title} onChange={e => setEditedSlide({...editedSlide, title: e.target.value})} className={inputClass} />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 mb-1">Subtítulo</label>
                             <input type="text" value={editedSlide.subtitle} onChange={e => setEditedSlide({...editedSlide, subtitle: e.target.value})} className={inputClass} />
                         </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><MousePointer2 size={12}/> Texto do Botão</label>
                             <input type="text" value={editedSlide.buttonText} onChange={e => setEditedSlide({...editedSlide, buttonText: e.target.value})} className={inputClass} />
                         </div>
                     </div>
                 </div>

                 <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                     <button onClick={() => setIsEditing(false)} className="text-gray-600 px-6 py-2 font-bold bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">Cancelar</button>
                     <button onClick={handleSave} className="bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-colors shadow-md">Salvar Alterações</button>
                 </div>
             </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-shadow group">
            <div className="relative w-full md:w-64 h-36 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                <img src={slide.imageUrl} alt="Slide Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
                <h4 className="font-black text-gray-900 text-xl">{slide.title}</h4>
                <p className="text-sm text-gray-600 max-w-lg">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
                        Botão: {slide.buttonText}
                    </span>
                </div>
            </div>
            
            <div className="flex gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all font-bold text-sm" title="Editar">
                    ✏️ Editar
                </button>
                <button onClick={() => onDelete(slide.id)} className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 border border-red-100 rounded-full hover:bg-red-600 hover:text-white transition-all font-bold text-sm" title="Excluir">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    )
}

// --- Page Banners Section ---
const AdminPagesSection: React.FC<{
    banners: PageBanner[],
    onUpdate: (b: PageBanner) => void
}> = ({ banners, onUpdate }) => {
    const [selectedPage, setSelectedPage] = useState<'catalog' | 'contact'>('catalog');
    
    // Find the banner for the currently selected page
    const currentBanner = banners.find(b => b.pageId === selectedPage) || {
        pageId: selectedPage,
        imageUrl: '',
        title: '',
        subtitle: ''
    };

    const [editedBanner, setEditedBanner] = useState(currentBanner);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Update local state when selected page changes
    React.useEffect(() => {
        const found = banners.find(b => b.pageId === selectedPage);
        if (found) {
            setEditedBanner(found);
        } else {
             setEditedBanner({ pageId: selectedPage, imageUrl: '', title: '', subtitle: '' });
        }
        setHasUnsavedChanges(false);
    }, [selectedPage, banners]);

    const handleSave = () => {
        onUpdate(editedBanner);
        setHasUnsavedChanges(false);
        alert("Banner atualizado com sucesso!");
    };
    
    const handleChange = (field: keyof PageBanner, value: string) => {
        setEditedBanner(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true);
    }
    
    const inputClass = "w-full p-3 rounded border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500";

    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <LayoutTemplate className="text-red-600" />
                        Gerenciar Capas das Páginas
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Edite a imagem de destaque e os textos do topo das páginas internas.</p>
                 </div>
                 
                 {/* Page Selector */}
                 <div className="flex bg-gray-100 p-1 rounded-lg">
                     <button 
                        onClick={() => setSelectedPage('catalog')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${selectedPage === 'catalog' ? 'bg-white shadow text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                        Catálogo
                     </button>
                      <button 
                        onClick={() => setSelectedPage('contact')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${selectedPage === 'contact' ? 'bg-white shadow text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                        Contato
                     </button>
                 </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Preview */}
                 <div className="space-y-3">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Pré-visualização</label>
                     <div className="relative w-full h-64 bg-gray-900 rounded-xl overflow-hidden shadow-lg group">
                         <img 
                            src={editedBanner.imageUrl} 
                            alt="Banner Preview" 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x400?text=Imagem+Indisponível')}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                         <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                             <span className="inline-block py-1 px-2 rounded bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase mb-2 border border-white/10">
                                 {selectedPage === 'catalog' ? 'Catálogo Exclusivo' : 'Atendimento'}
                             </span>
                             <h3 className="text-3xl font-black leading-none mb-2">{editedBanner.title || 'Título da Página'}</h3>
                             <p className="text-sm font-light text-gray-200 line-clamp-2">{editedBanner.subtitle || 'Subtítulo da página...'}</p>
                         </div>
                     </div>
                     <p className="text-xs text-gray-400 text-center">A aparência real pode variar dependendo do tamanho da tela.</p>
                 </div>

                 {/* Editor Form */}
                 <div className="space-y-5">
                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">URL da Imagem</label>
                         <div className="flex gap-2">
                             <input 
                                type="text" 
                                value={editedBanner.imageUrl} 
                                onChange={(e) => handleChange('imageUrl', e.target.value)} 
                                className={inputClass} 
                                placeholder="https://..."
                             />
                         </div>
                     </div>
                     
                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Título Principal</label>
                         <input 
                            type="text" 
                            value={editedBanner.title} 
                            onChange={(e) => handleChange('title', e.target.value)} 
                            className={inputClass} 
                         />
                     </div>

                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Subtítulo / Descrição</label>
                         <textarea 
                            value={editedBanner.subtitle} 
                            onChange={(e) => handleChange('subtitle', e.target.value)} 
                            rows={3}
                            className={inputClass} 
                         ></textarea>
                     </div>

                     <div className="pt-4 flex justify-end">
                         <button 
                            onClick={handleSave} 
                            disabled={!hasUnsavedChanges}
                            className={`px-8 py-3 rounded-full font-bold shadow-md transition-all flex items-center gap-2
                                ${hasUnsavedChanges 
                                    ? 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                         >
                            <FileText size={18} />
                            Salvar Alterações
                         </button>
                     </div>
                 </div>
             </div>
        </div>
    );
};

export default AdminPage;