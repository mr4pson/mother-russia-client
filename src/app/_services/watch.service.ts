import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globals } from './../globals';
import { Data } from '../_models/data';

@Injectable({
  providedIn: 'root'
})

export class WatchService {
  getGenre(id: number) {
    return this.http.get<Data>(globals.baseURI+'/watchGenres/'+id);
  }
  getGenres() {
    return this.http.get<Data>(globals.baseURI+'/watchGenres');
  }

  getSubtitleLanguages() {
    return this.http.get<Data>(globals.baseURI+'/subtitleLanguages');
  }

  getWatches() {
    return this.http.get<Data>(globals.baseURI+'/watches');
  }
  getWatch(url: string) {
    return this.http.get<Data>(globals.baseURI+'/watches/'+url);
  }
  constructor(
    private http: HttpClient
  ) {}
}
