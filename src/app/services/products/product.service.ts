import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../Auth-Service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(
    private httpClinet: HttpClient,
    private authtoken: AuthenticationService
  ) {}

  getProduct(page: number, pagesize: number, searchText?: string): Observable<any> {
    return this.httpClinet.get<any>(this.baseApiUrl + `/Product?&page=${page}&pagesize=${pagesize}`);
  }

  getProducts(page: number, pagesize: number, searchText?: string): Observable<any> {
    return this.httpClinet.get<any>(this.baseApiUrl + `/Products?page=${page}&pagesize=${pagesize}`);
  }

  // getProducts(): Observable<any> {
  //   return this.httpClinet.get<any>(this.baseApiUrl + '/Products');
  // }

  addProduct(dataCalled: string): Observable<any> {   
    return this.httpClinet.post<any>(this.baseApiUrl + '/Product', dataCalled);
  }

  deleteProduct(ProductId: any): Observable<any> {
    return this.httpClinet.delete(
      this.baseApiUrl + `/Product?id=${ProductId}`,
 
    );
  }

  updateProduct(ProductId: string): Observable<any> {
    return this.httpClinet.put(this.baseApiUrl + `/Product`, ProductId);
  }
}
