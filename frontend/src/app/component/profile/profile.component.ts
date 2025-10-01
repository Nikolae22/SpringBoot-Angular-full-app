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
import { FormsModule } from "@angular/forms";


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
  private isLoadingSubkect = new BehaviorSubject<boolean>(false);
  isLoading$ =this.isLoadingSubkect.asObservable();

  readonly DataState = DataState;

  constructor(private userService: UserService) {}
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
          appDataL: this.dataSubject.value,
          error,
        });
      })
    );
  }
}
