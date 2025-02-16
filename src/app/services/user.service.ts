import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://moontech-back.onrender.com/api/users'; // URL del backend
//private apiUrl = 'https://moontech-back.onrender.com/api/users'; // URL del backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, this.getHeaders());
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, this.getHeaders());
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
