import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { State } from '../../interface/state';
import { DataState } from '../enum/datastate.enum';
import { CustomHttpResponse } from '../../interface/customhttpresponse';
import { Profile } from '../../interface/appstates';
import { UserService } from '../../service/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from "@angular/forms";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, RouterLink, NgIf, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>> | undefined;

  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null!);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ =this.isLoadingSubject.asObservable();

  readonly DataState = DataState;

  constructor(private userService: UserService) {}

  //TODO manca il token
  ngOnInit(): void {
    this.profileState$ = this.userService.prfile$().pipe(
      map((response) => {
        console.log(response);
        this.dataSubject.next(response);
        return { dataState: DataState.LOADED, appData: response };
      }),
      startWith({ dataState: DataState.LOADING }),
      catchError((error: string) => {
        return of({
          dataState: DataState.ERROR,
          appData: this.dataSubject.value,
          error,
        });
      })
    );
  }

   updateProfile(profileForm:NgForm): void {
    this.isLoadingSubject.next(true)
    this.profileState$ = this.userService.update$(profileForm.value)
    .pipe(
      map((response) => {
        console.log(response);
        this.dataSubject.next({...response,data:response.data});
        this.isLoadingSubject.next(false)
        return { dataState: DataState.LOADED, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADING ,appData:this.dataSubject.value}),
      catchError((error: string) => {
        this.isLoadingSubject.next(false)
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error,
        });
      })
    );
  }

  updateRole(roleForm:NgForm): void {
    this.isLoadingSubject.next(true)
    this.profileState$ = this.userService.updateRole$(roleForm.value.roleName)
    .pipe(
      map((response) => {
        console.log(response);
        this.dataSubject.next({...response,data:response.data});
        this.isLoadingSubject.next(false)
        return { dataState: DataState.LOADED, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADING ,appData:this.dataSubject.value}),
      catchError((error: string) => {
        this.isLoadingSubject.next(false)
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error,
        });
      })
    );
  }

   updateAccountSettings(settingsForm:NgForm): void {
    this.isLoadingSubject.next(true)
    this.profileState$ = this.userService.updateAccountSettings$(settingsForm.value)
    .pipe(
      map((response) => {
        console.log(response);
        this.dataSubject.next({...response,data:response.data});
        this.isLoadingSubject.next(false)
        return { dataState: DataState.LOADED, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADING ,appData:this.dataSubject.value}),
      catchError((error: string) => {
        this.isLoadingSubject.next(false)
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error,
        });
      })
    );
  }


   updatePassword(passwordForm:NgForm): void {
    this.isLoadingSubject.next(true)
    if(passwordForm.value.newPassword === passwordForm.value.confirmNewPasswword){
      this.profileState$ = this.userService.updatePassword$(passwordForm.value)
    .pipe(
      map((response) => {
        console.log(response);
        passwordForm.reset()
        this.dataSubject.next({...response,data:response.data});
        this.isLoadingSubject.next(false)
        return { dataState: DataState.LOADED, appData: this.dataSubject.value };
      }),
      startWith({ dataState: DataState.LOADING ,appData:this.dataSubject.value}),
      catchError((error: string) => {
        passwordForm.reset()
        this.isLoadingSubject.next(false)
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error,
        });
      })
    );
    }else{
      passwordForm.reset();
      this.isLoadingSubject.next(false);
    }
  }
}
