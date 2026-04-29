import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  //Avec l' tilisation de  withComponentInputBinding() et withRouterConfig
  // =>  reçoit automatiquement :userId de la route PARENT
  //
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  private tasksService = inject(TasksService);

  //Calculé automatiquement
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId()),
  );
}
