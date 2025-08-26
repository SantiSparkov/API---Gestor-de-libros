import { Request, Response } from 'express';
import googleBooksService from '../services/googleBooksService';

// Buscar libros en Google Books
export const searchExternalBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, maxResults = '10' } = req.query;
    
    if (!q || typeof q !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Parámetro de búsqueda requerido',
        message: 'Debe proporcionar un parámetro de búsqueda "q"'
      });
      return;
    }
    
    const maxResultsNum = parseInt(maxResults as string, 10);
    if (isNaN(maxResultsNum) || maxResultsNum < 1 || maxResultsNum > 40) {
      res.status(400).json({
        success: false,
        error: 'Parámetro maxResults inválido',
        message: 'maxResults debe ser un número entre 1 y 40'
      });
      return;
    }
    
    const results = await googleBooksService.searchBooks(q, maxResultsNum);
    
    res.status(200).json({
      success: true,
      query: q,
      maxResults: maxResultsNum,
      totalResults: results.items?.length || 0,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error en la búsqueda externa',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Buscar libros por autor en Google Books
export const searchExternalBooksByAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { author, maxResults = '10' } = req.query;
    
    if (!author || typeof author !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Parámetro de autor requerido',
        message: 'Debe proporcionar un parámetro "author"'
      });
      return;
    }
    
    const maxResultsNum = parseInt(maxResults as string, 10);
    if (isNaN(maxResultsNum) || maxResultsNum < 1 || maxResultsNum > 40) {
      res.status(400).json({
        success: false,
        error: 'Parámetro maxResults inválido',
        message: 'maxResults debe ser un número entre 1 y 40'
      });
      return;
    }
    
    const results = await googleBooksService.searchBooksByAuthor(author, maxResultsNum);
    
    res.status(200).json({
      success: true,
      author: author,
      maxResults: maxResultsNum,
      totalResults: results.items?.length || 0,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error en la búsqueda por autor',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Buscar libros por género en Google Books
export const searchExternalBooksBySubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, maxResults = '10' } = req.query;
    
    if (!subject || typeof subject !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Parámetro de género requerido',
        message: 'Debe proporcionar un parámetro "subject"'
      });
      return;
    }
    
    const maxResultsNum = parseInt(maxResults as string, 10);
    if (isNaN(maxResultsNum) || maxResultsNum < 1 || maxResultsNum > 40) {
      res.status(400).json({
        success: false,
        error: 'Parámetro maxResults inválido',
        message: 'maxResults debe ser un número entre 1 y 40'
      });
      return;
    }
    
    const results = await googleBooksService.searchBooksBySubject(subject, maxResultsNum);
    
    res.status(200).json({
      success: true,
      subject: subject,
      maxResults: maxResultsNum,
      totalResults: results.items?.length || 0,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error en la búsqueda por género',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Obtener información detallada de un libro de Google Books
export const getExternalBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string') {
      res.status(400).json({
        success: false,
        error: 'ID del libro requerido',
        message: 'Debe proporcionar un ID válido'
      });
      return;
    }
    
    const book = await googleBooksService.getBookById(id);
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('no encontrado')) {
      res.status(404).json({
        success: false,
        error: 'Libro no encontrado',
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Error al obtener el libro',
        message: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
};
