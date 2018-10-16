import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {

    let url = environment.servicesUrl + '/security/authenticate';
    let loginUser = new User;
    loginUser.userName = username;
    loginUser.password = password;

    let httpHeaders = { headers: new HttpHeaders({ 'Accept': 'application/json' }) };

    return this.http.post<any>(url, loginUser, httpHeaders)
      .pipe(map(user => {
        if (user) {
          user.authdata = window.btoa(loginUser.userName + ':' + loginUser.password);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
