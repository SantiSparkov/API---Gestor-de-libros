export interface Book {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  isbn?: string;
  genre?: string;
  description?: string;
  pageCount?: number;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  publicationYear: number;
  isbn?: string;
  genre?: string;
  description?: string;
  pageCount?: number;
  language?: string;
}

export interface UpdateBookRequest extends Partial<CreateBookRequest> {}

export interface GoogleBookResponse {
  items?: Array<{
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      description?: string;
      pageCount?: number;
      language?: string;
      categories?: string[];
      imageLinks?: {
        thumbnail?: string;
      };
    };
  }>;
}
