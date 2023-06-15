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
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: NgToastService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoginSuccess()) {
      return true;
    } else {
      this.toast.error({
        summary: 'Error Message',
        detail: 'You have not logged In',
        duration: 2000,
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
