import {HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Idea} from '../../models/Idea';
import {SortOrder} from '../../types';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class IdeasService extends ApiService {
  readonly SERVICE_NAME = 'ideas';

  createIdea(idea: Idea): Observable<HttpResponse<any>> {
    return this.post(`${this.SERVICE_NAME}/createIdea`, idea);
  }

  getAllIdeas(topic?: string, sortOder?: SortOrder): Observable<Idea[]> {
    let queryParams = new HttpParams();

    if (topic) {
      queryParams = queryParams.append('topic', topic);
    }

    if (sortOder) {
      queryParams = queryParams.append('sortByLikes', sortOder);
    }

    return this.get<Idea[]>(this.SERVICE_NAME, queryParams);
  }

  addLike(id: string): Observable<Idea> {
    return this.patch<Idea>(`${this.SERVICE_NAME}/likeIdea/${id}`);
  }

  removeLike(id: string): Observable<Idea> {
    return this.patch<Idea>(`${this.SERVICE_NAME}/dislikeIdea/${id}`);
  }

  getIdeaById(ideaId: string): Observable<Idea> {
    return this.get<Idea>(`${this.SERVICE_NAME}/${ideaId}`);
  }

  updateIdea(idea: Idea): Observable<HttpResponse<any>> {
    return this.put(`${this.SERVICE_NAME}/idea/${idea.id}`, idea);
  }
}
