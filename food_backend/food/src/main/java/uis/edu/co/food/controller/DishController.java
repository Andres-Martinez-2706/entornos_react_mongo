package uis.edu.co.food.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import uis.edu.co.food.dto.DishRequest;
import uis.edu.co.food.models.Dish;
import uis.edu.co.food.service.DishService;

@RestController
@RequestMapping("/api/dishes")
@RequiredArgsConstructor
public class DishController {

    private final DishService dishService;

    /**
     * GET /api/dishes
     * Listar todos los platos (público)
     * Query params opcionales:
     *   - category: filtrar por categoría
     *   - search: buscar en nombre o descripción
     * 
     * Ejemplos:
     *   GET /api/dishes
     *   GET /api/dishes?category=Comida rápida
     *   GET /api/dishes?search=hamburguesa
     *   GET /api/dishes?category=Comida rápida&search=BBQ
     */
    @GetMapping
    public ResponseEntity<List<Dish>> getAllDishes(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        
        List<Dish> dishes = dishService.getAllDishes(category, search);
        return ResponseEntity.ok(dishes);
    }

    /**
     * GET /api/dishes/{id}
     * Obtener un plato por ID (público)
     */
    @GetMapping("/{id}")
    public ResponseEntity<Dish> getDishById(@PathVariable String id) {
        Dish dish = dishService.getDishById(id);
        return ResponseEntity.ok(dish);
    }

    /**
     * POST /api/dishes
     * Crear un nuevo plato (protegido - solo ROLE_ADMIN)
     */
    @PostMapping
    public ResponseEntity<Dish> createDish(@RequestBody DishRequest request) {
        Dish created = dishService.createDish(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * PUT /api/dishes/{id}
     * Actualizar un plato existente (protegido - solo ROLE_ADMIN)
     */
    @PutMapping("/{id}")
    public ResponseEntity<Dish> updateDish(
            @PathVariable String id,
            @RequestBody DishRequest request) {
        
        Dish updated = dishService.updateDish(id, request);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/dishes/{id}
     * Eliminar un plato (protegido - solo ROLE_ADMIN)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDish(@PathVariable String id) {
        dishService.deleteDish(id);
        return ResponseEntity.noContent().build();
    }
}