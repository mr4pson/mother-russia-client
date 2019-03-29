import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    config = {apiUrl: 'http://api-mr.cubaproducts.ru.swtest.ru'}
    getAll() {
        return this.http.get<User[]>(`${this.config.apiUrl}/users`);
    }
}