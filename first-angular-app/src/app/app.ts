import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { User } from './user/user';
import { DUMMY_USERS } from './dummy-users';
import { Tasks } from './tasks/tasks';

@Component({
  selector: 'app-root',
  imports: [Header, User, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  users = DUMMY_USERS;

  selectedUserId = 'u1';

  get selectedUser() {
    return DUMMY_USERS.find((user) => user.id === this.selectedUserId)!;
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
