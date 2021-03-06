import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';

const url = `${environment.baseUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class SignUpApiService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(url).pipe(
      catchError((err: unknown) => {
        alert(err);
        return throwError(err);
      })
    );
  }

  public postUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(url, user).pipe(
      catchError((err: unknown) => {
        alert(err);
        return throwError(err);
      })
    );
  }
}
