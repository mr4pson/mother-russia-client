import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';
import { globals } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  getArticle(url: string) {
    return this.http.get<Data>(globals.baseURI+'/articles/'+url);
  }
  getArticles() {
    return this.http.get<Data>(globals.baseURI+'/articles');
  }
  getArticlesBySection(section) {
    return this.http.get<Data>(globals.baseURI+'/articlesBySection/'+section);
  }
  getMostViewedArticles() {
    return this.http.get<Data>(globals.baseURI+'/mostViewedArticles');
  }
  getLastArticleBySection(section) {
    return this.http.get<Data>(globals.baseURI+'/lastArticleBySection/'+section);
  }
  constructor(
    private http: HttpClient
  ) {}
}
