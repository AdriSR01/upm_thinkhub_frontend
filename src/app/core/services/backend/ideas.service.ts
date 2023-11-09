import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from '../../models/Idea';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IdeasService extends ApiService {
  createIdea(idea: Idea): Observable<HttpResponse<any>> {
    return this.post('ideas/createIdea', idea);
  }
}
