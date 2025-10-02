import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthTokenService } from '../service/auth-token.service';
import { Key } from '../component/enum/key.enum';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const tokenService = inject(AuthTokenService);

  // Non toccare le chiamate di login, verify, ecc.
  if (
    req.url.includes('verify') ||
    req.url.includes('login') ||
    req.url.includes('register') ||
    req.url.includes('refresh') ||
    req.url.includes('resetpassword')
  ) {
    return next(req);
  }

  const token = localStorage.getItem(Key.TOKEN);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.reason?.includes('expired')) {
        return tokenService.refreshToken(req, next);
      } else {
        return throwError(() => error);
      }
    })
  );
};
