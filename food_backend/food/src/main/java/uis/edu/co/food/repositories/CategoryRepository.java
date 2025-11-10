package uis.edu.co.food.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import uis.edu.co.food.models.Category;
import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {
    Optional<Category> findByName(String name);
}
