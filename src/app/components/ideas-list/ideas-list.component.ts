import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Idea, Topics } from '../../core/models/Idea';
import { AuthService } from '../../core/services/auth.service';
import { SortOrder } from '../../core/types';

@Component({
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.scss'],
})
export class IdeasListComponent {
  @Input() ideas: Idea[] = [];
  topics: Topics[] = Object.values(Topics);
  @Input() showFilters: boolean = false;
  @Input() showEditIdeaButton: boolean = false;
  @Input() showModificationDate: boolean = false;
  @Input() loading: boolean = false;
  @Output() filterEvent = new EventEmitter<{
    sortOrder?: SortOrder;
    topicSelected: Topics;
  }>();

  showPublish = false;
  sortOrder?: SortOrder;
  topicSelected: Topics;

  constructor(private router: Router, private authService: AuthService) {
    this.showPublish = this.authService.user !== undefined;
    this.authService.loggedEvent.subscribe(() => {
      this.showPublish = this.authService.user !== undefined;
    });
    this.topicSelected = this.topics[0];
  }

  publishIdea() {
    this.router.navigate(['publishIdea']);
  }

  filter(sortOrder?: SortOrder) {
    if (sortOrder) {
      this.sortOrder = this.sortOrder === sortOrder ? undefined : sortOrder;
    }
    this.filterEvent.emit({
      sortOrder: this.sortOrder,
      topicSelected: this.topicSelected,
    });
  }
}
