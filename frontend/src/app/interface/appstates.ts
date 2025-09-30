import {DataState} from "../component/enum/datastate.enum";
import {User} from "./user";

export interface LoginState {
  dataState: DataState;
  loginSuccess?: boolean;
  error?:string;
  message?: string;
  isUsingMfa?: boolean;
  phone?: string
}

export interface Profile {
  user?: User;
  access_token:string;
  refresh_token:string
}
