import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId(),
    );

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component, // instance du composant NewTaskComponent
) => {
  // Vérifier si l'utilisateur a saisi quelque chose
  if (
    component.enteredTitle() ||
    component.enteredSummary() ||
    component.enteredDate()
  ) {
    return window.confirm(
      'Do you really want to leave? You will lose the entered data!',
    );
    // → true  (OK)     → navigation autorisée
    // → false (Annuler) → navigation bloquée
  }
  // Aucune donnée → quitter librement
  return true;
};
