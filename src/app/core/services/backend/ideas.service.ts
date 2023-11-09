import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Idea} from "../../models/Idea";

@Injectable({
  providedIn: 'root'
})
export class IdeasService extends ApiService{

  readonly SERVICE_NAME = 'ideas';

  createIdea(idea: Idea): Observable<HttpResponse<any>> {
    return this.post(`${this.SERVICE_NAME}/createIdea`, idea);
  }

  getAllIdeas(): Observable<Idea[]> {
    return this.get<Idea[]>(this.SERVICE_NAME);
  }

  addLike(id: string): Observable<HttpResponse<any>> {
    return this.patch(`${this.SERVICE_NAME}/likeIdea/${id}`);
  }
}
