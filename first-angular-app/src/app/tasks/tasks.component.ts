import { Component, Input } from '@angular/core';
import { required } from '@angular/forms/signals';
import { NewTaskData, Task } from './task/task.model';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  //@Input() name?: string;
  //@Input() name: string | undefined;

  @Input({ required: true }) name!: string;
  @Input({ required: true }) userId!: string;

  isAddingTask = false; //Par défaut, on le l'affiche pas

  get selectedUserTasks() {
    return;
  }

  //Remove the task with the given id from the list of tasks
  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(taskData: NewTaskData) {
    this.isAddingTask = false;
  }
}
