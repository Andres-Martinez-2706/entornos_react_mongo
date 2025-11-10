# 🍽️ Food App - Sistema de Gestión de Restaurante

Aplicación web completa para la gestión de menús de restaurante con autenticación JWT, búsqueda avanzada y upload de imágenes a Cloudinary.

## 🤝🏻 **Integrantes**

* Andres Felipe Martinez
* Harold Esteban Duran
* Luige Alejandro Velasco

## 📋 Descripción

Sistema fullstack que permite:
- **Vista Pública**: Navegación y búsqueda de platos por categorías
- **Panel Administrador**: Gestión completa de platos y categorías (CRUD)
- **Autenticación**: Sistema seguro con JWT
- **Imágenes**: Upload directo a Cloudinary desde el frontend

## 🛠️ Tecnologías

### Backend
- **Spring Boot 3.x** - Framework Java
- **MongoDB** - Base de datos NoSQL
- **JWT** - Autenticación y autorización
- **Spring Security** - Seguridad
- **Swagger/OpenAPI** - Documentación de API

### Frontend
- **React 18** + **Vite** - Framework y bundler
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos
- **Cloudinary** - Gestión de imágenes

## 📁 Estructura del Proyecto

```
food_project/
├── food_backend/          # API REST con Spring Boot
│   └── food/
│       └──README.md         # Documentación del backend
├── food_frontend/         # Aplicación React
│   └── README.md         # Documentación del frontend
└── README.md             # Este archivo
```

## 🌐 Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html

## ✨ Funcionalidades Principales

### Público
- ✅ Ver catálogo de platos
- ✅ Filtrar por categorías
- ✅ Buscar por nombre/descripción
- ✅ Ver detalles de cada plato

### Administrador (requiere login)
- ✅ Crear/editar/eliminar platos
- ✅ Gestionar categorías
- ✅ Upload de imágenes
- ✅ Visualización de ingredientes

## 📖 Documentación Detallada

- [Backend - Spring Boot](./food_backend/food/README_backend.md)
- [Frontend - React + Vite](./food_frontend/README_frontend.md)

## 🤝 Contribución

Este es un proyecto académico para la asignatura Entornos de Programacion. 

Universidad Industrial de Santander (UIS).
