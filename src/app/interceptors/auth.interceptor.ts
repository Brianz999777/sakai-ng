import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const authService = inject(Auth);
  const router = inject(Router); // Inyectamos el router para redirigir
  const token = authService.getToken();

  let request = req;

  // --- PARTE 1: AGREGAR EL TOKEN (LO QUE YA TENÍAS) ---
  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // --- PARTE 2: ESCUCHAR LA RESPUESTA (LA SOLUCIÓN AL ERROR) ---
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el servidor responde 401 (Unauthorized) o 403 (Forbidden)
      // significa que el token expiró o ya no es válido.
      if (error.status === 401 || error.status === 403) {
        console.warn('El token ya no es válido. Redirigiendo al login...');
        
        authService.logout(); // Método que limpie el localStorage/Session
        router.navigate(['/login']); // Mandar al usuario al login
      }
      
      return throwError(() => error);
    })
  );
};