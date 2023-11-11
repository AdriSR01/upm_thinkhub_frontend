import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Idea } from '../../core/models/Idea';
import { AuthService } from '../../core/services/auth.service';
import { IdeasService } from '../../core/services/backend/ideas.service';

@Component({
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.scss'],
})
export class IdeasListComponent {
  ideas: Idea[] = [];

  showPublish = false;
  loading = false;
  sortOrder: SortOrder = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private ideasService: IdeasService
  ) {
    this.showPublish = this.authService.user !== undefined;
    this.authService.loggedEvent.subscribe(() => {
      this.showPublish = this.authService.user !== undefined;
    });

    this.loading = true;
    this.ideasService.getAllIdeas().subscribe({
      next: (ideas: Idea[]) => {
        this.ideas = ideas;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  publishIdea() {
    this.router.navigate(['publishIdea']);
  }

  sortAscending() {
    this.sortOrder = (this.sortOrder === 'ASC') ? '' : 'ASC';
    // TODO: Sort ideas by ascending order
  }

  sortDescending() {
    this.sortOrder = (this.sortOrder === 'DESC') ? '' : 'DESC';
    // TODO: Sort ideas by descending order
  }
}

export type SortOrder = 'ASC' | 'DESC' | '';
