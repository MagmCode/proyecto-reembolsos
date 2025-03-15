import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AseguradoraService {
  private apiUrl = 'http://localhost:8000/api/aseguradoras/'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  getAseguradoras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}