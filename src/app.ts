import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import externalBookRoutes from './routes/externalBookRoutes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/books', bookRoutes);
app.use('/api/external', externalBookRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API de Gestión de Libros',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      external: '/api/external',
      health: '/health'
    }
  });
});

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware de manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo salió mal!',
    message: err.message
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 API de Gestión de Libros activa`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
