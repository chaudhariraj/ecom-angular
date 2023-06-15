import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor(private router: Router,  private toast: NgToastService) {}
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    let update = true;
    if (localStorage.getItem('token')?.length != null) {   
      if (this.cartItemList.length > 0) {       
        this.cartItemList.forEach((a: any) => {
          if (a.productId === product.productId) {
            a.quantity++;
            update = false;
          }

          if (a.quantity === a.remainingQty) {
            this.toast.warning({
              summary: a.remainingQty, 
              detail:`Qty remaining for this item`,
              duration: 2000,
            });
          }         
        });
      }else{
        this.cartItemList = JSON.parse(localStorage.getItem("products")!)
      }

      if (update) {
        this.cartItemList = this.cartItemList || []
        this.cartItemList.push(product);
      }
      localStorage.setItem("products",JSON.stringify(this.cartItemList));
      this.productList.next(this.cartItemList);
      
      this.getSubTotal();
    } else {
      this.router.navigate(['/login']);
    }
  }

  decrementToCart(product: any) {
    if (localStorage.getItem('token')?.length != null) {
      let update = true;
      if (this.cartItemList) {
        // debugger;
        this.cartItemList.forEach((a: any) => {
          if (a.quantity === 1) {
            return;
          }
          if (a.productId === product.productId) {
            a.quantity--;
            update = false;
          }
        });
      }
      
      this.productList.next(this.cartItemList);
      this.getSubTotal();
      
      
    } else {
      this.router.navigate(['/login']);
    }
  }

  getSubTotal(): number {
    let GrandTotal = 0;
    this.cartItemList.map((a: any) => {
      GrandTotal = GrandTotal + a.unitPrice * a.quantity;
    
    });
    localStorage.setItem("GrandTotal",JSON.stringify(GrandTotal));
    return Number(localStorage.getItem("GrandTotal")!);  
  }

  getTotal(): number {
    let GrandTotal = 0;
    let totalPrice =0
      for(let i=0; i < this.cartItemList.length; i++){
        GrandTotal = GrandTotal + this.cartItemList[i].unitPrice * this.cartItemList[i].quantity;
        if(this.cartItemList[i].productCategory === 'Toys' ){
          totalPrice= GrandTotal+(GrandTotal*0.14);
        }else if(this.cartItemList[i].productCategory === 'Fashion'){
          totalPrice= GrandTotal+(GrandTotal*0.12);
        }else if(this.cartItemList[i].productCategory === 'Electronics'){
          totalPrice= GrandTotal+(GrandTotal*0.18);
        }else{
          totalPrice = 0;
        }
      }
    return totalPrice;
  }

  getCat(): number {
   let GstCat =0;
   let GstCost =0;
    this.cartItemList.map((a: any) => { 
      if(a.productCategory == 'Toys'){
        GstCat= 7;
      }else if(a.productCategory == 'Fashion'){
        GstCat= 6;
      }else{
        GstCat= 9;
      }    
    });
    return GstCat;
  }



  removeCartItem(product: any) {
    if(this.cartItemList.length === 0){
      this.cartItemList = JSON.parse(localStorage.getItem("products")!);
    }
    if(this.cartItemList){
      this.cartItemList.map((a: any, index: any) => {
        if (product.productId === a.productId) {
          this.cartItemList.splice(index, 1);
          this.productList.next(this.cartItemList)
          localStorage.setItem("products",JSON.stringify(this.cartItemList));
        }
      });
    }
    localStorage.setItem("products",JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
    
  }

  removeAllCart() {
     this.cartItemList = [];
     localStorage.setItem("products",JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
    
  }
}
