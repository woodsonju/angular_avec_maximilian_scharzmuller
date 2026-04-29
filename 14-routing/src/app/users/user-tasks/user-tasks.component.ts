import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  //Façon moderne : avec withComponentInputBinding() voir app.config.ts
  //withComponentInputBinding() permet de lier automatiquement les paramètres
  //de l'URL (:userId). Plus besoin d'ActivatedRoute(ancienne méthode)
  userId = input.required<string>();

  //Sans withComponentInputBinding — ancienne façon
  //Avec ActivatedRoute
  //On a besoin aussi d'implementer OnInit
  private activatedRoute = inject(ActivatedRoute);

  private userService = inject(UsersService);

  private destroyRef = inject(DestroyRef);

  userName = '';

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.userService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //Avec withComponentInputBinding
  // userName = computed(
  //   () => this.userService.users.find((u) => u.id === this.userId())?.name,
  // );
}
