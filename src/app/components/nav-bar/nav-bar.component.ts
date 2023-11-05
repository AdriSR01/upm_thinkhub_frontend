import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public isLoggedIn = false;

  showMyIdeas(){

  }

  logOut(){
    this.isLoggedIn = false;
  }

  register(){
    this.isLoggedIn = true;
  }

  logIn(){
    this.isLoggedIn = true;
  }
}
