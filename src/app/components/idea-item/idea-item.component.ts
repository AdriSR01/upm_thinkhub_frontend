import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idea } from 'src/app/core/models/Idea';
import { IdeasService } from '../../core/services/backend/ideas.service';
import { LikesService } from '../../core/services/likes.service';

@Component({
  selector: 'app-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss'],
})
export class IdeaItemComponent implements OnInit {
  @Input() idea!: Idea;
  @Input() isNotDetail = true;
  @Input() showEditIdeaButton: boolean = false;
  @Input() showModificationDate: boolean = false;

  allowLike = true;

  constructor(
    private ideasService: IdeasService,
    private likesService: LikesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.allowLike = !this.likesService.hasLike(this.idea.id!);
  }

  addLike() {
    this.allowLike = false;
    this.ideasService.addLike(this.idea.id!).subscribe({
      next: (idea: Idea) => {
        this.idea = idea;
        this.likesService.addLike(idea.id!);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goToDetail() {
    this.router.navigate([`detailsIdea/${this.idea.id}`]);
  }
}
