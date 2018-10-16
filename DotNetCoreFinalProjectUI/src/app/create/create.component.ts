import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public createForm: FormGroup;
  public returnUrl: string;

  public loading = false;
  public submitted = false;
  public error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public get formControls() {
    return this.createForm.controls
  };

  public onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;

    let user = new User();
    user.userName = this.formControls.username.value;
    user.password = this.formControls.password.value;
    user.firstName = this.formControls.firstname.value;
    user.lastName = this.formControls.lastname.value;

    this.userService.createUser(user)
      .pipe(first())
      .subscribe(data => { this.router.navigate([this.returnUrl]) },
        error => { this.error = error; this.loading = false; });
  }

}
