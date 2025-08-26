import axios from 'axios';
import { GoogleBookResponse } from '../models/Book';

class GoogleBooksService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.GOOGLE_BOOKS_API_URL || 'https://www.googleapis.com/books/v1/volumes';
  }

  /**
   * Busca libros en Google Books por título
   * @param query - Término de búsqueda
   * @param maxResults - Número máximo de resultados (por defecto 10)
   * @returns Promise con los resultados de la búsqueda
   */
  async searchBooks(query: string, maxResults: number = 10): Promise<GoogleBookResponse> {
    try {
      if (!query || query.trim().length === 0) {
        throw new Error('El término de búsqueda es requerido');
      }

      const response = await axios.get(this.baseUrl, {
        params: {
          q: query,
          maxResults: Math.min(maxResults, 40), // Google Books permite máximo 40
          key: process.env.GOOGLE_BOOKS_API_KEY // Opcional, para mayor cuota
        },
        timeout: 10000 // 10 segundos de timeout
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Error de respuesta del servidor
          throw new Error(`Error de Google Books API: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          // Error de red
          throw new Error('Error de conexión con Google Books API');
        } else {
          // Error en la configuración
          throw new Error(`Error en la solicitud: ${error.message}`);
        }
      } else {
        // Error genérico
        throw new Error(`Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  }

  /**
   * Obtiene información detallada de un libro por ID
   * @param bookId - ID del libro en Google Books
   * @returns Promise con la información del libro
   */
  async getBookById(bookId: string): Promise<any> {
    try {
      if (!bookId || bookId.trim().length === 0) {
        throw new Error('El ID del libro es requerido');
      }

      const response = await axios.get(`${this.baseUrl}/${bookId}`, {
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Libro no encontrado en Google Books');
        } else if (error.response) {
          throw new Error(`Error de Google Books API: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Error de conexión con Google Books API');
        } else {
          throw new Error(`Error en la solicitud: ${error.message}`);
        }
      } else {
        throw new Error(`Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  }

  /**
   * Busca libros por autor
   * @param author - Nombre del autor
   * @param maxResults - Número máximo de resultados
   * @returns Promise con los resultados de la búsqueda
   */
  async searchBooksByAuthor(author: string, maxResults: number = 10): Promise<GoogleBookResponse> {
    return this.searchBooks(`inauthor:"${author}"`, maxResults);
  }

  /**
   * Busca libros por género/categoría
   * @param subject - Género o categoría
   * @param maxResults - Número máximo de resultados
   * @returns Promise con los resultados de la búsqueda
   */
  async searchBooksBySubject(subject: string, maxResults: number = 10): Promise<GoogleBookResponse> {
    return this.searchBooks(`subject:"${subject}"`, maxResults);
  }
}

export default new GoogleBooksService();
