import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection(), TasksService],
}).catch((err) => console.error(err));
