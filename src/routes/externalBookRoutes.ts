import { Router } from 'express';
import {
  searchExternalBooks,
  searchExternalBooksByAuthor,
  searchExternalBooksBySubject,
  getExternalBookById
} from '../controllers/externalBookController';

const router = Router();

// GET /api/external/search?q=query - Buscar libros en Google Books
router.get('/search', searchExternalBooks);

// GET /api/external/author?author=name - Buscar libros por autor en Google Books
router.get('/author', searchExternalBooksByAuthor);

// GET /api/external/subject?subject=genre - Buscar libros por género en Google Books
router.get('/subject', searchExternalBooksBySubject);

// GET /api/external/book/:id - Obtener libro específico de Google Books
router.get('/book/:id', getExternalBookById);

export default router;
