# 🚀 Instalación Rápida - API de Gestión de Libros

## ⚡ Instalación en 3 Pasos

### 1. **Instalar Dependencias**
```bash
npm install
```

### 2. **Configurar Variables de Entorno**
```bash
cp env.example .env
```

### 3. **Ejecutar la Aplicación**

#### **Opción A: Desarrollo (Recomendado para pruebas)**
```bash
npm run dev
```

#### **Opción B: Producción**
```bash
npm run build
npm start
```

## 🌐 Acceso a la API

Una vez ejecutada, la API estará disponible en:
- **URL Base**: `http://localhost:3000`
- **Documentación**: `http://localhost:3000/`
- **Estado de Salud**: `http://localhost:3000/health`

## 🧪 Probar con POSTman

1. **Importar** `postman_collection.json` en POSTman
2. **Configurar** variable `{{base_url}}` = `http://localhost:3000`
3. **Ejecutar** las pruebas en orden

## 📚 Endpoints Principales

- **GET** `/` - Información de la API
- **GET** `/health` - Estado de salud
- **GET** `/api/books` - Obtener todos los libros
- **POST** `/api/books` - Crear nuevo libro
- **GET** `/api/external/search?q=query` - Buscar en Google Books

## ⚠️ Solución de Problemas

### **Error de path-to-regexp**
Si encuentras este error, es porque tienes Express 5.x. La solución es:
```bash
npm uninstall express @types/express
npm install express@^4.18.0 @types/express@^4.17.0
npm run build
npm start
```