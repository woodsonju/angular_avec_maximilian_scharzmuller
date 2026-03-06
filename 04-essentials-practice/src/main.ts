import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection()],
}).catch((err) => console.error(err));
