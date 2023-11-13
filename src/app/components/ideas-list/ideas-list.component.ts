import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Topics} from 'src/app/core/constants/Topics';
import {Idea} from '../../core/models/Idea';
import {AuthService} from '../../core/services/auth.service';
import {IdeasService} from '../../core/services/backend/ideas.service';
import {SortOrder} from "../../core/config/types";

@Component({
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.scss'],
})
export class IdeasListComponent {
  ideas: Idea[] = [];
  topics: Topics[] = Object.values(Topics);

  showPublish = false;
  loading = false;
  sortOrder?: SortOrder;
  topicSelected: Topics;

  constructor(
    private router: Router,
    private authService: AuthService,
    private ideasService: IdeasService
  ) {
    this.showPublish = this.authService.user !== undefined;
    this.authService.loggedEvent.subscribe(() => {
      this.showPublish = this.authService.user !== undefined;
    });

    this.getIdeas();

    this.topicSelected = this.topics[0];
  }

  private getIdeas() {
    const topic = this.topicSelected !== Topics.ALL ? this.topicSelected : undefined;

    this.loading = true;
    this.ideasService.getAllIdeas(topic, this.sortOrder).subscribe({
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

  filter(sortOrder?: SortOrder) {
    if (sortOrder) {
      this.sortOrder = this.sortOrder === sortOrder ? undefined : sortOrder;
    }
    this.getIdeas();
  }
}

