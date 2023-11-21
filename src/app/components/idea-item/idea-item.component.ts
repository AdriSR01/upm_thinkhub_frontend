import {Component, Input, OnInit} from '@angular/core';
import {Idea} from 'src/app/core/models/Idea';
import {IdeasService} from "../../core/services/backend/ideas.service";
import {Router} from "@angular/router";
import {LikesService} from "../../core/services/likes.service";

@Component({
  selector: 'app-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss'],
})
export class IdeaItemComponent implements OnInit {
  @Input() idea!: Idea;
  @Input() isNotDetail = true;

  hasLike = false;
  disabledButton = false;

  constructor(private ideasService: IdeasService,
              private likesService: LikesService,
              private router: Router) {
  }

  ngOnInit() {
    this.hasLike = this.likesService.hasLike(this.idea.id!);
    this.disabledButton = this.hasLike;
  }

  addLike() {
    this.hasLike = true;
    this.ideasService.addLike(this.idea.id!).subscribe({
      next: (idea: Idea) => {
        this.idea = idea;
        this.likesService.addLike(idea.id!);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  goToDetail() {
    this.router.navigate([`detailsIdea/${this.idea.id}`]);
  }
}
