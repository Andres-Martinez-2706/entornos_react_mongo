package uis.edu.co.food.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import uis.edu.co.food.dto.DishRequest;
import uis.edu.co.food.models.Dish;
import uis.edu.co.food.repositories.CategoryRepository;
import uis.edu.co.food.repositories.DishRepository;

@Service
@RequiredArgsConstructor
public class DishService {

    private final DishRepository dishRepository;

    // Listar todos o filtrar por categoría y/o búsqueda
    public List<Dish> getAllDishes(String category, String search) {
        // Si hay categoría Y búsqueda
        if (category != null && !category.isEmpty() && search != null && !search.isEmpty()) {
            return dishRepository.findByCategoryAndSearch(category, search);
        }
        
        // Solo categoría
        if (category != null && !category.isEmpty()) {
            return dishRepository.findByCategory(category);
        }
        
        // Solo búsqueda
        if (search != null && !search.isEmpty()) {
            return dishRepository.searchByNameOrDescription(search);
        }
        
        // Sin filtros, devolver todos
        return dishRepository.findAll();
    }

    // Obtener un plato por ID
    public Dish getDishById(String id) {
        return dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
    }

    // Crear plato
    public Dish createDish(DishRequest request) {
        validateDishRequest(request);
        
        Dish dish = new Dish();
        dish.setName(request.getName());
        dish.setCategory(request.getCategory());
        dish.setPrice(request.getPrice());
        dish.setDescription(request.getDescription());
        dish.setImageUrl(request.getImageUrl());
        dish.setIngredientes(request.getIngredientes());
        
        dish.prePersist(); // Setear fechas
        
        return dishRepository.save(dish);
    }

    // Actualizar plato
    public Dish updateDish(String id, DishRequest request) {
        validateDishRequest(request);
        
        Dish dish = getDishById(id); // Lanza excepción si no existe
        
        dish.setName(request.getName());
        dish.setCategory(request.getCategory());
        dish.setPrice(request.getPrice());
        dish.setDescription(request.getDescription());
        dish.setImageUrl(request.getImageUrl());
        dish.setIngredientes(request.getIngredientes());
        
        dish.prePersist(); // Actualizar updatedAt
        
        return dishRepository.save(dish);
    }

    // Eliminar plato
    public void deleteDish(String id) {
        Dish dish = getDishById(id); // Valida que exista
        dishRepository.delete(dish);
    }

    @Autowired
    private CategoryRepository categoryRepository;

    // Validaciones básicas
    private void validateDishRequest(DishRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (request.getCategory() == null || request.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Category is required");
        }
        if (request.getPrice() == null || request.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required");
        }
        if (request.getImageUrl() == null || request.getImageUrl().trim().isEmpty()) {
            throw new IllegalArgumentException("Image URL is required");
        }
        // Validación simple de URL
        if (!request.getImageUrl().startsWith("http")) {
            throw new IllegalArgumentException("Image URL must be a valid URL");
        }
        boolean exists = categoryRepository.findByName(request.getCategory()).isPresent();
        if (!exists) throw new IllegalArgumentException("Invalid category");
    }
}