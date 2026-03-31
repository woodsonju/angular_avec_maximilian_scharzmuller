import { Component, inject } from '@angular/core';

import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [TasksComponent],
  //   providers: [LoggingService],
})
export class AppComponent {}
