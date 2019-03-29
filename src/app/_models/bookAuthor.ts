import { Book } from './book';
export class Author {
    id: number;
    name: string;
    nameRus: string;
    categoryId: number;
    books: Book[];
}