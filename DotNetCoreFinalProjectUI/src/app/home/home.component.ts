import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({ templateUrl: './home.component.html' })
export class HomeComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {

    let currentUser : User = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUser(currentUser.id).pipe(first()).subscribe(user =>
    {
      this.user = user;
    });
  }

}
