import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

const url = 'https://demo-api.now.sh/users';

@Injectable({
  providedIn: 'root',
})
export class SignUpApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(url);
  }

  postUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(url, user);
  }
}
