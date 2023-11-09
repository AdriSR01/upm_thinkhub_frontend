import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Idea} from "../../models/Idea";

@Injectable({
  providedIn: 'root'
})
export class IdeasService extends ApiService{

  getAllIdeas(): Observable<Idea[]> {
    return this.get<Idea[]>('ideas');
  }
}
