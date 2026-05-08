import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PropiedadVenta, PropiedadAlquiler, InmuebleVentaDto, TarjetaVenta, TarjetaAlquiler } from '../interfaces/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  private http = inject(HttpClient);
  // Asumiendo que esta es tu URL base para inmuebles (ajústala según tu backend)
  private readonly baseUrl = 'http://localhost:8080/tupisoya/inmuebles';

  getVentas(): Observable<TarjetaVenta[]> {
    return this.http.get<TarjetaVenta[]>(`${this.baseUrl}/ventas`);
  }

  getAlquileres(): Observable<TarjetaAlquiler[]> {
    return this.http.get<TarjetaAlquiler[]>(`${this.baseUrl}/alquiler`);
  }

  getVentaById(id: number): Observable<PropiedadVenta> {
    return this.http.get<PropiedadVenta>(`${this.baseUrl}/ventas/${id}`);
  }

  getAlquilerById(id: number): Observable<PropiedadAlquiler> {
    return this.http.get<PropiedadAlquiler>(`${this.baseUrl}/alquiler/${id}`);
  }

  insertVenta(venta: PropiedadVenta): Observable<PropiedadVenta> {
    const payload = { ...venta, type: 'venta' };
    return this.http.post<PropiedadVenta>(`${this.baseUrl}/ventas`, payload);
  }

  crearVenta(venta: InmuebleVentaDto): Observable<any> {
    const payload = { ...venta, type: 'venta' };
    return this.http.post<any>(`${this.baseUrl}/venta`, payload);
  }

  updateVenta(id: number, venta: PropiedadVenta): Observable<PropiedadVenta> {
    const payload = { ...venta, type: 'venta' };
    return this.http.put<PropiedadVenta>(`${this.baseUrl}/ventas/${id}`, payload);
  }

  insertAlquiler(alquiler: PropiedadAlquiler): Observable<PropiedadAlquiler> {
    const payload = { ...alquiler, type: 'alquiler' };
    return this.http.post<PropiedadAlquiler>(`${this.baseUrl}/alquiler`, payload);
  }

  updateAlquiler(id: number, alquiler: PropiedadAlquiler): Observable<PropiedadAlquiler> {
    const payload = { ...alquiler, type: 'alquiler' };
    return this.http.put<PropiedadAlquiler>(`${this.baseUrl}/alquiler/${id}`, payload);
  }
}
