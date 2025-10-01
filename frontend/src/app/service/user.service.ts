import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomHttpResponse} from "../interface/customhttpresponse";
import {Profile} from "../interface/appstates";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private server: string='http://localhost:8080';

  constructor(private http:HttpClient) { }

  login$=(email:string,password:string)=> <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
    (`${this.server}/user/login`,{email, password})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  verifyCode$=(email:string,code:string)=> <Observable<CustomHttpResponse<Profile>>>
    this.http.get<CustomHttpResponse<Profile>>
    (`${this.server}/user/verify/code${email}/${code}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  prfile$=() => <Observable<CustomHttpResponse<Profile>>>
      this.http.get<CustomHttpResponse<Profile>>
      (`${this.server}/user/profile`)

 private handleError(error:HttpErrorResponse):Observable<never>{
   console.log(error)
    let errorMessage:string;
    if (error.error instanceof ErrorEvent){
      errorMessage: `A client error occured ${error.error.message}`;
    }else {
      if (error.error.reason){
        errorMessage=error.error.reason;
        console.log(errorMessage)
      }else {
        errorMessage=`An error occured Error status ${error.status}`
      }
    }
    return throwError(()=>errorMessage);
  }

}
