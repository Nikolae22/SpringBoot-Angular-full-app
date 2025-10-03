import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse } from '../interface/customhttpresponse';
import { Profile } from '../interface/appstates';
import { User } from '../interface/user';
import { Key } from '../component/enum/key.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private server: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login$ = (email: string, password: string) =>
    <Observable<CustomHttpResponse<Profile>>>this.http
      .post<CustomHttpResponse<Profile>>(`${this.server}/user/login`, {
        email,
        password,
      })
      .pipe(tap(console.log), catchError(this.handleError));

  verifyCode$ = (email: string, code: string) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .get<CustomHttpResponse<Profile>>(
          `${this.server}/user/verify/code${email}/${code}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  prfile$ = () =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .get<CustomHttpResponse<Profile>>(`${this.server}/user/profile`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  update$ = (user: User) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .patch<CustomHttpResponse<Profile>>(`${this.server}/user/update`, user)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  refreshToken$ = () =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .get<CustomHttpResponse<Profile>>(`${this.server}/user/refresh/token`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(Key.TOKEN)}`,
          },
        })
        .pipe(tap(response=>{
          localStorage.removeItem(Key.TOKEN);
          localStorage.removeItem(Key.REFRESH_TOKEN);
          localStorage.setItem(Key.TOKEN,response.data?.access_token!);
          localStorage.setItem(Key.TOKEN,response.data?.refresh_token!);
        }), catchError(this.handleError))
    );

    updatePassword$ = (form:{currentPassword:string,newPassword:string,confirmNewPasswword:string}) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .patch<CustomHttpResponse<Profile>>(`${this.server}/user/update/password`, 
          form
        )
        .pipe(tap(console.log), 
        catchError(this.handleError))
    );

     updateRole$ = (roleName:string) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .patch<CustomHttpResponse<Profile>>(`${this.server}/user/update/tole${roleName}`, 
          {}
        )
        .pipe(tap(console.log), 
        catchError(this.handleError))
    );


     updateAccountSettings$ = (settings:{enabled:boolean,notLocked:boolean,}) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .patch<CustomHttpResponse<Profile>>(`${this.server}/user/update/settings`, 
          settings
        )
        .pipe(tap(console.log), 
        catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage: `A client error occured ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occured Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
