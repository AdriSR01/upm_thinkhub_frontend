import {Component, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {Idea, Topics} from "../../core/models/Idea";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-detail-idea',
  templateUrl: './detail-idea.component.html',
  styleUrls: ['./detail-idea.component.scss']
})
export class DetailIdeaComponent {

  idea: Idea = {
    id: "df77ade7-b134-40e8-9036-b42e2f3238f5",
    title: "Agile estimation tool",
    topic: Topics.TECHNOLOGICAL,
    description: "A desktop application that will estimate the real duration of a sprint based on the velocity of the team and previous data from them",
    likes: 0,
    user: {
      name: 'Adrián',
      lastName: 'Sánchez',
      email: 'adri@gmail.com',
      phoneNumber: '614876987'
    }
  };

  @ViewChild('emailTooltip') emailTooltip!: MatTooltip;
  @ViewChild('phoneTooltip') phoneTooltip!: MatTooltip;

  loading = false;

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.emailTooltip.disabled = true;
    this.phoneTooltip.disabled = true;
  }

  goBack() {
    this.location.back();
  }

  copy(text: string, tooltip: MatTooltip) {
    navigator.clipboard.writeText(text ?? '');
    tooltip.disabled = false
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      tooltip.disabled = true;
    }, 1000)
  }
}
