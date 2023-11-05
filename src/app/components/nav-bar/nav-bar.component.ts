import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isLoggedIn: boolean;

  @Output() registerCliked = new EventEmitter();
  @Output() loginCliked = new EventEmitter();

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.user !== undefined;

    this.authService.loggedEvent.subscribe(() => {
      this.isLoggedIn = this.authService.user !== undefined;
    });
  }

  showMyIdeas() {

  }

  logOut() {
    this.authService.logout();
  }

  register() {
    this.registerCliked.emit();
  }

  logIn() {
    this.loginCliked.emit();
  }
}
