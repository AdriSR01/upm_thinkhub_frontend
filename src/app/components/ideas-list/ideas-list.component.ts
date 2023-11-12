import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Topics} from 'src/app/core/models/Topics';
import {Idea} from '../../core/models/Idea';
import {AuthService} from '../../core/services/auth.service';
import {IdeasService} from '../../core/services/backend/ideas.service';

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
  sortOrder: SortOrder = '';
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
    const sort = this.sortOrder !== '' ? this.sortOrder : undefined;

    this.loading = true;
    this.ideasService.getAllIdeas(topic, sort).subscribe({
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
    this.sortOrder = this.sortOrder === 'ASC' ? '' : 'ASC';
    this.getIdeas();
  }

  sortDescending() {
    this.sortOrder = this.sortOrder === 'DESC' ? '' : 'DESC';
    this.getIdeas();
  }

  filterByTopic() {
    this.getIdeas();
  }
}

export type SortOrder = 'ASC' | 'DESC' | '';
