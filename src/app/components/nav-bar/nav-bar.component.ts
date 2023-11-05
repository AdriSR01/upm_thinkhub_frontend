import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public isLoggedIn = this.authService.user !== undefined;

  constructor(private authService: AuthService){}

  showMyIdeas(){

  }

  logOut(){
    this.authService.logout;
  }

  register(){
    this.isLoggedIn = true;
  }

  logIn(){
    this.authService.login;
  }
}
