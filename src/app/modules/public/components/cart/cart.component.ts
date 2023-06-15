import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/carts/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  arrays: any[] = [];
  names = [];
  paymentDetail: any;
  payment: any;
  isItem!: boolean;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      if (this.products.length > 0) {
        this.isItem = true;
        this.products = this.products.map((item: any) => ({
          ...item,
          showMore: false,
        }));        
        this.grandTotal = this.cartService.getSubTotal();
      } else {
        this.products = JSON.parse(localStorage.getItem('products')!);
        this.isItem = this.products ? true : false;
        let GrandTotal = 0;
        this.products.map((a: any) => {
          GrandTotal = GrandTotal + a.unitPrice * a.quantity;
        });
        this.grandTotal = GrandTotal;
      }
    });
  }

  AddToCart(xyz: any) {
    const index = this.arrays.find(() => {});
    this.cartService.addToCart(xyz);
  }

  minusToCart(xyz: any) {
    const index = this.arrays.find(() => {});
    this.cartService.decrementToCart(xyz);
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.isItem = this.products.length > 0 ? true: false;
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

  trimString(text: any, length: any) {
    return text?.length > length ? text?.substring(0, length) + '...' : text;
  }
}
