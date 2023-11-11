import { Component, Input } from '@angular/core';
import { Idea } from 'src/app/core/models/Idea';
import {IdeasService} from "../../core/services/backend/ideas.service";

@Component({
  selector: 'app-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss'],
})
export class IdeaItemComponent {
  @Input() idea!: Idea;

  allowLike = true;
  constructor(private ideasService: IdeasService) {
  }
  addLike() {
    this.allowLike = false;
    this.ideasService.addLike(this.idea.id!).subscribe({
      next: (idea: Idea)=> {
        this.idea = idea;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
