# 🔧 Food App - Backend (Spring Boot)

API REST para la gestión de menús de restaurante con autenticación JWT y MongoDB.

## 🛠️ Tecnologías

- **Spring Boot 3.x**
- **Spring Data MongoDB**
- **Spring Security + JWT**
- **Swagger/OpenAPI**
- **Lombok**
- **Maven**

## 📁 Estructura del Proyecto

```
src/main/java/uis/edu/co/food/
├── config/              # Configuraciones (Security, CORS, JWT, Swagger)
├── controller/          # Controladores REST
├── dto/                 # Data Transfer Objects
├── models/             # Entidades de MongoDB
├── repositories/       # Repositorios de datos
├── security/           # Filtros de seguridad
└── service/            # Lógica de negocio
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` o configurar en el sistema:

```bash
# MongoDB
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/

# JWT
JWT_SECRET=tu_secreto_jwt_minimo_256_bits
JWT_EXP_MS=3600000

# CORS
CORS_ALLOWED_ORIGIN=http://localhost:5173
```

### application.properties

```properties
spring.application.name=food
server.port=8080
spring.data.mongodb.uri=${MONGO_URI}
spring.data.mongodb.database=restaurante_db

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXP_MS}

spring.mvc.cors.allowed-origins=${CORS_ALLOWED_ORIGIN}
spring.mvc.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.mvc.cors.allowed-headers=*
spring.mvc.cors.allow-credentials=true
```

## 📡 Endpoints Principales

### Autenticación (Público)
```http
POST /api/auth/register    # Registrar usuario (rol ADMIN por defecto)
POST /api/auth/login       # Login - retorna JWT
```

### Platos
```http
GET    /api/dishes                    # Listar (público)
GET    /api/dishes?category=X         # Filtrar por categoría
GET    /api/dishes?search=X           # Buscar en nombre/descripción
GET    /api/dishes/{id}               # Obtener por ID
POST   /api/dishes                    # Crear (requiere ADMIN)
PUT    /api/dishes/{id}               # Actualizar (requiere ADMIN)
DELETE /api/dishes/{id}               # Eliminar (requiere ADMIN)
```

### Categorías
```http
GET    /api/categories         # Listar (público)
GET    /api/categories/{id}    # Obtener por ID
POST   /api/categories         # Crear (requiere ADMIN)
PUT    /api/categories/{id}    # Actualizar (requiere ADMIN)
DELETE /api/categories/{id}    # Eliminar (requiere ADMIN)
```

## 📚 Documentación Swagger

Una vez iniciada la aplicación, accede a:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

### Probar endpoints protegidos en Swagger:
1. Usa `/api/auth/login` para obtener el token
2. Click en "Authorize" (candado verde)
3. Pega el token (sin "Bearer")
4. Ahora puedes probar endpoints ADMIN

## 🔐 Seguridad

- **JWT**: Token expira según `JWT_EXP_MS`
- **BCrypt**: Passwords hasheados
- **CORS**: Configurado para permitir solo orígenes específicos
- **Roles**: `ROLE_ADMIN` para operaciones de escritura

## 🗄️ Modelos de Datos

### User
```json
{
  "id": "string",
  "username": "string",
  "role": "ROLE_ADMIN",
  "password": "hashed"
}
```

### Dish
```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "price": "number",
  "description": "string",
  "imageUrl": "string",
  "ingredientes": ["string"],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Category
```json
{
  "id": "string",
  "name": "string"
}
```