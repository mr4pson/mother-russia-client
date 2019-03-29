import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Data } from '../_models/data';

@Injectable({
  providedIn: 'root'
})
export class LanguageSectionService {
  private baseURI = 'http://api-mr.cubaproducts.ru.swtest.ru';
  getCategory(url: string) {
    return this.http.get<Data>(this.baseURI+'/languageCategoriesByUrl/'+url);
  }
  getSections() {
    return this.http.get<Data>(this.baseURI+'/languageSectionsFull');
  }
  getSubCategory(url: string) {
    return this.http.get<Data>(this.baseURI+'/languageSubCategoriesByUrl/'+url);
  }
  private extractData(res: Response) {
    return res || {};
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
  constructor(
    private http: HttpClient
  ) {}
}
