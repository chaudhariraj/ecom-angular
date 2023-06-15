import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../Auth-Service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(
    private httpClinet: HttpClient,
    private authtoken: AuthenticationService
  ) {}

  addOrder(dataCalled: any): Observable<any> {
    return this.httpClinet.post<any>(
      this.baseApiUrl + '/Order',
      dataCalled,
    );
  }

  getOrders(): Observable<any> {
    return this.httpClinet.get<any>(this.baseApiUrl + '/Order/GetUserOrders');
  }

  getManageOrders(status: any): Observable<any> {
    return this.httpClinet.get<any>(
      this.baseApiUrl + `/Admin?status=${status}`
    );
  }

  updateOrderStatus(
    status: string,
    orderId: number,
    quantity: number,
    productId: number
  ): Observable<any> {
    return this.httpClinet.put<any>(
      this.baseApiUrl +
        `/Admin?status=${status}&orderId=${orderId}&quantity=${quantity}&productId=${productId}`,
      orderId
    );
  }

  addStarRating(rating: any): Observable<any> {
    return this.httpClinet.post<any>(this.baseApiUrl + '/StarRating', rating);
  }

  
  UserProfileData(): Observable<any> {
    return this.httpClinet.get<any>(this.baseApiUrl + '/Profile/GetUserProfile');
  }
 
}
