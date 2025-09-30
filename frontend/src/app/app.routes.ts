import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {ResetpasswordComponent} from "./component/resetpassword/resetpassword.component";
import {VerifyComponent} from "./component/verify/verify.component";

export const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'resetpassword',component: ResetpasswordComponent},
  {path: 'user/verify/account/:key',component: VerifyComponent},
  {path: 'user/verify/password/:key',component: VerifyComponent},
  {path: '**',component: LoginComponent},

];
