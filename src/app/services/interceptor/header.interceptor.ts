import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthenticationService } from '../Auth-Service/auth.service';
import { LoaderService } from '../Loaders/loader.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthenticationService, private loader: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.isloadingstatus.next(true);
    const token = this.authservice.getToken();
    if(token){
      const tokenrequested = request.clone({
        headers: request.headers.set('Authorization', 'Bearer  ' + token),
      });
      return next.handle(tokenrequested).pipe(
          finalize(
                 ()=>{
                 this.loader.isloadingstatus.next(false);
               }
              )
             )
    }
    return next.handle(request).pipe(
      finalize(
             ()=>{
             this.loader.isloadingstatus.next(false);
           }
          )
         )
  }
}
