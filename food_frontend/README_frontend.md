# ⚛️ Food App - Frontend (React + Vite)

Aplicación web moderna para visualizar y gestionar el menú de un restaurante.

## 🛠️ Tecnologías

- **React 18** - Biblioteca UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de estilos
- **Cloudinary** - Gestión de imágenes

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── DishCard.jsx
│   ├── FilterBar.jsx
│   ├── ImageUploader.jsx
│   └── ProtectedRoute.jsx
├── contexts/           # Context API (Auth)
│   └── AuthContext.jsx
├── pages/             # Páginas/Vistas
│   ├── Home.jsx       # Vista pública
│   ├── Login.jsx      # Autenticación
│   ├── Dashboard.jsx  # Panel admin
│   └── DishForm.jsx   # Crear/Editar plato
├── services/          # Servicios API
│   ├── api.js
│   ├── authService.js
│   ├── dishService.js
│   ├── categoryService.js
│   └── cloudinaryService.js
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Variables de Entorno

Crear archivo `.env` en la raíz:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

### 3. Configurar Cloudinary Upload Preset

1. Ir a [Cloudinary Dashboard](https://cloudinary.com/console)
2. Settings → Upload → Upload Presets
3. Crear nuevo preset:
   - **Signing Mode**: Unsigned
   - **Folder**: dishes (opcional)
4. Copiar el nombre del preset a `VITE_CLOUDINARY_UPLOAD_PRESET`


## 🎨 Características

### Vista Pública (/)
- ✅ Catálogo de platos con imágenes
- ✅ Filtros por categoría
- ✅ Barra de búsqueda en tiempo real
- ✅ Modal con detalles completos del plato
- ✅ Diseño responsive

### Login (/login)
- ✅ Autenticación con JWT
- ✅ Validación de campos
- ✅ Mensajes de error

### Dashboard (/dashboard) - Requiere Login
- ✅ CRUD completo de platos
- ✅ Gestión de categorías
- ✅ Upload de imágenes directo a Cloudinary
- ✅ Vista previa de imágenes
- ✅ Validaciones en tiempo real

## 🔐 Autenticación

El sistema usa **JWT** almacenado en `localStorage`:

```javascript
// Login automático incluye el token en headers
Authorization: Bearer <token>
```

Las rutas protegidas redirigen a `/login` si no hay token válido.

## 🎨 Personalización de Estilos

### Tailwind Config
Colores principales en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#ef4444',    // Rojo
      secondary: '#f97316',  // Naranja
    }
  }
}
```

### Clases Personalizadas
Definidas en `src/index.css`:
- `.btn-primary` - Botón principal
- `.btn-secondary` - Botón secundario
- `.btn-danger` - Botón de eliminar
- `.input-field` - Campo de entrada
- `.card` - Tarjeta de contenido

## 📡 Servicios API

### DishService
```javascript
getAllDishes(category?, search?)
getDishById(id)
createDish(dishData)
updateDish(id, dishData)
deleteDish(id)
```

### CategoryService
```javascript
getAllCategories()
createCategory(categoryData)
deleteCategory(id)
```

### CloudinaryService
```javascript
uploadImage(file) // Retorna URL pública
```

## 🖼️ Upload de Imágenes

El flujo de upload es:
1. Usuario selecciona imagen en `ImageUploader`
2. Frontend sube **directamente a Cloudinary** (sin pasar por backend)
3. Cloudinary retorna `secure_url`
4. Se envía la URL al backend junto con los datos del plato

**Ventajas:**
- ✅ Menor carga en el backend
- ✅ Upload más rápido
- ✅ CDN de Cloudinary

