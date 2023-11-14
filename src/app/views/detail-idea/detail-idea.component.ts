import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {Idea} from "../../core/models/Idea";

@Component({
  selector: 'app-detail-idea',
  templateUrl: './detail-idea.component.html',
  styleUrls: ['./detail-idea.component.scss']
})
export class DetailIdeaComponent {

  idea: Idea = {
    id: "df77ade7-b134-40e8-9036-b42e2f3238f5",
    title: "Agile estimation tool",
    topic: "Technological",
    description: "A desktop application that will estimate the real duration of a sprint based on the velocity of the team and previous data from them",
    likes: 0,
  };

  loading = false;

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
