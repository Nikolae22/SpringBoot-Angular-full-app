import { DataState } from "../component/enum/datastate.enum";

export interface State<T>{
    dataState:DataState;
    appData?: T;
    error?:string;
}