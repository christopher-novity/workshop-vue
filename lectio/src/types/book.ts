export type BookLength = 'quick' | 'medium' | 'long';

export type Book = {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  coverImageUrl: string;
  publishedDate: string;
  rating: number;
  pages: number;
  length: BookLength;
  readDate?: Date;
};