import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Idea } from '../../core/models/Idea';
import { AuthService } from '../../core/services/auth.service';
import { IdeasService } from '../../core/services/backend/ideas.service';

@Component({
  selector: 'app-detail-idea',
  templateUrl: './detail-idea.component.html',
  styleUrls: ['./detail-idea.component.scss'],
})
export class DetailIdeaComponent {
  idea: Idea = {};
  showPublish = false;
  loading = false;

  @ViewChild('emailTooltip') emailTooltip!: MatTooltip;
  @ViewChild('phoneTooltip') phoneTooltip!: MatTooltip;
  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private ideasService: IdeasService,
    private route: ActivatedRoute
  ) {
    this.showPublish = this.authService.user !== undefined;
    this.authService.loggedEvent.subscribe(() => {
      this.showPublish = this.authService.user !== undefined;
    });

    this.getIdea();
  }

  private getIdea() {
    this.loading = true;
    const ideaId = this.route.snapshot.paramMap.get('id');
    if (ideaId) {
      this.ideasService.getIdeaById(ideaId).subscribe({
        next: (idea: Idea) => {
          this.idea = idea;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.error('The id was not provided');
    }
  }

  ngOnInit() {
    this.emailTooltip.disabled = true;
    this.phoneTooltip.disabled = true;
  }

  goBack() {
    this.location.back();
  }

  copy(text: string, tooltip: MatTooltip) {
    navigator.clipboard.writeText(text ?? '');
    tooltip.disabled = false;
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      tooltip.disabled = true;
    }, 1000);
  }
}
