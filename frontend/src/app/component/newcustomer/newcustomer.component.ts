import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { CustomHttpResponse } from '../../interface/customhttpresponse';
import { State } from '../../interface/state';
import { Customer } from '../../interface/customer';
import { Page } from '../../interface/appstates';
import { Stats } from '../../interface/stats';
import { User } from '../../interface/user';
import { CustomerService } from '../../service/customer.service';
import { DataState } from '../enum/datastate.enum';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NotificationServiceService } from '../../service/notification-service.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newcustomer',
  standalone: true,
  imports: [FormsModule, RouterLink, NavbarComponent,CommonModule],
  templateUrl: './newcustomer.component.html',
  styleUrl: './newcustomer.component.css'
})
export class NewcustomerComponent implements OnInit {
  newCustomerState$: Observable<State<CustomHttpResponse<Page<Customer> & User & Stats>>> | undefined;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Customer> & User & Stats>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = DataState;

  constructor(private customerService: CustomerService, private notification: NotificationServiceService) { }

  ngOnInit(): void {
    this.newCustomerState$ = this.customerService.customers$()
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          this.notification.onError(error);
          return of({ dataState: DataState.ERROR, error })
        })
      )
  }

  createCustomer(newCustomerForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.newCustomerState$ = this.customerService.newCustomers$(newCustomerForm.value)
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          console.log(response);
          newCustomerForm.reset({ type: 'INDIVIDUAL', status: 'ACTIVE' });
          this.isLoadingSubject.next(false);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.notification.onError(error);
          this.isLoadingSubject.next(false);
          return of({ dataState: DataState.LOADED, error })
        })
      )
  }

}
