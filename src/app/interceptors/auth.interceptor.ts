import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../service/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const authService = inject(Auth);
  const router = inject(Router);
  const token = authService.getToken();

  let request = req;

  // --- PARTE 1: AGREGAR EL TOKEN ---
  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // --- PARTE 2: MANEJO DE ERRORES ---
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo redirigir al login si NO es una petición a /auth/login (para evitar loops)
      // y si el error es 401 (no 403, porque 403 puede ser "no tienes permisos para este recurso")
      const isLoginRequest = req.url.includes('/auth/login');
      
      if (error.status === 401 && !isLoginRequest) {
        console.warn('[AuthInterceptor] Token inválido/expirado (401). Redirigiendo al login...');
        authService.logout();
        router.navigate(['/login']);
      } else if (error.status === 403 && !isLoginRequest) {
        // 403 puede ser "no autorizado para este recurso" - no redirigimos al login
        // solo mostramos warning
        console.warn('[AuthInterceptor] Acceso denegado (403) a:', req.url);
      }
      
      return throwError(() => error);
    })
  );
};
