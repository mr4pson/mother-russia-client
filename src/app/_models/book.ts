import { Author } from './bookAuthor';
export class Book {
    id: number;
    name: string;
    nameRus: string;
    preview: string;
    detail: string;
    year: number;
    desc: string;
    amazonEng: string;
    amazonRus: string;
    author: Author;
}