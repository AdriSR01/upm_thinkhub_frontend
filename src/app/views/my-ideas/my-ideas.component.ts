import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services/backend/users.service';
import { Idea } from '../../core/models/Idea';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-my-ideas',
  templateUrl: './my-ideas.component.html',
  styleUrls: ['./my-ideas.component.scss'],
})
export class MyIdeasComponent {
  loading = false;
  ideas: Idea[] = [];

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
    this.getMyIdeas();
  }

  private getMyIdeas() {
    this.loading = true;
    const userId = this.authService.user?.id;

    if (userId) {
      this.userService.getAllIdeasUser(userId).subscribe({
        next: (ideas: Idea[]) => {
          this.ideas = ideas;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.error('The user in this.authService es undefined.');
    }
  }
}
