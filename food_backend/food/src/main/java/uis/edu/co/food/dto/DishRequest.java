package uis.edu.co.food.dto;

import java.util.List;

import lombok.Data;

@Data
public class DishRequest {
    private String name;
    private String category;
    private Double price;
    private String description;
    private String imageUrl;
    private List<String> ingredientes;
}