import { Component, computed, Input, input, Output, output, EventEmitter } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';

// type UserType = {
//   id: string;
//   name: string;
//   avatar: string;
// }

interface T_User {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input({ required: true }) user!: T_User;

  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
