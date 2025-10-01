import {DataState} from "../component/enum/datastate.enum";
import { Events } from "./exents";
import { Role } from "./role";

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
  events: Events[];
  roles: Role[];
  access_token:string;
  refresh_token:string
}
