import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  getSongs() {
    return this.http.get<Data>(globals.baseURI+'/songs');
  }
  getSong(id: number) {
    return this.http.get<Data>(globals.baseURI+'/songs/'+id);
  }
  constructor(
    private http: HttpClient
  ) {}
}
