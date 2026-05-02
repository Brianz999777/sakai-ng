import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PropiedadVenta, PropiedadAlquiler } from '../interfaces/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  private http = inject(HttpClient);
  // Asumiendo que esta es tu URL base para inmuebles (ajústala según tu backend)
  private readonly baseUrl = 'http://localhost:8080/tupisoya/api/inmuebles';

  getVentas(): Observable<PropiedadVenta[]> {
    return this.http.get<PropiedadVenta[]>(`${this.baseUrl}/ventas`);
  }

  getAlquileres(): Observable<PropiedadAlquiler[]> {
    return this.http.get<PropiedadAlquiler[]>(`${this.baseUrl}/alquileres`);
  }

  getVentaById(id: number): Observable<PropiedadVenta> {
    return this.http.get<PropiedadVenta>(`${this.baseUrl}/ventas/${id}`);
  }

  getAlquilerById(id: number): Observable<PropiedadAlquiler> {
    return this.http.get<PropiedadAlquiler>(`${this.baseUrl}/alquileres/${id}`);
  }

  insertVenta(venta: PropiedadVenta): Observable<PropiedadVenta> {
    return this.http.post<PropiedadVenta>(`${this.baseUrl}/ventas`, venta);
  }

  insertAlquiler(alquiler: PropiedadAlquiler): Observable<PropiedadAlquiler> {
    return this.http.post<PropiedadAlquiler>(`${this.baseUrl}/alquileres`, alquiler);
  }
}
