import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  getBooks() {
    return this.http.get<Data>(globals.baseURI+'/books');
  }
  getBook(id: number) {
    return this.http.get<Data>(globals.baseURI+'/books/'+id);
  }
  getAuthors() {
    return this.http.get<Data>(globals.baseURI+'/bookAuthors');
  }
  getAuthor(url: string) {
    return this.http.get<Data>(globals.baseURI+'/bookAuthors/'+url);
  }

  constructor(
    private http: HttpClient
  ) {}
}
