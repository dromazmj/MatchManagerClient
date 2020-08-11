import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication/authentication.service';
import { AlertService } from '../_service/alert/alert.service';
import { first } from 'rxjs/operators';
import { AuthenticationUser } from '../models/authenticationuser.module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
      }
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

      // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
  
    this.loading = true;
    let authUser = new AuthenticationUser();
    authUser.username = this.f.username.value;
    authUser.password = this.f.password.value;
    this.authenticationService.login(authUser)
        .pipe(first())
        .subscribe(
            data => {
                localStorage.setItem("username", authUser.username);
                localStorage.setItem("password", authUser.password);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error("Error logging in. Username or password is incorrect.");
                this.loading = false;
            });
    }

}
