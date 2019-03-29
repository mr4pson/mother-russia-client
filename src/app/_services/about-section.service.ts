import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';

@Injectable({
  providedIn: 'root'
})
export class AboutSectionService {
  private baseURI = 'http://api-mr.cubaproducts.ru.swtest.ru';
  getSection(url: string) {
    return this.http.get<Data>(this.baseURI+'/aboutSectionsByUrl/'+url);
  }

  getSections() {
    return this.http.get<Data>(this.baseURI+'/aboutSections');
  }
  constructor(
    private http: HttpClient
  ) { }
}
