import { Component, Input } from '@angular/core';
import { required } from '@angular/forms/signals';
import { Task } from './task/task';

@Component({
  selector: 'app-tasks',
  imports: [Task],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  @Input() name?: string;

  //@Input() name: string | undefined;
}
