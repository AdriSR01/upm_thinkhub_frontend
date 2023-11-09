import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  readonly SERVICE_NAME = 'user';
  register(user: User): Observable<User> {
    return this.post<User>(`${this.SERVICE_NAME}/register`, user);
  }

  login(email: string, password: string): Observable<User> {
    const body = {
      email: email,
      password: password
    };

    return this.post<User>(`${this.SERVICE_NAME}/login`, body);
  }

}
