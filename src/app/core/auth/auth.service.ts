import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Reembolso } from 'src/app//models/reembolso.model';


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
        // Almacenar el token y los datos del usuario
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("is_admin", response.is_admin);
        localStorage.setItem("username", response.username);
        localStorage.setItem("first_name", response.first_name);
        localStorage.setItem("last_name", response.last_name);
        localStorage.setItem("tipoCedula", response.tipo_cedula); // Almacenar el tipo de cédula
        localStorage.setItem("telefono", response.telefono); // Almacenar el teléfono
        localStorage.setItem("aseguradora", response.aseguradora); // Almacenar la aseguradora
        localStorage.setItem("nroPoliza", response.nroPoliza); // Almacenar el número de póliza
  
        this.currentUserSubject.next(response); // Actualizar el currentUser
      })
    );
  }
  
  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9); // Genera un ID único
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

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData).pipe(
      catchError(this.handleError) 
    );
  }

  logout() {
    // Elimina todos los datos del usuario
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("username");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("session_id"); // Limpiar el identificador de sesión
  
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

   // Método para obtener el teléfono del usuario
   getTelefono(): string {
    return localStorage.getItem("telefono") || "No disponible";
  }

  // Método para obtener la aseguradora del usuario
  getAseguradora(): string {
    return localStorage.getItem("aseguradora") || "No disponible";
  }

  // Método para obtener el número de póliza del usuario
  getNroPoliza(): string {
    return localStorage.getItem("nroPoliza") || "No disponible";
  }

  // Método para obtener el tipo de cédula del usuario
  getTipoCedula(): string {
    return localStorage.getItem("tipoCedula") || "V"; // Valor por defecto: 'V' (Venezolano)
  }

  // Método para obtener los datos del perfil del usuario
getUserProfile(): Observable<any> {
  const token = this.getToken();
  return this.http.get(`${this.apiUrl}user-profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  }).pipe(
    catchError(this.handleError)
  );
}

updateUserData(updatedData: any): void {
  this.currentUserSubject.next(updatedData); // Actualizar el BehaviorSubject
}

// Método para actualizar los datos del perfil del usuario
updateUserProfile(userData: any): Observable<any> {
  const token = this.getToken();
  return this.http.put(`${this.apiUrl}user-profile/`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  }).pipe(
    catchError(this.handleError)
  );
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









  // Método para obtener los reembolsos del usuario actual
  getReembolsos(): Observable<Reembolso[]> {
    const token = this.getToken();
    return this.http.get<Reembolso[]>(`${this.apiUrl}reembolsos/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Método para agregar un nuevo reembolso
  addReembolso(reembolso: FormData): Observable<Reembolso> {
    const token = this.getToken(); // Obtén el token del localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });
  
    return this.http.post<Reembolso>(`${this.apiUrl}reembolsos/`, reembolso, { headers });
  }
  

  // Método para subir archivos (comprobantes de factura)
  uploadFiles(files: FormData): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.apiUrl}upload-files/`, files, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }


 
  }
