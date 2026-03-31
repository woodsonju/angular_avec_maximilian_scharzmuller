import {
  Inject,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';

export const TasksServiceToken = new InjectionToken<TasksService>(
  'tasks-service-token',
);

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    { provide: TasksServiceToken, useClass: TasksService },
  ],
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [provideZoneChangeDetection()],
// }).catch((err) => console.error(err));
