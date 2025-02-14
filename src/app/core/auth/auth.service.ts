import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://180.183.66.248:8000/api/';  // URL de tu API en Django local
  private apiUrl = 'https://reembolso-backend.onrender.com/api/';  // URL de tu API en Django Produccion

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}login/`, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'Ocurrió un error. Intentálo de nuevo más tarde.';
    if (error.status === 404) {
      errorMessage = 'Usuario no encontrado';
    } else if (error.status === 401) {
      errorMessage = 'Contraseña inválida';
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/Login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
