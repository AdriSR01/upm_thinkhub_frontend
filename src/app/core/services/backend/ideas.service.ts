import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {HttpParams, HttpResponse} from "@angular/common/http";
import {Idea} from "../../models/Idea";
import {SortOrder} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class IdeasService extends ApiService {

  readonly SERVICE_NAME = 'ideas';

  createIdea(idea: Idea): Observable<HttpResponse<any>> {
    return this.post(`${this.SERVICE_NAME}/createIdea`, idea);
  }

  getAllIdeas(topic?: string, sortOder?: SortOrder): Observable<Idea[]> {
    let queryParams = new HttpParams();

    if (topic) {
      queryParams = queryParams.append("topic", topic);
    }

    if (sortOder) {
      queryParams = queryParams.append("sortByLikes", sortOder);
    }

    return this.get<Idea[]>(this.SERVICE_NAME, queryParams);
  }

  addLike(id: string): Observable<HttpResponse<any>> {
    return this.patch(`${this.SERVICE_NAME}/likeIdea/${id}`);
  }
}
