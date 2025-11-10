import { useState, useEffect } from 'react';
import { dishService } from '../services/dishService';
import { categoryService } from '../services/categoryService';
import DishCard from '../components/DishCard';
import DishForm from './DishForm';

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDishForm, setShowDishForm] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [dishesData, categoriesData] = await Promise.all([
        dishService.getAllDishes(),
        categoryService.getAllCategories(),
      ]);
      setDishes(dishesData);
      setCategories(categoriesData);
    } catch (error) {
      showMessage('error', 'Error al cargar los datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleCreateClick = () => {
    setEditingDish(null);
    setShowDishForm(true);
  };

  const handleEditClick = (dish) => {
    setEditingDish(dish);
    setShowDishForm(true);
  };

  const handleDishSaved = async () => {
    setShowDishForm(false);
    setEditingDish(null);
    await loadData();
    showMessage('success', 'Plato guardado exitosamente');
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este plato?')) return;

    try {
      await dishService.deleteDish(id);
      await loadData();
      showMessage('success', 'Plato eliminado exitosamente');
    } catch (error) {
      showMessage('error', 'Error al eliminar el plato');
      console.error(error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      await categoryService.createCategory({ name: newCategoryName });
      setNewCategoryName('');
      setShowCategoryForm(false);
      await loadData();
      showMessage('success', 'Categoría creada exitosamente');
    } catch (error) {
      showMessage('error', 'Error al crear la categoría');
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría? Los platos asociados no se eliminarán.')) return;

    try {
      await categoryService.deleteCategory(id);
      await loadData();
      showMessage('success', 'Categoría eliminada');
    } catch (error) {
      showMessage('error', 'Error al eliminar la categoría');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showDishForm) {
    return (
      <DishForm
        dish={editingDish}
        onSave={handleDishSaved}
        onCancel={() => {
          setShowDishForm(false);
          setEditingDish(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Administración
          </h1>
          <p className="text-gray-600">Gestiona los platos y categorías del menú</p>
        </div>

        {/* Messages */}
        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Categories Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Categorías</h2>
            <button
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              className="btn-primary text-sm"
            >
              {showCategoryForm ? 'Cancelar' : '+ Nueva Categoría'}
            </button>
          </div>

          {showCategoryForm && (
            <form onSubmit={handleCreateCategory} className="mb-4 flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nombre de la categoría"
                className="input-field flex-1"
                required
              />
              <button type="submit" className="btn-primary">
                Crear
              </button>
            </form>
          )}

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
              >
                <span className="text-sm font-medium">{cat.name}</span>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dishes Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Platos ({dishes.length})
            </h2>
            <button onClick={handleCreateClick} className="btn-primary">
              + Crear Nuevo Plato
            </button>
          </div>

          {dishes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay platos creados</p>
              <button
                onClick={handleCreateClick}
                className="btn-primary mt-4"
              >
                Crear el primero
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  showActions={true}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;