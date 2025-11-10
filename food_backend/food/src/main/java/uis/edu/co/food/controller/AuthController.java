package uis.edu.co.food.controller;

import uis.edu.co.food.dto.LoginRequest;
import uis.edu.co.food.dto.RegisterRequest;
import uis.edu.co.food.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import uis.edu.co.food.models.User;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        return authService.register(request.getUsername(), request.getPassword(), "ROLE_ADMIN");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest req) {
        String token = authService.login(req.getUsername(), req.getPassword());
        return Map.of("token", token);
    }

}
