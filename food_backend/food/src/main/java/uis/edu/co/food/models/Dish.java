package uis.edu.co.food.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "dishes")
public class Dish {

    @Id
    private String id;

    private String name;
    private String category;
    private Double price;
    private String description;
    private String imageUrl;
    private List<String> ingredientes;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Se ejecuta antes de guardar (puedes usar @PrePersist si lo prefieres)
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        this.updatedAt = LocalDateTime.now();
    }
}