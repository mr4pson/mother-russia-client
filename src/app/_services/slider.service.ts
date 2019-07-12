import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  getSliders() {
    return this.http.get<Data>(globals.baseURI+'/sliders');
  }
  constructor(
    private http: HttpClient
  ) { }
}
