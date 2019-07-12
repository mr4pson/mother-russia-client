import { Book } from './book';
export class Author {
    id: number;
    url: string;
    name: string;
    nameRus: string;
    categoryId: number;
    books: Book[];
}