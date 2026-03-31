import { Inject, InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

//Token pour injecter le tableau
//C'est une clé unique qui permet à Angular d'identifier ce qu'il doit injecter :
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  'task-status-options',
);

//Le tableau TaskStatusOptions contient les différentes options de statut des tâches disponibles dans l'application,avec les propriétés suivantes :
//value : valeur utilisée dans le template pour identifier le statut de la tâche (ex: open, in-progress, done)
//taskStatus : valeur utilisée dans le code pour représenter le statut de la tâche (ex: OPEN, IN_PROGRESS, DONE)
//text : texte affiché dans le template pour représenter le statut de la tâche (ex: Open, In-Progress, Completed)
//Ce tableau est utilisé pour générer dynamiquement les options de statut dans le template,
//en associant chaque option à une valeur de statut spécifique et à un texte descriptif
//pour l'affichage dans l'interface utilisateur lorsque l'utilisateur sélectionne un statut
//pour une tâche dans le template (voir task-item.component.html)
type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[];

//Les données brutes
export const TaskStatusOptions: TaskStatusOptions = [
  { value: 'open', taskStatus: 'OPEN', text: 'Open' },
  { value: 'in-progress', taskStatus: 'IN_PROGRESS', text: 'In-Progress' },
  { value: 'done', taskStatus: 'DONE', text: 'Completed' },
];

//Le lien entre le token d'injection TASK_STATUS_OPTIONS et les données brutes du tableau TaskStatusOptions
//est établi via le provider taskStatusOptionsProvider, qui associe le token à la valeur
// du tableau afin de permettre aux composants de récupérer facilement les options de statut
// des tâches via le système d'injection de dépendances d'Angular
//C'est la configuration qui dit à Angular : "Quand quelqu'un injecte TASK_STATUS_OPTIONS,
// donne lui TaskStatusOptions
//En fournissant ce provider dans le tableau providers du composant TasksListComponent,
// les composants enfants de TasksListComponent peuvent également accéder aux options de statut
// des tâches via le token d'injection TASK_STATUS_OPTIONS
export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS, //Quand on demande ce token
  useValue: TaskStatusOptions, //fournir cettte valeur (le tableau TaskStatusOptions)
};
// TaskStatusOptions contient les données,
// TASK_STATUS_OPTIONS est la clé qui identifie ces données dans le système DI,
// et taskStatusOptionsProvider est la configuration qui lie les deux
//Exporter le provider séparément permet de le réutiliser proprement
// dans n'importe quel composant avec une seule ligne.

//Interface représentant une tâche dans l'application, avec les propriétés suivantes :
//id : identifiant unique de la tâche (généré aléatoirement lors de la création d'une nouvelle tâche)
//title : titre de la tâche (saisi par l'utilisateur lors de la création d'une nouvelle tâche)
//description : description détaillée de la tâche (saisie par l'utilisateur lors de la création d'une nouvelle tâche)
//status : statut actuel de la tâche, qui peut être 'OPEN', 'IN_PROGRESS' ou 'DONE' (défini lors de la création d'une nouvelle tâche et mis à jour lorsque l'utilisateur change le statut de la tâche dans le template)
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
