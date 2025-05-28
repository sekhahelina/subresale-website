import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './_system/_interceptors/token/token.interceptor';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxMask(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([tokenInterceptor]),
      withFetch()
    )
  ]
};
