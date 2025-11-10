package uis.edu.co.food.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import uis.edu.co.food.models.Category;
import uis.edu.co.food.repositories.CategoryRepository;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repo;

    public List<Category> findAll() {
        return repo.findAll();
    }

    public Category findById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public Category create(Category c) {
        // validar que no exista
        if (repo.findByName(c.getName()).isPresent()) {
            throw new RuntimeException("Category already exists");
        }
        return repo.save(c);
    }

    public Category update(String id, Category c) {
        Category existing = findById(id);
        existing.setName(c.getName());
        return repo.save(existing);
    }

    public void delete(String id) {
        Category existing = findById(id);
        repo.delete(existing);
    }
}
