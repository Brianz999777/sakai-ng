import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../interfaces/user-dto';
import { tap } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly baseUrl = 'http://localhost:8080/tupisoya/auth';

  private readonly tokenKey = 'authToken';
  private readonly userKey = 'authUser';

  constructor(private http: HttpClient) {}

  register(registerRequest: any) {
    console.log("registerRequest AUTH", registerRequest);
    
    // Retornamos el observable SIN suscribirnos aquí
    return this.http.post<any>(`${this.baseUrl}/register`, registerRequest).pipe(
      tap((response) => {
        // Esto se ejecuta automáticamente cuando el componente se suscriba
        this.setToken(response.token);
        this.setUser(response.usuarioDTO); // Ojo: verifica si es usuario_dto o usuarioDTO
      })
    );
  }

  // Haz lo mismo con el login para evitar errores futuros
  login(loginRequest: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, loginRequest).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setUser(response.usuarioDTO);
      })
    );
  }


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setUser(user: UserDTO): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    
  }

  getUser(): UserDTO | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }
}
