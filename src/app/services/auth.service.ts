import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // ✅ Importa Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://moontech-back.onrender.com/api/auth'; // URL del backend
  //private apiUrl = 'https://moontech-back.onrender.com/api/auth'; // URL del backend

  constructor(private http: HttpClient, private router: Router) {} // ✅ Inyecta Router

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']); // ✅ Ahora sí reconoce router
      return;
    }

    this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        console.log('Logout exitoso en el backend');
      },
      error: () => {
        console.warn('No se pudo cerrar sesión en el backend, pero se eliminará el token localmente');
      },
      complete: () => {
        localStorage.removeItem('token'); // ✅ Eliminar el token local
        this.router.navigate(['/login']); // ✅ Redirigir al login
      }
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
