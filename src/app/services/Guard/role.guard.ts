import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from '../Auth-Service/auth.service';


@Injectable({
  providedIn: 'root',
})

export class RoleGuard implements CanActivate {
  constructor (private myAuth: AuthenticationService,private router: Router ,private toast: NgToastService) {}
  canActivate() {
   
    let Role = this.myAuth.getRole();
    if (Role == 'Admin') {
      return true;
    } else{
      this.toast.error({
        summary: '',
        detail: 'You have"t privilages to access admin route',
        duration: 2000 })
        this.router.navigate(['user']);
          return false;
    }      
  }
}
