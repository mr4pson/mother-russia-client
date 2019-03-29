import {LanguageCategoryChild} from './language-category-child';
export class LanguageCategory {
    id: number;
    url: string;
    name: string;
    content: string;
    subCategories: LanguageCategoryChild[];
}