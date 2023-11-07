import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  register(user: User): Observable<HttpResponse<any>> {
    return this.post('user/register', user);
  }

  login(email: string, password: string): Observable<HttpResponse<any>> {
    const body = {
      email: email,
      password: password
    };

    return this.post('user/login', body);
  }

}
