import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userValue?: User;

  @Output()
  loggedEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}

  get user(): User {
    return this.userValue as User;
  }

  set user(value: User) {
    this.userValue = value;
  }


  login(user: User): void {
    this.user = user;
    this.loggedEvent.emit();
  }

  logout(): void {
    localStorage.removeItem("user");
    this.userValue = undefined;
    this.loggedEvent.emit();
  }
}
