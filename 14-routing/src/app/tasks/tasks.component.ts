import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  //Avec l' tilisation de  withComponentInputBinding() et withRouterConfig
  // =>  reçoit automatiquement :userId de la route PARENT
  userId = input.required<string>();

  // reçoit automatiquement ?order=asc depuis l'URL
  // grâce à withComponentInputBinding() ✅
  //
  // Pas de required → peut être undefined ✅
  // (premier chargement sans query param)
  //order = input<'asc' | 'desc'>();

  //Via activatedRoute
  order?: 'asc' | 'desc';

  private tasksService = inject(TasksService);
  private destroyRef = inject(DestroyRef);

  //Calculé automatiquement
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId()),
  );

  //Via activatedRoute
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order = params['order']),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
