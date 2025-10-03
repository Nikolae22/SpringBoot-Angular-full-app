import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../service/user.service";
import {FormsModule, NgForm} from "@angular/forms";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {LoginState} from "../../interface/appstates";
import {DataState} from "../enum/datastate.enum";
import {Key} from "../enum/key.enum";
import {AsyncPipe, NgIf, NgStyle, NgSwitch} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgSwitch,
    FormsModule,
    RouterLink,
    NgStyle,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginState$: Observable<LoginState> = of({dataState: DataState.LOADED});

  private phoneSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);
  readonly DataState = DataState; 

  constructor(private router: Router, private userService: UserService) { }


  ngOnInit(): void {
   this.userService.isAuthenticated() ? this.router.navigate(['/']) : this.router.navigate(['/login']);
  }

  login(loginForm: NgForm): void {
    this.loginState$ = this.userService.login$(loginForm.value.email, loginForm.value.password)
      .pipe(
        map(response => {
          if (response.data!.user!.usingMfa) {
            this.phoneSubject.next(response.data!.user!.phone!);
            this.emailSubject.next(response.data!.user!.email);
            return {
              dataState: DataState.LOADED, loginSuccess: true, isUsingMfa: true,
              phone: response.data!.user!.phone!.substring(response!.data!.user!.phone!.length - 4)
            }
          } else {
            localStorage.setItem(Key.TOKEN, response.data!.access_token);
            localStorage.setItem(Key.REFRESH_TOKEN, response.data!.refresh_token);
            this.router.navigate(['/']);
            return {dataState: DataState.LOADED, loginSuccess: true}
          }
        }),
        startWith({dataState: DataState.LOADING, isUsingMfa: false}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR, isUsingMfa: false, loginSuccess: false, error})
        })
      )
  }

  verifyCode(verifyCodeForm: NgForm): void {
    this.loginState$ = this.userService.verifyCode$(this.emailSubject.value!, verifyCodeForm.value.code)
      .pipe(
        map(response => {
          localStorage.setItem(Key.TOKEN, response.data!.access_token);
          localStorage.setItem(Key.REFRESH_TOKEN, response.data!.refresh_token);
          this.router.navigate(['/']);
          return {dataState: DataState.LOADED, loginSuccess: true}
        }),
        startWith({
          dataState: DataState.LOADING, loginSuccess: true, isUsingMfa: true,
          phone: this.phoneSubject.value!.substring(this.phoneSubject.value!.length - 4)
        }),
        catchError((error: string) => {
          return of({
            dataState: DataState.ERROR, isUsingMfa: true, loginSuccess: false, error,
            phone: this.phoneSubject.value!.substring(this.phoneSubject.value!.length - 4)
          })
        })
      )
  }

  loginPage() {
    this.loginState$ = of({dataState: DataState.LOADED})
  }

}
