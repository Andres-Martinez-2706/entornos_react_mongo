import { useState, useEffect } from 'react';
import { dishService } from '../services/dishService';
import { categoryService } from '../services/categoryService';
import ImageUploader from '../components/ImageUploader';

const DishForm = ({ dish, onSave, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    ingredientes: [],
  });
  const [ingredientInput, setIngredientInput] = useState('');

  useEffect(() => {
    loadCategories();
    if (dish) {
      setFormData({
        name: dish.name || '',
        category: dish.category || '',
        price: dish.price || '',
        description: dish.description || '',
        imageUrl: dish.imageUrl || '',
        ingredientes: dish.ingredientes || [],
      });
    }
  }, [dish]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUploaded = (url) => {
    setFormData({ ...formData, imageUrl: url });
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData({
        ...formData,
        ingredientes: [...formData.ingredientes, ingredientInput.trim()],
      });
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setFormData({
      ...formData,
      ingredientes: formData.ingredientes.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!formData.imageUrl) {
      setError('Por favor sube una imagen del plato');
      return;
    }

    if (formData.price <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    try {
      setLoading(true);
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (dish) {
        await dishService.updateDish(dish.id, dataToSend);
      } else {
        await dishService.createDish(dataToSend);
      }

      onSave();
    } catch (err) {
      setError('Error al guardar el plato. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {dish ? 'Editar Plato' : 'Crear Nuevo Plato'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Uploader */}
            <ImageUploader
              onImageUploaded={handleImageUploaded}
              currentImageUrl={formData.imageUrl}
            />

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del plato *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Ej: Hamburguesa BBQ"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (COP) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="25000"
                min="0"
                step="100"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                rows="3"
                placeholder="Describe el plato..."
                required
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredientes (opcional)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
                  className="input-field flex-1"
                  placeholder="Ej: Pan, Carne, Queso..."
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="btn-secondary"
                >
                  Agregar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.ingredientes.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{ing}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary py-3"
              >
                {loading ? 'Guardando...' : dish ? 'Actualizar Plato' : 'Crear Plato'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 btn-secondary py-3"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DishForm;