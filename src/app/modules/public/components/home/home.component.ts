import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { CartService } from 'src/app/services/carts/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  arrays: any[] = [];
  totalLength: any;
  public sortBy: string = '';
  public sortByOption: string = '';
  searchKey: string = '';
  isAdding = true;
  remainingQty = true;
  status = 'Active';
  public profilePhoto !: string;
  public searchText: string = '';
  page: number = 1;
  count: any;
  pagesize : number= 8;
  view : 'grid' | 'list' ='grid';

  public selectedSort: any = [];
  constructor(
    private api: ProductService,
    private router: Router,
    private cartService: CartService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
  this.getproduct();
  }

getproduct(){
  this.profilePhoto =  localStorage.getItem('profilePhoto')!;
  this.sortByOption = 'product_name';
  this.api.getProducts(this.page,this.pagesize).subscribe((product : any) => {
    this.totalLength = product.count;
    this.productList = product.items;
    this.filterCategory = product.items;
    this.productList.forEach((a: any) => {  
      Object.assign(a, { quantity: 1, total: a.price });
    });
  });
  this.cartService.search.subscribe((val: any) => {
    this.searchKey = val;
  });
}

  onChangeSort(e: any) {
    if (e.target.value === 'product_pricelth') {
      this.filterCategory = this.filterCategory.sort(function (a: any, b: any) {
        return a.unitPrice - b.unitPrice;
      });
    } else {
      this.filterCategory = this.filterCategory.sort(function (a: any, b: any) {
        return b.unitPrice - a.unitPrice;
      });
    }
  }
  AddToCart(xyz: any) {   
    const index = this.arrays.find((data: any) => {});   
    this.cartService.addToCart(xyz);
    this.toast.success({
      summary: 'Added',
      detail: 'Added to Cart',
      duration: 600,
    });
    this.router.navigate(['/user/cart']);
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.productCategory == category || category == '') {
        return a;
      }
    });
  }
  
  goToLink(url: string){
    window.open(url, "_blank");
}

onPageChange(event: any){
  debugger;
  this.page = event;
  this.getproduct();
}
onTableSizeChange(event: any): void {
  this.pagesize = event.target.value;
  this.page = event;
  this.getproduct();
}
}
