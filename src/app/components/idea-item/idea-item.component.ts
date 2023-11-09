import { Component, Input } from '@angular/core';
import { Idea } from 'src/app/core/models/Idea';

@Component({
  selector: 'app-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss'],
})
export class IdeaItemComponent {
  @Input() idea!: Idea;
}
