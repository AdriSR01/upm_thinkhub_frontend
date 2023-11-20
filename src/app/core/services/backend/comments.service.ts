import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Comment} from "../../models/Comment";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class CommentsService extends ApiService {
  readonly SERVICE_NAME = 'feedback/comment';

  createComment(comment: Comment, ideaId: string): Observable<Comment> {
    return this.post<Comment>(`${this.SERVICE_NAME}/${ideaId}`, comment);
  }
}
