import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private inactivityTimer: any;
  private readonly inactivityDuration = 5 * 60 * 1000; // 5 minutes

  // URL de conexion
  // private apiUrl = "http://180.183.66.248:8000/api/"; // URL de tu API en Django local
  private apiUrl = 'https://reembolso-backend.onrender.com/api/';  // URL de tu API en Django Produccion

  constructor(
    private http: HttpClient,
    private router: Router,
    private _ngZone: NgZone
  ) {
    this.resetInactivityTimer();
    this.setupActivityListeners();
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}login/`, { username, password }).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        // Almacenar el token y el rol del usuario
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("is_admin", response.is_admin);
        localStorage.setItem("username", response.username);
        localStorage.setItem("first_name", response.first_name);
        localStorage.setItem("last_name", response.last_name);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Ocurrió un error. Intentálo de nuevo más tarde.";
    if (error.status === 404) {
      errorMessage = "Usuario no encontrado";
    } else if (error.status === 401) {
      errorMessage = "Contraseña inválida";
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.removeItem("access_token");
    this.router.navigate(["/Login"]);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("access_token");
  }

  getUserRole(): boolean {
    return localStorage.getItem("is_admin") === "true"; // Convertir a booleano
  }

  getUsername(): string {
    return localStorage.getItem("username") || "Usuario"; // Valor por defecto
  }

  getFullName(): string {
    const firstName = localStorage.getItem('first_name') || '';
    const lastName = localStorage.getItem('last_name') || '';
    return `${firstName} ${lastName}`.trim(); // Devuelve el nombre completo
  }
  getName(): string {
    const firstName = localStorage.getItem('first_name') || '';
    return `${firstName}`; // Devuelve el nombre completo
  }
  private resetInactivityTimer() {
    this._ngZone.runOutsideAngular(() => {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        this._ngZone.run(() => {
          this.logout();
        });
      }, this.inactivityDuration);
    });
  }

  private setupActivityListeners() {
    window.addEventListener("mousemove", () => this.resetInactivityTimer());
    window.addEventListener("keypress", () => this.resetInactivityTimer());
    window.addEventListener("scroll", () => this.resetInactivityTimer());
    window.addEventListener("click", () => this.resetInactivityTimer());
  }
}
