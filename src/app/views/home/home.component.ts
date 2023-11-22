import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showFilters: boolean = true;
  showEditIdeaButton: boolean = false;
  showModificationDate: boolean = false;
}
