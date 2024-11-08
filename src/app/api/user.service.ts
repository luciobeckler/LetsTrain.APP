import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'https://localhost:7288/';

  constructor(private http: HttpClient) {}

  postAluno(endpoint: string, data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.API_URL}/${endpoint}`, data, { headers });
  }
}
