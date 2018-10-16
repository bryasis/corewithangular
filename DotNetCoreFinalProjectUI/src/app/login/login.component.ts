import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public returnUrl: string;

  public loading = false;
  public submitted = false;
  public error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({ username: ['', Validators.required], password: ['', Validators.required] });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  public get formControls() {
    return this.loginForm.controls
  };

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.formControls.username.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(data => { this.router.navigate([this.returnUrl]) },
        error => { this.error = error; this.loading = false; });
  }

}
