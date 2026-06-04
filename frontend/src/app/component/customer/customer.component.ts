import { Component, OnInit } from '@angular/core';
import {State} from "../../interface/state";
import {CustomHttpResponse} from "../../interface/customhttpresponse";
import {CustomerState} from "../../interface/appstates";
import {CustomerService} from "../../service/customer.service";
import {NotificationServiceService} from "../../service/notification-service.service";
import {BehaviorSubject, Observable, catchError, map, of, startWith, switchMap } from "rxjs";
import { DataState } from "../enum/datastate.enum";
import {ActivatedRoute, ParamMap } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  customerState$: Observable<State<CustomHttpResponse<CustomerState>>> | undefined;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<CustomerState> | undefined>(undefined);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = DataState;
  private readonly CUSTOMER_ID:string='id';

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService,
              private notification: NotificationServiceService) { }

  ngOnInit(): void {
    this.customerState$=this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap)=>{
     return this.customerService.customer$(+params.get(this.CUSTOMER_ID)!)
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
      )
      })
    );
  }

  updateCustomer(customerForm:NgForm): void {
    this.isLoadingSubject.next(true);
    this.customerState$= this.customerService.update$(customerForm.value)
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next({...response,
            data: {...response.data!,
              customer: {...response.data!.customer,
                invoices:this.dataSubject.value!.data!.customer.invoices }}});
          this.isLoadingSubject.next(false)
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoadingSubject.next(false)
          return of({ dataState: DataState.ERROR, error })
        })
    );
  }
}
