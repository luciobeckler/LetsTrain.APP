import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://localhost:7288/api';

  createUser(formData: any) {
    return this.http.post(this.baseUrl + '/register', formData);
  }
}
