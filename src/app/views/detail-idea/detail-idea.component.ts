import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { snackBarConfig } from 'src/app/core/config/snackBarConfig';
import { Comment } from 'src/app/core/models/Comment';
import { CommentsService } from 'src/app/core/services/backend/comments.service';
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
  commentContent = "";

  @ViewChild('emailTooltip') emailTooltip!: MatTooltip;
  @ViewChild('phoneTooltip') phoneTooltip!: MatTooltip;

  constructor(
    private location: Location,
    private authService: AuthService,
    private ideasService: IdeasService,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.showPublish = this.authService.user !== undefined;
    this.authService.loggedEvent.subscribe(() => {
      this.showPublish = this.authService.user !== undefined;
    });

    this.getIdea();
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

  onSubmitComment(){
    const comment: Comment = {
      comment: this.commentContent.trim()
    };

    this.loading = true;
    this.commentsService.createComment(comment, this.idea.id!).subscribe({
      next: () => {
        this.commentContent = "";
        this.getIdea();
        this.loading = false;
        this.snackBar.open('Comment saved successfully', 'X', {
          ...snackBarConfig,
          panelClass: snackBarConfig.panelClass?.concat('info-snackbar')
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  isCommentWritten(){
    return this.commentContent.trim() !== "";
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
    }
  }
}
