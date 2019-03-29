import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Data } from '../_models/data';
// Observable class extensions

// Observable operators

const headers = new HttpHeaders(
  {
    "Content-Type": "multipart/form-data"
  }
);

@Injectable({
  providedIn: 'root'
})

export class WatchService {
  private baseURI = 'http://api-mr.cubaproducts.ru.swtest.ru';
  getGenre(id: number) {
    return this.http.get<Data>(this.baseURI+'/watchGenres/'+id);
  }
  getGenres() {
    return this.http.get<Data>(this.baseURI+'/watchGenres');
  }

  getSubtitleLanguages() {
    return this.http.get<Data>(this.baseURI+'/subtitleLanguages');
  }

  getWatches() {
    return this.http.get<Data>(this.baseURI+'/watches');
  }
  getWatch(id: number) {
    return this.http.get<Data>(this.baseURI+'/watches/'+id);
  }
  
  /*updateData(url: string, param: FormData,) {
    //let body = JSON.stringify(param);
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
