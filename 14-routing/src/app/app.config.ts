import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';

/* Il faut ajouter withRouterConfig({ paramsInheritanceStrategy: 'always' }) 
  pour que :userId de la route parent /users/:userId soit automatiquement transmis 
  comme input() au composant enfant TasksComponent */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
    ),
  ],
};
