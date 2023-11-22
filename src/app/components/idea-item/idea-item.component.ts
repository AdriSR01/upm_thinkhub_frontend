import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Idea} from 'src/app/core/models/Idea';
import {IdeasService} from '../../core/services/backend/ideas.service';
import {LikesService} from '../../core/services/likes.service';

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

  hasLike = false;
  disabledButton = false;
  loading = false;

  constructor(
    private ideasService: IdeasService,
    private likesService: LikesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.hasLike = this.likesService.hasLike(this.idea.id!);
    this.disabledButton = this.hasLike;
  }

  likeAction() {
    this.loading = true;
    if (this.hasLike) {
      this.loading = false;
      this.idea.likes!--;
      this.likesService.removeLike(this.idea.id!);
    } else {
      this.ideasService.addLike(this.idea.id!).subscribe({
        next: (idea: Idea) => {
          this.idea = idea;
          this.likesService.addLike(idea.id!);
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    this.hasLike = !this.hasLike;
    this.disabledButton = this.hasLike;
  }

  goToDetail() {
    this.router.navigate([`detailsIdea/${this.idea.id}`]);
  }

  goToEdit() {
    this.router.navigate([`editIdea/${this.idea.id}`]);
  }
}
