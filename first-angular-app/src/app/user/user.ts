import { Component, computed, Input, input } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  avatar = input.required<string>();
  name = input.required<string>();

  imagePath = computed(() => `users/${this.avatar()}`);

  // get imagePath() {
  //   return `users/${this.avatar}`;
  // }

  onSelectUser() {}
}
