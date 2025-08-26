import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} from '../controllers/bookController';

const router = Router();

// GET /api/books - Obtener todos los libros
router.get('/', getAllBooks);

// GET /api/books/search?q=query - Buscar libros
router.get('/search', searchBooks);

// GET /api/books/:id - Obtener un libro por ID
router.get('/:id', getBookById);

// POST /api/books - Crear un nuevo libro
router.post('/', createBook);

// PUT /api/books/:id - Actualizar un libro
router.put('/:id', updateBook);

// DELETE /api/books/:id - Eliminar un libro
router.delete('/:id', deleteBook);

export default router;
