import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Accounts/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { FileUploadService } from '../services/FileUpload/file-upload.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: any = FormGroup;
  faLock = faLock;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  message = '';
  progressValue: number = 0;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private authServiceregister: AuthService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.loginValidation();
  }

  loginValidation() {
    this.loginForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.maxLength(25)]],
      // files: ['', Validators.required],
      profile: ['', Validators.required],
      email: [
        '',
        [Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    this.isSignUpFailed = false;
    if (this.loginForm.invalid) {
      this.toast.error({
        summary: '',
        detail: 'Please fill the details for registation!!',
        duration: 2000,
      });
      return;
    }
    var formData: any = new FormData();
    formData.append('profile', this.loginForm.get('profile')?.value);
    formData.append('firstName', this.loginForm.get('firstName')?.value);
    formData.append('lastName', this.loginForm.get('lastName')?.value);
    formData.append('username', this.loginForm.get('username')?.value);
    formData.append('email', this.loginForm.get('email')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    this.authServiceregister.register(formData).pipe
      (map(events => {
        switch (events.type) {
          case HttpEventType.UploadProgress:
            this.progressValue = Math.round(events.loaded / events.total! * 100);
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              this.progressValue = 0;
            }, 2000);
            setTimeout(() => {
                     this.router.navigate(['login']);
                 },1500);
          
        }
      }),
      ).subscribe(
        (res) => {
          this.isSuccessful = true;
          this.toast.success({
                    summary: "",
                    detail: 'Register is Success',
                    duration: 2000,
                  });
                  this.message = ' Your registration is successfully...';
                  this.isSuccessful = true;
        },
        (error: any) => {
          this.toast.error({
            summary: error.Message,
            detail: 'Registration Failed, User Name already exist!!',
            duration: 1500,
          });
          this.message = 'Registration Failed, User Name already exist!!';
          this.isSignUpFailed = true;

        })

  }


  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      const profile = event.target.files[0];
      this.loginForm.patchValue({
        profile: profile
      });
    }
  }
}

