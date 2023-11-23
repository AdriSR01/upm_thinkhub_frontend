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
  onHoverButton = false;
  likeDelay = true;
  loading = false;

  constructor(
    private ideasService: IdeasService,
    private likesService: LikesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.hasLike = this.likesService.hasLike(this.idea.id!);
    //this.onHoverButton = this.hasLike;
  }

  likeAction() {
    this.loading = true;

    this.hasLike ? this.likesService.removeLike(this.idea.id!) : this.likesService.addLike(this.idea.id!);

    const observable = this.hasLike ? this.ideasService.removeLike(this.idea.id!) : this.ideasService.addLike(this.idea.id!);

    this.hasLike = !this.hasLike;

    if (this.hasLike) {
      this.likeDelay = false;
      setTimeout(() => {
        this.likeDelay = true;
      }, 2000);
    }

    observable.subscribe({
      next: (idea: Idea) => {
        this.idea = idea;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  goToDetail() {
    this.router.navigate([`detailsIdea/${this.idea.id}`]);
  }

  goToEdit() {
    this.router.navigate([`editIdea/${this.idea.id}`]);
  }
}
