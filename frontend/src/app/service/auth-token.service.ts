import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CustomHttpResponse } from '../interface/customhttpresponse';
import { Profile } from '../interface/appstates';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<CustomHttpResponse<Profile> | null>(null);

  constructor(private userService: UserService) {}

  refreshToken(request: any, next: any): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.userService.refreshToken$().pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response);
          return next(this.addAuthorizationTokenHeader(request, response.data!.access_token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap((response) => {
          return next(this.addAuthorizationTokenHeader(request, response!.data!.access_token));
        })
      );
    }
  }

  private addAuthorizationTokenHeader(request: any, token: string): any {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}
