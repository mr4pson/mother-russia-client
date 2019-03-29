import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Data } from '../_models/data';

const headers = new HttpHeaders(
  {
    "Content-Type": "multipart/form-data"
  }
);

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private baseURI = 'http://api-mr.cubaproducts.ru.swtest.ru';

  getSongs() {
    return this.http.get<Data>(this.baseURI+'/songs');
  }
  getSong(id: number) {
    return this.http.get<Data>(this.baseURI+'/songs/'+id);
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
