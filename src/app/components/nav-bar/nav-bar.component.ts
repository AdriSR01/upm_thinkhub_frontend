import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isLoggedIn: boolean;
  myIdeasSection: boolean;

  @Output() registerCliked = new EventEmitter();
  @Output() loginCliked = new EventEmitter();

  constructor(private authService: AuthService,
    private router: Router) {
    this.isLoggedIn = this.authService.user !== undefined;
    this.myIdeasSection = this.router.url === 'my-ideas';

    this.authService.loggedEvent.subscribe(() => {
      this.isLoggedIn = this.authService.user !== undefined;
    });

    this.router.events.subscribe(() => {
      this.myIdeasSection = this.router.url === 'my-ideas';
    });
  }

  onClickLogo() {
    this.router.navigate(['']);
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
