package uis.edu.co.food.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import uis.edu.co.food.models.Dish;

public interface DishRepository extends MongoRepository<Dish, String> {
    
    // Buscar por categoría exacta
    List<Dish> findByCategory(String category);
    
    // Buscar por nombre (case insensitive, contiene)
    List<Dish> findByNameContainingIgnoreCase(String name);
    
    // Búsqueda combinada: nombre O descripción (case insensitive)
    @Query("{ $or: [ " +
           "{ 'name': { $regex: ?0, $options: 'i' } }, " +
           "{ 'description': { $regex: ?0, $options: 'i' } } " +
           "] }")
    List<Dish> searchByNameOrDescription(String searchTerm);
    
    // Buscar por categoría Y que contenga texto en nombre/descripción
    @Query("{ 'category': ?0, $or: [ " +
           "{ 'name': { $regex: ?1, $options: 'i' } }, " +
           "{ 'description': { $regex: ?1, $options: 'i' } } " +
           "] }")
    List<Dish> findByCategoryAndSearch(String category, String searchTerm);
}