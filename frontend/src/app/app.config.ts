import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { tokenInterceptor } from './interceptor/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule),
  provideHttpClient(withInterceptors(
    [tokenInterceptor]
  ))]
};
