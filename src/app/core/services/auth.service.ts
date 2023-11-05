import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userValue?: User;

  @Output()
  loggedEvent: EventEmitter<void> = new EventEmitter();

  constructor() {
    const userSession = localStorage.getItem("user");

    if (userSession) {
      this.userValue = new User(userSession);
    }
  }

  get user(): User {
    return this.userValue as User;
  }

  set user(value: User) {
    this.userValue = value;
    localStorage.setItem("user", JSON.stringify(value));
  }


  login(user: User): void {
    this.user = user;
    //  this.loginService.login(user).subscribe({
    //     next: res => {
    //       this.user = Object.assign(new User(JSON.stringify(res)));
    //       this.loggedEvent.emit();
    //     },
    //     error: error => {
    //       console.log(error);
    //     }
    //   });
  }

  logout(): void {
    localStorage.removeItem("user");
    this.userValue = undefined;
  }
}
