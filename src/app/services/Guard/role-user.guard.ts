import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from '../Auth-Service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleUserGuard implements CanActivate {
  constructor(
    private myAuth: AuthenticationService,
    private router: Router,
    private toast: NgToastService
  ) {}
  canActivate() {
    let Role = this.myAuth.getRole();
    if (Role == 'User') {
      return true;
    } else {
      this.toast.error({
        summary: '',
        detail: 'You have"t privilages to access User route',
        duration: 2000,
      });
      this.router.navigate(['/admin/product/manage-orders']);
      return false;
    }
  }
}
