import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Accounts/auth.service';
import { LoaderComponent } from 'src/app/modules/shared/components/loader/loader.component';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/services/Auth-Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(LoaderComponent) shows!: LoaderComponent;
  loginForm: any = FormGroup;
  faLock = faLock;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServielogin: AuthService,
    private myAuth: AuthenticationService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ),
        ],
      ],
      Username: ['', [Validators.required, Validators.maxLength(25)]],
    });
    localStorage.clear();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authServielogin.login(this.loginForm.value).subscribe(
      (value: any) => {
        localStorage.setItem('token', value?.token);
        localStorage.setItem('fullName', value.fullName);
        localStorage.setItem('ProfilePhoto', value.ProfilePhoto);
        this.toast.success({
          summary: value.message,
          detail: 'Login is Success, Welcome',
          duration: 2000,
        });
        let role = this.myAuth.getRole();
        role === 'Admin'
          ? this.router.navigate(['/admin/product/manage-orders'])
          : this.router.navigate(['user']);

        this.myAuth.isLoggedIn.next(true);
      },
      (err) => {
        this.toast.error({
          summary: 'Error',
          detail: 'Login Failed, Wrong credentials!!',
          duration: 2000,
        });
      }
    );
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  }
}
