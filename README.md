# 📚 API de Gestión de Libros - Guía Completa

Una API REST completa para la gestión de libros desarrollada con Node.js, Express.js y TypeScript. Esta guía te llevará desde cero hasta tener la aplicación funcionando y probada.

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

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (viene con Node.js)
- **Git** (para clonar el repositorio)
- **POSTman** (opcional, para pruebas avanzadas)

### 🔍 Verificar instalaciones:
```bash
node --version
npm --version
git --version
```

---

## 🚀 Instalación y Configuración - Paso a Paso

### **Paso 1: Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd API---Gestor-de-libros
```

### **Paso 2: Instalar dependencias**
```bash
npm install
```

**¿Qué hace este comando?**
- Descarga todas las dependencias del proyecto
- Crea la carpeta `node_modules/`
- Genera el archivo `package-lock.json`
- Instala herramientas de desarrollo como `nodemon` y `ts-node`

### **Paso 3: Verificar la instalación**
```bash
ls -la
```

Deberías ver:
- ✅ `package.json` - Configuración del proyecto
- ✅ `src/` - Código fuente
- ✅ `node_modules/` - Dependencias instaladas
- ✅ `.gitignore` - Archivos a ignorar por Git

---

## 🏃‍♂️ Ejecutar la Aplicación

### **Opción A: Modo Desarrollo (Recomendado para pruebas)**
```bash
npm run dev
```

**¿Qué hace este comando?**
- Ejecuta la aplicación con `nodemon` para hot reload
- Compila TypeScript automáticamente
- Reinicia el servidor cuando detecta cambios en el código
- Muestra logs en tiempo real

### **Opción B: Modo Producción**
```bash
npm run build
npm start
```

### **Verificar que funciona**
Una vez ejecutado, deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
📚 API de Gestión de Libros activa
🌍 Entorno: development
```

---

## 🧪 Probar la API - Paso a Paso

### **Prueba 1: Verificar que la API esté funcionando**

#### **Con el navegador:**
Abre tu navegador y ve a: `http://localhost:3000`

#### **Con curl (terminal):**
```bash
curl http://localhost:3000/health
```

**Respuesta esperada:**
```json
{"status":"OK","timestamp":"2025-08-26T00:24:16.380Z"}
```

### **Prueba 2: Información de la API**
```bash
curl http://localhost:3000/
```

**Respuesta esperada:**
```json
{
  "message": "API de Gestión de Libros",
  "version": "1.0.0",
  "endpoints": {
    "books": "/api/books",
    "external": "/api/external",
    "health": "/health"
  }
}
```

### **Prueba 3: Ver libros existentes**
```bash
curl http://localhost:3000/api/books
```

**Respuesta esperada:** Lista de 2 libros pre-cargados

### **Prueba 4: Crear un nuevo libro**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El Hobbit",
    "author": "J.R.R. Tolkien",
    "publicationYear": 1937,
    "genre": "Fantasía",
    "description": "Una aventura épica en la Tierra Media",
    "pageCount": 310,
    "language": "Español"
  }'
```

**Respuesta esperada:** Confirmación de libro creado con ID único

### **Prueba 5: Verificar libro creado**
```bash
curl http://localhost:3000/api/books
```

**Respuesta esperada:** Ahora deberías ver 3 libros

### **Prueba 6: Búsqueda interna**
```bash
curl "http://localhost:3000/api/books/search?q=Tolkien"
```

**Respuesta esperada:** Libros que contengan "Tolkien"

### **Prueba 7: Búsqueda en Google Books**
```bash
curl "http://localhost:3000/api/external/search?q=harry+potter"
```

**Respuesta esperada:** Resultados de Google Books API

### **Prueba 8: Obtener libro por ID**
```bash
curl http://localhost:3000/api/books/1
```

**Respuesta esperada:** Detalles del libro con ID 1

### **Prueba 9: Actualizar libro**
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"pageCount": 1200}'
```

**Respuesta esperada:** Libro actualizado con nuevas páginas

### **Prueba 10: Eliminar libro**
```bash
curl -X DELETE http://localhost:3000/api/books/[ID-DEL-LIBRO]
```

**Respuesta esperada:** Confirmación de libro eliminado

---

## 🧪 Pruebas Avanzadas con POSTman

### **Paso 1: Importar la colección**
1. Abrir POSTman
2. Hacer clic en "Import"
3. Seleccionar el archivo `postman_collection.json` del proyecto
4. La colección se importará con todas las pruebas

### **Paso 2: Configurar el entorno**
1. En POSTman, ir a "Environments"
2. Crear nuevo entorno llamado "Local"
3. Agregar variable: `base_url` = `http://localhost:3000`
4. Seleccionar este entorno

### **Paso 3: Ejecutar pruebas en orden**
1. **GET** `/` - Información de la API
2. **GET** `/health` - Estado de salud
3. **GET** `/api/books` - Obtener todos los libros
4. **POST** `/api/books` - Crear libro
5. **GET** `/api/books/:id` - Obtener libro por ID
6. **PUT** `/api/books/:id` - Actualizar libro
7. **GET** `/api/books/search?q=query` - Búsqueda interna
8. **GET** `/api/external/search?q=query` - Búsqueda externa
9. **DELETE** `/api/books/:id` - Eliminar libro

---

## 📖 Endpoints Disponibles

### **🏠 Endpoints Principales**
- **GET** `/` - Información de la API
- **GET** `/health` - Estado de salud del servidor

### **📚 Gestión de Libros (CRUD)**
- **GET** `/api/books` - Obtener todos los libros
- **GET** `/api/books/:id` - Obtener libro por ID
- **POST** `/api/books` - Crear nuevo libro
- **PUT** `/api/books/:id` - Actualizar libro existente
- **DELETE** `/api/books/:id` - Eliminar libro
- **GET** `/api/books/search?q=query` - Buscar libros internamente

### **🌐 Búsquedas Externas (Google Books)**
- **GET** `/api/external/search?q=query` - Buscar libros en Google Books

---

## 🔧 Comandos Útiles

### **Desarrollo**
```bash
npm run dev          # Ejecutar en modo desarrollo con hot reload
npm run build        # Compilar TypeScript a JavaScript
npm run build:watch  # Compilar en modo watch
npm start            # Ejecutar versión compilada
npm run clean        # Limpiar archivos compilados
```

### **Instalación**
```bash
npm install          # Instalar dependencias
npm install -D       # Instalar dependencias de desarrollo
```

---

## 📁 Estructura del Proyecto

```
src/
├── models/          # Interfaces y tipos TypeScript
├── controllers/     # Lógica de negocio
├── routes/          # Definición de rutas
├── services/        # Servicios externos (Google Books)
└── app.ts          # Punto de entrada de la aplicación
```

---

## 🌐 Variables de Entorno (Opcional)

**Nota:** La aplicación funcionará sin archivo `.env` ya que tiene valores por defecto.

Si quieres personalizar:
```bash
cp env.example .env
```

Editar `.env`:
```env
PORT=3000
NODE_ENV=development
GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1/volumes
```

---

## 🚨 Solución de Problemas Comunes

### **Error: "nodemon: command not found"**
```bash
npm install
```

### **Error: "Cannot find module"**
```bash
npm run clean
npm install
```

### **La aplicación no responde en el puerto 3000**
```bash
# Verificar que no haya otro proceso usando el puerto
lsof -i :3000
# O cambiar el puerto en .env
PORT=3001
```

### **Problemas con TypeScript**
```bash
npm run build
```

---

## 📊 Estado de la API

### **✅ Endpoints Funcionando**
- **GET** `/` - Información de la API
- **GET** `/health` - Estado de salud
- **GET** `/api/books` - Obtener todos los libros
- **POST** `/api/books` - Crear libro
- **GET** `/api/books/:id` - Obtener libro por ID
- **PUT** `/api/books/:id` - Actualizar libro
- **DELETE** `/api/books/:id` - Eliminar libro
- **GET** `/api/books/search?q=query` - Búsqueda interna
- **GET** `/api/external/search?q=query` - Búsqueda en Google Books

### **✅ Datos de Prueba Incluidos**
- 2 libros pre-cargados para pruebas
- Validaciones funcionando
- Búsquedas funcionando
- Integración externa funcionando

---

## 📝 Notas Importantes

- **No se requiere API Key** para Google Books (funciona sin autenticación)
- **La base de datos es en memoria**, los datos se pierden al reiniciar
- **El servidor se reinicia automáticamente** en modo desarrollo
- **Todas las rutas están documentadas** en la colección de POSTman
- **El proyecto incluye `.gitignore`** configurado correctamente

---




