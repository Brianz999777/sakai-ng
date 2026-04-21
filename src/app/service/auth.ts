import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../interfaces/user-dto';



@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly baseUrl = 'http://localhost:8080/tupisoya/auth';

  private readonly tokenKey = 'authToken';
  private readonly userKey = 'authUser';

  constructor(private http: HttpClient) {}

  login(loginRequest: any) {
    const response = this.http.post<any>(`${this.baseUrl}/login`, loginRequest);
    response.subscribe((response) => {
      this.setToken(response.token);
      this.setUser(response.usuario_dto);
    });
    return response;
  }

  register(registerRequest: any) {
    
    const response = this.http.post<any>(`${this.baseUrl}/register`, registerRequest);
    response.subscribe((response) => {
      this.setToken(response.token);
      this.setUser(response.usuario_dto);
    });
    return response;

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
