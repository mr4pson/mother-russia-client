import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  getPageData(url) {
    return this.http.get<Data>(globals.baseURI+url);
  }
  constructor(
    private http: HttpClient
  ) { }
}
