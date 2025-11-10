package uis.edu.co.food.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import uis.edu.co.food.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
