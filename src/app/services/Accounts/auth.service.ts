import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../Auth-Service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrllr: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private toast: NgToastService, private route: Router, private AuthTokenService: AuthenticationService) { }

  register(data: string): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.baseApiUrllr + '/register-Customer', data,{
      reportProgress:true,
      observe:'events'
    })
  }

  login(data: string): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrllr}/login`, data)
  }



  


}
