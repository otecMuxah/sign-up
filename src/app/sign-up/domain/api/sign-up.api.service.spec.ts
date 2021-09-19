import { TestBed } from '@angular/core/testing';

import { SignUpApiService } from './sign-up.api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserModel } from '../models/user.model';

describe('SignUpApiService', () => {
  let service: SignUpApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SignUpApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users from api', () => {
    const fakeUsers: UserModel[] = [
      { firstName: 'John', lastName: 'Doe', email: 'master@host.com' },
    ];
    spyOn(service, 'getUsers').and.returnValue(of(fakeUsers));
    service.getUsers().subscribe((users) => expect(users).toEqual(fakeUsers));
  });

  it('should send user to api', () => {
    const fakeUser: UserModel = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'master@host.com',
    };
    spyOn(service, 'postUser').and.returnValue(of(fakeUser));
    service
      .postUser(fakeUser)
      .subscribe((user) => expect(user).toEqual(fakeUser));
  });
});
