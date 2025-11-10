import { useState, useEffect } from 'react';
import { dishService } from '../services/dishService';
import DishCard from '../components/DishCard';
import FilterBar from '../components/FilterBar';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ category: '', search: '' });
  // Nuevos estados para el modal
  const [selectedDish, setSelectedDish] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadDishes();
  }, [filters]);

  const loadDishes = async () => {
    try {
      setLoading(true);
      const data = await dishService.getAllDishes(filters.category, filters.search);
      setDishes(data);
      setError('');
      // Cierra el modal al recargar/filtrar
      closeModal();
    } catch (err) {
      setError('Error al cargar los platos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Nuevo: Maneja selección de plato
  const handleSelectDish = (dish) => {
    setSelectedDish(dish);
    setShowModal(true);
  };

  // Nuevo: Cierra el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedDish(null);
  };

  const handleFilterChange = (category) => {
    setFilters({ ...filters, category });
  };

  const handleSearchChange = (search) => {
    setFilters({ ...filters, search });
  };

  // Nuevo: Renderiza el modal de detalles
  const renderDishModal = () => {
    if (!selectedDish) return null;

    const formatPrice = (price) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(price);
    };

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={closeModal} // Cierra al clic fuera
      >
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()} // Evita cierre al clic dentro
        >
          {/* Header con cerrar */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{selectedDish.name}</h2>
            <button 
              onClick={closeModal} 
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Imagen grande */}
          <div className="p-4">
            <img
              src={selectedDish.imageUrl}
              alt={selectedDish.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </div>

          {/* Detalles */}
          <div className="p-4 space-y-4">
            {/* Categoría y Precio */}
            <div className="flex justify-between items-center">
              <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedDish.category}
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(selectedDish.price)}
              </span>
            </div>

            {/* Descripción completa */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {selectedDish.description}
            </p>

            {/* Ingredientes completos */}
            {selectedDish.ingredientes && selectedDish.ingredientes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredientes</h3>
                <ul className="space-y-1">
                  {selectedDish.ingredientes.map((ing, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Botón para cerrar (opcional, ya que hay X) */}
            <button
              onClick={closeModal}
              className="w-full btn-secondary mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a Food App 🍽️</h1>
          <p className="text-xl opacity-90">
            Descubre nuestros deliciosos platos y encuentra tu favorito
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : dishes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">
              No se encontraron platos 😕
            </p>
            <p className="text-gray-400 mt-2">
              Prueba con otros filtros o búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish) => (
              <DishCard 
                key={dish.id} 
                dish={dish} 
                showActions={false}
                onSelect={handleSelectDish} // Agregado: prop para seleccionar
              />
            ))}
          </div>
        )}
      </div>

      {/* Renderiza el modal */}
      {showModal && renderDishModal()}
    </div>
  );
};

export default Home;