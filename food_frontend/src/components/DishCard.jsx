const DishCard = ({ dish, onEdit, onDelete, onSelect, showActions = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = (e) => {
    // Evita que el clic se propague a botones de acciones si existen
    if (showActions && (e.target.closest('button') || e.target.closest('.btn-danger'))) {
      return;
    }
    if (onSelect) {
      onSelect(dish);
    }
  };

  return (
    <div 
      className="card overflow-hidden group cursor-pointer" 
      onClick={handleCardClick} // Agregado: clic en toda la card
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-primary">
            {formatPrice(dish.price)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            {dish.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {dish.description}
        </p>

        {dish.ingredientes && dish.ingredientes.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 font-semibold mb-1">Ingredientes:</p>
            <div className="flex flex-wrap gap-1">
              {dish.ingredientes.slice(0, 4).map((ing, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {ing}
                </span>
              ))}
              {dish.ingredientes.length > 4 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{dish.ingredientes.length - 4} más
                </span>
              )}
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(dish)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 text-sm font-semibold"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(dish.id)}
              className="flex-1 btn-danger text-sm"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishCard;