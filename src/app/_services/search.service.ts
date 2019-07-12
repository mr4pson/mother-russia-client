import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  search(phrase) {
    return this.http.get<Data>(globals.baseURI+'/search/'+phrase);
  }
  constructor(
    private http: HttpClient
  ) {
  }
}
