import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { StatsComponent } from "../stats/stats.component";
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { CustomHttpResponse } from '../../interface/customhttpresponse';
import { State } from '../../interface/state';
import { DataState } from '../enum/datastate.enum';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Page } from '../../interface/appstates';
import { Customer } from '../../interface/customer';
import { User } from '../../interface/user';
import {Stats} from "../../interface/stats";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import { NotificationServiceService } from '../../service/notification-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, StatsComponent, AsyncPipe, NgClass, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  homeState$: Observable<State<CustomHttpResponse<Page<Customer> & User & Stats>>> | undefined;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Customer> & User & Stats>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();
  private fileStatusSubject = new BehaviorSubject<{ status: string, type: string, percent: number }>(undefined);
  fileStatus$ = this.fileStatusSubject.asObservable();
  readonly DataState = DataState;

  constructor(private router: Router, private customerService: CustomerService,
    private notification: NotificationServiceService) { }

  ngOnInit(): void {
    this.homeState$ = this.customerService.customers$()
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
  }

  goToPage(pageNumber?: number): void {
    this.homeState$ = this.customerService.customers$(pageNumber)
      .pipe(
        map(response => {
          this.notification.onDefault(response.message);
          console.log(response);
          this.dataSubject.next(response);
          this.currentPageSubject.next(pageNumber!);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          return of({ dataState: DataState.LOADED, error, appData: this.dataSubject.value })
        })
      )
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  selectCustomer(customer: Customer): void {
    this.router.navigate([`/customers/${customer.id}`]);
  }

  report(): void {
    this.homeState$ = this.customerService.downloadReport$()
      .pipe(
        map(response => {
          console.log(response);
          this.reportProgress(response);
          return { dataState: DataState.LOADED, appData: this.dataSubject.value };
        }),
        startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.notification.onError(error);
          return of({ dataState: DataState.LOADED, error, appData: this.dataSubject.value })
        })
      )
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.DownloadProgress || HttpEventType.UploadProgress:
        this.fileStatusSubject.next({ status: 'progress', type: 'Downloading...', percent: Math.round(100 * httpEvent.loaded / httpEvent.total) });
        break;
      case HttpEventType.ResponseHeader:
        console.log('Got response Headers', httpEvent);
        break;
      case HttpEventType.Response:
        this.notification.onDefault('Downloading file...');
        saveAs(new File([<Blob>httpEvent.body], httpEvent.headers.get('File-Name')!,
          { type: `${httpEvent.headers.get('Content-Type')};charset-utf-8` }));
        this.fileStatusSubject.next(undefined!);
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }

}
function saveAs(arg0: File) {
  throw new Error('Function not implemented.');
}

