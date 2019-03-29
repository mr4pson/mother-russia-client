import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Data } from '../_models/data';

@Injectable({
  providedIn: 'root'
})
export class RussianLanguageService {
  private baseURI = 'http://api-mr.cubaproducts.ru.swtest.ru';
  getComponent() {
    return this.http.get<Data>(this.baseURI+'/russianLanguage');
  }
  updateComponent(formData: FormData) {
    return this.http
      .post(this.baseURI+'/russianLanguage', formData, {})
  }
  constructor(
    private http: HttpClient
  ) { }
}
