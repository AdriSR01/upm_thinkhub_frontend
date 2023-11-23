import { Component } from '@angular/core';
import { Idea, Topics } from '../../core/models/Idea';
import { AuthService } from '../../core/services/auth.service';
import { IdeasService } from '../../core/services/backend/ideas.service';
import { SortOrder } from '../../core/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showFilters: boolean = true;
  showEditIdeaButton: boolean = false;
  ideas: Idea[] = [];
  loading = false;
  showPublish = false;
  showModificationDate: boolean = false;

  constructor(
    private authService: AuthService,
    private ideasService: IdeasService
  ) {
    this.showPublish = this.authService.user !== undefined;
    this.authService.loggedEvent.subscribe(() => {
      this.showPublish = this.authService.user !== undefined;
    });

    this.getIdeas();
  }

  getIdeas(filters?: { sortOrder?: SortOrder; topicSelected: Topics }) {
    const topic =
      filters?.topicSelected !== Topics.ALL
        ? filters?.topicSelected
        : undefined;

    this.loading = true;
    this.ideasService.getAllIdeas(topic, filters?.sortOrder).subscribe({
      next: (ideas: Idea[]) => {
        this.ideas = ideas;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
