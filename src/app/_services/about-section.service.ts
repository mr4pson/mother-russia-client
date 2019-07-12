import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class AboutSectionService {
  getSection(url: string) {
    return this.http.get<Data>(globals.baseURI+'/aboutSectionsByUrl/'+url);
  }

  getSections() {
    return this.http.get<Data>(globals.baseURI+'/aboutSections');
  }
  constructor(
    private http: HttpClient
  ) { }
}
