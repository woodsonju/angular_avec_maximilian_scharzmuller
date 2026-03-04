import { DUMMY_USERS } from '../dummy-users';
import { NewTaskData } from './task/task.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Cela garantit que le service est une instance unique (Singleton)
})
export class TasksServices {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn all the basic and advanced features of Angular & how to apply them',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary: 'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  constructor() {
    // 1. Lire au démarrage les tâches depuis le localStorage
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      // 2. Si des tâches sont trouvées, convertir le JSON en tableau d'objets et les stocker dans la propriété tasks
      this.tasks = JSON.parse(tasks);
    }
  }

  //Get all tasks for the given userId from the list of tasks and return them
  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  //Add a new task to the list of tasks for the given user and the given task data
  addTask(taskData: NewTaskData, userId: string) {
    const newTask = {
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate,
    };
    this.tasks.unshift(newTask);
    this.saveTasksToLocalStorage(); // Sauvegarder les tâches mises à jour dans le localStorage après l'ajout
  }

  //Remove the task with the given id from the list of tasks
  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasksToLocalStorage(); // Sauvegarder les tâches mises à jour dans le localStorage après la suppression
  }

  private saveTasksToLocalStorage() {
    // 3. Convertir le tableau de tâches en JSON et le stocker dans le localStorage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
