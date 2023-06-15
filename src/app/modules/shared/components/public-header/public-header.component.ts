import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/services/Auth-Service/auth.service';
import { CartService } from 'src/app/services/carts/cart.service';
import { OrderService } from 'src/app/services/Orders/order.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss'],
})
export class PublicHeaderComponent implements OnInit {
  filterTerm!: string;
  showHead!: boolean;
  hideHead!: boolean;
  public totalItem: number = 0;
  public isDisplayheader = true;
  public searchTerm!: string;
  token: any;
  userProfiles: any = {};

  constructor(
    private cartservice: CartService,
    private toast: NgToastService,
    private router: Router,
    public auth: AuthenticationService,
    private UserProfile: OrderService
  ) {
    this.token = null;
  }

  ngOnInit(): void {
   this.Header();
   this.SingleUserProfileData();
  }

  Header(){
    this.auth.isLoggedIn.subscribe((val) => {
      this.showHead = val;
      this.hideHead = val;
    });
    this.showHead = this.auth.isLoginSuccess();
    this.cartservice.getProducts().subscribe((res) => {
      if(res.length === 0){
        let items = JSON.parse(localStorage.getItem("products")!);
        this.totalItem = items?.length
      }else{
        this.totalItem = res.length;
      }
      this.token = localStorage.getItem('token');
      if (this.token == null) {
        this.isDisplayheader = true;
      } else {
        this.isDisplayheader = false;
      }
    });
  }

  Logout() {
    this.auth.clearToken();
    this.auth.isLoggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  cart() {

    this.router.navigate(['/user/cart']);
  }
  home() {

    this.router.navigate(['/user']);
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartservice.search.next(this.searchTerm);
  }
  historys() {
    this.router.navigate(['/user/history']);
  }
  profile(){
    this.router.navigate(['/user/profile']);
  }
  SingleUserProfileData() {
    this.UserProfile.UserProfileData().subscribe(
      res => {
        this.userProfiles = res;
        console.log(this.userProfiles)

      })

  }
}
