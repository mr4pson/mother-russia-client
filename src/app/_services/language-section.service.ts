import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class LanguageSectionService {
  getCategory(url: string) {
    return this.http.get<Data>(globals.baseURI+'/languageCategoriesByUrl/'+url);
  }
  getSections() {
    return this.http.get<Data>(globals.baseURI+'/languageSectionsFull');
  }
  getSubCategory(url: string) {
    return this.http.get<Data>(globals.baseURI+'/languageSubCategoriesByUrl/'+url);
  }
  constructor(
    private http: HttpClient
  ) {}
}
