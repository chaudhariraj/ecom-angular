import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/login']);
  }
  manageOrders(){
    this.router.navigate(['/admin/product/manage-orders']);
  }
  productList(){
    this.router.navigate(['/admin/product/list']);
  }
  createOrders(){
    this.router.navigate(['/admin/product/create']);
  }

}
