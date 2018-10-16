import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  
  constructor(private http: HttpClient) { }

  public getUser(userId: number) {
    let url = environment.servicesUrl + '/users/' + userId;
    let httpHeaders = { headers: new HttpHeaders({ 'Accept': 'application/json' }) };
    return this.http.get<User>(url, httpHeaders);
  }

  public createUser(user: User) {
    let url = environment.servicesUrl + '/users';
    let httpHeaders = { headers: new HttpHeaders({ 'Accept': 'application/json' }) };
    return this.http.post<any>(url, user, httpHeaders)
      .pipe(map(user => {
        if (user) {
          user.authdata = window.btoa(user.userName + ':' + user.password);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
}

