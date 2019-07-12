import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class ConjugatedVerbService {
  getConjugatedVerbs() {
    return this.http.get<Data>(globals.baseURI+'/conjugatedItems');
  }
  getConjugatedVerb(url: string) {
    return this.http.get<Data>(globals.baseURI+'/getConjugatedItemByUrl/'+url);
  }

  constructor(
    private http: HttpClient
  ) {}
}
