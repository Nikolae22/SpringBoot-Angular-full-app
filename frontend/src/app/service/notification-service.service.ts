import { NotifierService } from 'angular-notifier';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private readonly notifier: NotifierService;

   constructor(private readonly notifier: NotifierService) {}

    onDefault(message: string): void {
        this.notifier.notify(Type.DEFAULT, message);
    }

    onSuccess(message: string): void {
        this.notifier.notify(Type.SUCCESS, message);
    }

    onInfo(message: string): void {
        this.notifier.notify(Type.INFO, message);
    }

    onWarning(message: string): void {
        this.notifier.notify(Type.WARNING, message);
    }

    onError(message: string): void {
        this.notifier.notify(Type.ERROR, message);
    }
}

enum Type {
    DEFAULT = 'default',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
}
