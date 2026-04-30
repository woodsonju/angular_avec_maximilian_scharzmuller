import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    // Quand l'URL restante après /users/:userId est VIDE
    // ex: /users/u3 → URL restante = ''
    path: '',
    // → rediriger automatiquement vers 'tasks'
    // → chemin RELATIF (sans /)
    // → /users/u3 devient /users/u3/tasks ✅
    redirectTo: 'tasks',
    // 'full' = matcher UNIQUEMENT si l'URL restante
    // est EXACTEMENT '' (vide)
    // et non pas si elle COMMENCE par '' (tout)
    pathMatch: 'full',
  },
  {
    path: 'tasks', //<your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new', //<your-domain>/users/<uid>/tasks/new
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
