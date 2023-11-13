import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly ENDPOINT = 'https://thinkhub-backend.onrender.com';

  constructor(private http: HttpClient) {
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.ENDPOINT}/${endpoint}`, {params: params});
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.ENDPOINT}/${endpoint}`, body);
  }

  patch<T>(endpoint: string, body?: any): Observable<T> {
    return this.http.patch<T>(`${this.ENDPOINT}/${endpoint}`, body);
  }
}
