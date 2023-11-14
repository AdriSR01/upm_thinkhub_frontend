import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-detail-idea',
  templateUrl: './detail-idea.component.html',
  styleUrls: ['./detail-idea.component.scss']
})
export class DetailIdeaComponent {

  loading = false;

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
