import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  getSingers() {
    return this.http.get<Data>(globals.baseURI+'/singers');
  }
  getGenres() {
    return this.http.get<Data>(globals.baseURI+'/singerGenres');
  }
  getGenre(id: number) {
    return this.http.get<Data>(globals.baseURI+'/singerGenres/'+id);
  }
  getSinger(url: string) {
    return this.http.get<Data>(globals.baseURI+'/singers/'+url);
  }
  constructor(
    private http: HttpClient
  ) {}
}
