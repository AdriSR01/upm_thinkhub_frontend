import { Component } from '@angular/core';

@Component({
  selector: 'app-my-ideas',
  templateUrl: './my-ideas.component.html',
  styleUrls: ['./my-ideas.component.scss'],
})
export class MyIdeasComponent {
  showFilters: boolean = false;
  showEditIdeaButton: boolean = true;
  showModificationDate: boolean = true;
}
