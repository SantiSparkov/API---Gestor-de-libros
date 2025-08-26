import { Request, Response } from 'express';
import { Book, CreateBookRequest, UpdateBookRequest } from '../models/Book';
import { v4 as uuidv4 } from 'uuid';

// Almacenamiento en memoria (simulando una base de datos)
let books: Book[] = [
  {
    id: '1',
    title: 'El Señor de los Anillos',
    author: 'J.R.R. Tolkien',
    publicationYear: 1954,
    genre: 'Fantasía',
    description: 'Una épica historia de fantasía sobre la búsqueda de un anillo mágico',
    pageCount: 1216,
    language: 'Español',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    publicationYear: 1949,
    genre: 'Ciencia Ficción',
    description: 'Una distopía sobre una sociedad totalitaria',
    pageCount: 328,
    language: 'Español',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Obtener todos los libros
export const getAllBooks = (req: Request, res: Response): void => {
  try {
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los libros',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Obtener un libro por ID
export const getBookById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const book = books.find(b => b.id === id);
    
    if (!book) {
      res.status(404).json({
        success: false,
        error: 'Libro no encontrado',
        message: `No se encontró un libro con el ID: ${id}`
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el libro',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Crear un nuevo libro
export const createBook = (req: Request, res: Response): void => {
  try {
    const bookData: CreateBookRequest = req.body;
    
    // Validaciones básicas
    if (!bookData.title || !bookData.author || !bookData.publicationYear) {
      res.status(400).json({
        success: false,
        error: 'Datos incompletos',
        message: 'El título, autor y año de publicación son obligatorios'
      });
      return;
    }
    
    if (bookData.publicationYear < 1000 || bookData.publicationYear > new Date().getFullYear()) {
      res.status(400).json({
        success: false,
        error: 'Año inválido',
        message: 'El año de publicación debe ser válido'
      });
      return;
    }
    
    const newBook: Book = {
      id: uuidv4(),
      ...bookData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    books.push(newBook);
    
    res.status(201).json({
      success: true,
      message: 'Libro creado exitosamente',
      data: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al crear el libro',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Actualizar un libro
export const updateBook = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updateData: UpdateBookRequest = req.body;
    
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
      res.status(404).json({
        success: false,
        error: 'Libro no encontrado',
        message: `No se encontró un libro con el ID: ${id}`
      });
      return;
    }
    
    // Validar año si se proporciona
    if (updateData.publicationYear && 
        (updateData.publicationYear < 1000 || updateData.publicationYear > new Date().getFullYear())) {
      res.status(400).json({
        success: false,
        error: 'Año inválido',
        message: 'El año de publicación debe ser válido'
      });
      return;
    }
    
    const updatedBook: Book = {
      ...books[bookIndex],
      ...updateData,
      updatedAt: new Date()
    };
    
    books[bookIndex] = updatedBook;
    
    res.status(200).json({
      success: true,
      message: 'Libro actualizado exitosamente',
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el libro',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Eliminar un libro
export const deleteBook = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
      res.status(404).json({
        success: false,
        error: 'Libro no encontrado',
        message: `No se encontró un libro con el ID: ${id}`
      });
      return;
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'Libro eliminado exitosamente',
      data: deletedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el libro',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Buscar libros por título o autor
export const searchBooks = (req: Request, res: Response): void => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Parámetro de búsqueda requerido',
        message: 'Debe proporcionar un parámetro de búsqueda "q"'
      });
      return;
    }
    
    const searchTerm = q.toLowerCase();
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      (book.genre && book.genre.toLowerCase().includes(searchTerm))
    );
    
    res.status(200).json({
      success: true,
      count: filteredBooks.length,
      query: q,
      data: filteredBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error en la búsqueda',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
