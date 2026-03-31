import { Component, signal, inject, computed } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private tasksService = inject(TasksServiceToken);

  private selectedFilter = signal<string>('all');

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
