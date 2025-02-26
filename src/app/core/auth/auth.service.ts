import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private inactivityTimer: any;
  private readonly inactivityDuration = 5 * 60 * 1000; // 5 minutes
  private tokenKey = 'access_token';
  private roleKey = 'user_role';
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;

  // URL de conexión
  // private apiUrl = "http://180.183.66.248:8000/api/"; // URL de tu API en Django local
  private apiUrl = "http://127.0.0.1:8000/api/"; // URL de tu API en Django local
  // private apiUrl = 'https://reembolso-backend.onrender.com/api/';  // URL de tu API en Django Producción

  constructor(
    private http: HttpClient,
    private router: Router,
    private _ngZone: NgZone
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
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
        this.currentUserSubject.next(response); // Actualizar el currentUser
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Ocurrió un error. Inténtalo de nuevo más tarde.";
    if (error.status === 404) {
      errorMessage = "Usuario no encontrado";
    } else if (error.status === 401) {
      errorMessage = "Contraseña inválida";
    }
    return throwError(errorMessage);
  }

  // Método para guardar el token y el rol del usuario al iniciar sesión
  setSession(token: string, isAdmin: boolean): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem('is_admin', JSON.stringify(isAdmin));
  }

  logout() {
    // Elimina todos los datos del usuario
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("username");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
  
    this.currentUserSubject.next(null); // Actualizar el currentUser
  
    // Realiza una solicitud al backend para destruir la sesión en el servidor
    this.http.post<any>(`${this.apiUrl}logout/`, {}).subscribe(() => {
      this.router.navigate(["/Login"]);
    }, (error) => {
      console.error('Error during logout:', error);
    });
  }

  verifyToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    return this.http.get(`${this.apiUrl}verify-token/`, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      catchError(() => {
        this.logout(); // Si el token no es válido, cierra la sesión
        return throwError("Token inválido");
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("access_token");
  }

  isAdmin(): boolean {
    return localStorage.getItem("is_admin") === "true"; // Convertir a booleano
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
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

  getRol(): string {
    return localStorage.getItem("rol") || '';
  }

  isAnalist(): boolean {
    return this.getRol() === 'analista';
  }

  isUser(): boolean {
    return this.getRol() === 'cliente';
  }

  private resetInactivityTimer() {
    this._ngZone.runOutsideAngular(() => {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        this._ngZone.run(() => {
          if (this.isLoggedIn()) {
            this.logout();
          }
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