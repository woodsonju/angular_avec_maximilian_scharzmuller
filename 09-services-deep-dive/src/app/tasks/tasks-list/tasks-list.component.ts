import { Component, signal, inject, computed } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import {
  TASK_STATUS_OPTIONS,
  TaskStatusOptions,
  taskStatusOptionsProvider,
} from '../task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider], // Fournit les options de statut des tâches à ce composant et à ses enfants via le token d'injection TASK_STATUS_OPTIONS
})
export class TasksListComponent {
  private tasksService = inject(TasksServiceToken);

  private selectedFilter = signal<string>('all');

  //Angular cherche TASK_STATUS_OPTIONS
  // trouve dans l'Element Injector
  // retourne le tableau TaskStatusOptions
  taskStatusOptions = inject(TASK_STATUS_OPTIONS); // Récupère les options de statut des tâches fournies par le provider taskStatusOptionsProvider via le token d'injection TASK_STATUS_OPTIONS

  //computed() recalcule automatiquement quand selectedFilter change (mise à jour du signal selectedFilter
  //via onChangeTasksFilter qui est appelé par le template lorsque l'utilisateur clique sur un bouton
  //de filtre des tâches (MY TACKS))
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  //Met à jour le Signal selectedFilter avec la nouvelle valeur du filtre sélectionné par l'utilisateur
  //l'appel de set() sur le Signal selectedFilter déclenche automatiquement le recalcul de la
  //méthodecomputed tasks, ce qui met à jour la liste des tâches affichées dans le template
  //en fonction du nouveau filtre sélectionné
  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter); // met à jour le Signal
  }
}
