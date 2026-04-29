import { Component, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  //Façon moderne : avec withComponentInputBinding() voir app.config.ts
  //withComponentInputBinding() permet de lier automatiquement les paramètres
  //de l'URL (:userId). Plus besoin d'ActivatedRoute(ancienne méthode)
  userId = input.required<string>();

  //Sans withComponentInputBinding — ancienne façon
  //Avec ActivatedRoute
  //On a besoin aussi d'implementer OnInit
  // private activatedRoute = inject(ActivatedRoute);

  // private userService = inject(UsersService);

  // private destroyRef = inject(DestroyRef);

  //userName = '';
  userName = input.required<string>();

  //Via withComponentInputBinding()
  // reçoit automatiquement la data de la route
  message = input.required<string>();

  private activatedRoute = inject(ActivatedRoute);

  //293. Accessing Route Data In Components
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //   });
  // }

  // ngOnInit(): void {
  //   console.log('Input Data: ' + this.message());
  //   //Snapshot — valeur figée au moment du chargement
  //   console.log(this.activatedRoute.snapshot);
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId'));

  //   // Observable — valeur réactive qui change
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.userService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  //Avec withComponentInputBinding
  // userName = computed(
  //   () => this.userService.users.find((u) => u.id === this.userId())?.name,
  // );
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId'),
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState,
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks"; //Pierre's Tasks
};
