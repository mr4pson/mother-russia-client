import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  createItem(url: string) {
    return this.http.get(globals.baseURI+url);
  }
  constructor(
    private http: HttpClient
  ) { }
}
