import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from '../../models/Idea';
import { User } from '../../models/User';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {
  readonly SERVICE_NAME = 'user';
  register(user: User): Observable<User> {
    return this.post<User>(`${this.SERVICE_NAME}/register`, user);
  }

  login(email: string, password: string): Observable<User> {
    const body = {
      email: email,
      password: password,
    };

    return this.post<User>(`${this.SERVICE_NAME}/login`, body);
  }

  getAllIdeasUser(userId: string): Observable<Idea[]> {
    return this.get<Idea[]>(`${this.SERVICE_NAME}/myideas/${userId}`);
  }
}
