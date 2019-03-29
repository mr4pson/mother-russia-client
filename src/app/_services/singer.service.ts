import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Data } from '../_models/data';

const headers = new HttpHeaders(
  {
    "Content-Type": "multipart/form-data"
  }
);

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  private baseURI = 'http://api-mr.cubaproducts.ru.swtest.ru';
  getSingers() {
    return this.http.get<Data>(this.baseURI+'/singers');
  }
  getGenres() {
    return this.http.get<Data>(this.baseURI+'/singerGenres');
  }
  getGenre(id: number) {
    return this.http.get<Data>(this.baseURI+'/singerGenres/'+id);
  }
  getSinger(id: number) {
    return this.http.get<Data>(this.baseURI+'/singers/'+id);
  }
  /*updateData(url: string, param: FormData,) {
    return this.http
        .post(this.baseURI+url, param, {})
        .map(this.extractData)
        .catch(this.handleError);
  }
  createItem(url: string, param: FormData) {
    return this.http
        .post(this.baseURI+url, param, {})
        .map(this.extractData)
        .catch(this.handleError);
  }
  deleteItem(url: string) {
    return this.http.request('DELETE', this.baseURI+url, {});
    //return this.http.delete(this.baseURI+url);
  }*/

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
