# 📚 Sistema de Gestión de Libros - API REST

Una API REST completa para la gestión de libros desarrollada con Node.js, Express.js y TypeScript.

## 🚀 Características

- **Operaciones CRUD completas** para libros
- **Búsqueda interna** por título, autor o género
- **Integración con Google Books API** para búsquedas externas
- **Validación de datos** robusta
- **Manejo de errores** completo
- **Tipado estático** con TypeScript
- **Documentación de API** incluida

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset de JavaScript con tipado estático
- **dotenv** - Gestión de variables de entorno
- **axios** - Cliente HTTP para integraciones externas
- **cors** - Middleware para CORS
- **uuid** - Generación de IDs únicos

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- POSTman (para pruebas de la API)

## 🚀 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd ejercicio-clase-1
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp env.example .env
   ```
   
   Editar el archivo `.env` con tus configuraciones:
   ```env
   PORT=3000
   NODE_ENV=development
   GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1/volumes
   GOOGLE_BOOKS_API_KEY=tu_api_key_aqui  # Opcional
   ```

## 🏃‍♂️ Ejecución

### **Modo Desarrollo (Recomendado para pruebas)**
```bash
npm run dev
```

### **Modo Producción**
```bash
npm run build
npm start
```

### **Otros comandos útiles**
```bash
npm run build:watch  # Compilar en modo watch
npm run clean        # Limpiar archivos compilados
```

## 📖 Uso de la API

### Endpoints Principales

#### Gestión de Libros (CRUD)

- **GET** `/api/books` - Obtener todos los libros
- **GET** `/api/books/:id` - Obtener libro por ID
- **POST** `/api/books` - Crear nuevo libro
- **PUT** `/api/books/:id` - Actualizar libro existente
- **DELETE** `/api/books/:id` - Eliminar libro
- **GET** `/api/books/search?q=query` - Buscar libros internamente

#### Búsquedas Externas (Google Books)

- **GET** `/api/external/search?q=query` - Buscar libros en Google Books
- **GET** `/api/external/author?author=nombre` - Buscar por autor
- **GET** `/api/external/subject?subject=genero` - Buscar por género
- **GET** `/api/external/book/:id` - Obtener libro específico de Google Books

### Ejemplos de Uso

#### Crear un nuevo libro
```bash
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "El Hobbit",
  "author": "J.R.R. Tolkien",
  "publicationYear": 1937,
  "genre": "Fantasía",
  "description": "Una aventura épica en la Tierra Media",
  "pageCount": 310,
  "language": "Español"
}
```

#### Buscar libros internamente
```bash
GET http://localhost:3000/api/books/search?q=tolkien
```

#### Buscar en Google Books
```bash
GET http://localhost:3000/api/external/search?q=harry+potter&maxResults=5
```

## 🧪 Pruebas con POSTman

### **Importar la Colección**
1. Abrir POSTman
2. Importar el archivo `postman_collection.json`
3. La colección incluye **todas las pruebas necesarias** para el ejercicio

### **Configurar el Entorno**
- Variable: `{{base_url}}` = `http://localhost:3000`

### **Flujo de Pruebas Recomendado**

1. **🏠 Endpoints Principales**
   - GET `/` - Información de la API
   - GET `/health` - Estado de salud

2. **📚 Gestión de Libros (CRUD)**
   - POST `/api/books` - Crear libro
   - GET `/api/books` - Obtener todos
   - GET `/api/books/:id` - Obtener por ID
   - PUT `/api/books/:id` - Actualizar
   - DELETE `/api/books/:id` - Eliminar

3. **🔍 Búsquedas Internas**
   - GET `/api/books/search?q=query` - Buscar internamente

4. **🌐 Búsquedas Externas (Google Books)**
   - GET `/api/external/search?q=query` - Buscar en Google Books
   - GET `/api/external/author?author=nombre` - Buscar por autor
   - GET `/api/external/subject?subject=genero` - Buscar por género

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Ejecutar en modo desarrollo con hot reload
npm run build        # Compilar TypeScript a JavaScript
npm run build:watch  # Compilar en modo watch
npm start            # Ejecutar versión compilada
npm run clean        # Limpiar archivos compilados

# Instalación
npm install          # Instalar dependencias
npm install -D       # Instalar dependencias de desarrollo
```

## 📁 Estructura del Proyecto

```
src/
├── models/          # Interfaces y tipos TypeScript
├── controllers/     # Lógica de negocio
├── routes/          # Definición de rutas
├── services/        # Servicios externos (Google Books)
└── app.ts          # Punto de entrada de la aplicación
```

## 🌐 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | 3000 |
| `NODE_ENV` | Entorno de ejecución | development |
| `GOOGLE_BOOKS_API_URL` | URL de la API de Google Books | https://www.googleapis.com/books/v1/volumes |
| `GOOGLE_BOOKS_API_KEY` | API Key de Google (opcional) | - |

## 📊 Estado de la API

### **Endpoints Funcionando**
- ✅ **GET** `/` - Información de la API
- ✅ **GET** `/health` - Estado de salud
- ✅ **GET** `/api/books` - Obtener todos los libros
- ✅ **POST** `/api/books` - Crear libro
- ✅ **GET** `/api/books/:id` - Obtener libro por ID
- ✅ **PUT** `/api/books/:id` - Actualizar libro
- ✅ **DELETE** `/api/books/:id` - Eliminar libro
- ✅ **GET** `/api/books/search?q=query` - Búsqueda interna
- ✅ **GET** `/api/external/search?q=query` - Búsqueda en Google Books
- ✅ **GET** `/api/external/author?author=nombre` - Búsqueda por autor
- ✅ **GET** `/api/external/subject?subject=genero` - Búsqueda por género

### **Datos de Prueba Incluidos**
- ✅ 2 libros pre-cargados para pruebas
- ✅ Validaciones funcionando
- ✅ Búsquedas funcionando
- ✅ Integración externa funcionando




