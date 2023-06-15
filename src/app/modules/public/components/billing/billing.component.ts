import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/services/carts/cart.service';
import { CascadingService } from 'src/app/services/Cascading/cascading.service';
import { payment } from 'src/app/services/Enum/payment';
import { OrderService } from 'src/app/services/Orders/order.service';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  billingForm: any = FormGroup;
  submitted = false;
  public products: any = [];
  public productGst: any = [];
  public orders: any = [];
  public grandTotal!: number;
  public countries: any = {};
  public states: any = {};
  public cities: any = {};
  public zips: any = {};
  public selectedCounty: any = [];
  public selectedState: any = [];
  public selectedCity: any = [];
  public selectedZip: any = [];
  public statelist: any = [];
  public citylist: any = [];
  public ziplist: any = [];
  payment = payment;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private OrderService: OrderService,
    private cartService: CartService,
    private toast: NgToastService,
    private CascadingService: CascadingService
  ) {}

  ngOnInit(): void {
    this.formBilling();
    this.getCart();
    this.getCountries();
    this.getStates();
    this.getCities();
    this.getZipCodes();
  }
  
  formBilling() {
    this.billingForm = this.fb.group({
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      orderDetails: this.fb.group({
        quantity: [''],
        productid: [''],
      }),
    });
  }

  getCountries() {
    this.CascadingService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  getStates() {
    this.CascadingService.getStates().subscribe((state) => {
      this.states = state;
    });
  }

  getCities() {
    this.CascadingService.getCities().subscribe((city) => {
      this.cities = city;
    });
  }

  getZipCodes() {
    this.CascadingService.getZipCodes().subscribe((zip) => {
      this.zips = zip;
    });
  }

  onChangeCountry(event: any) {
    this.statelist = this.states.filter(
      (e: any) => e.countryId == event.target.value
    );
  }

  onChangeState(event: any) {
    this.citylist = this.cities.filter(
      (e: any) => e.stateId == event.target.value
    );
  }

  onChangeCity(event: any) {
    this.ziplist = this.zips.filter((e: any) => e.cityId == event.target.value);
  }
  getCart() {
    this.cartService.getProducts().subscribe((product) => {
      this.products = product;
      if (this.products.length > 0) {
        this.grandTotal = this.cartService.getSubTotal();
      } else {
        this.products = JSON.parse(localStorage.getItem('products')!);
        let GrandTotal = 0;
        this.products.map((a: any) => {
          GrandTotal = GrandTotal + a.unitPrice * a.quantity;
        });
        this.grandTotal = GrandTotal;
      }
      localStorage.setItem('checkout', JSON.stringify(this.products));
      localStorage.setItem('gTotal', this.grandTotal.toString());
    });
  }

  get f() {
    return this.billingForm.controls;
  }

  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.billingForm.invalid) {
      return;
    }

    var arr: any = [];
    this.products.forEach((x: any) => {
      var model = {
        quantity: x.quantity,
        productid: x.productId,
      };
      arr.push(model);
    });
    var tesst1 = this.billingForm.controls['address'].value;
    var tesst2 = this.billingForm.controls['state'].value;
    var tesst3 = this.billingForm.controls['postalCode'].value;
    var tesst4 = this.billingForm.controls['payment'].value;
    var tesst5 = this.billingForm.controls['country'].value;
    var tesst6 = this.billingForm.controls['city'].value;
    var model = {
      address: tesst1,
      country: tesst5,
      state: tesst2,
      city: tesst6,
      postalCode: tesst3,
      payment: tesst4,
      orderDetails: arr,
    };
    this.OrderService.addOrder(model).subscribe(
      (order) => {     
        this.cartService.removeAllCart();
        this.toast.success({
          summary: 'Success',
          detail: 'Order Placed',
          duration: 1000,
        });
      },
      (err) => {
        this.toast.error({
          summary: 'Error',
          detail: 'Something went wrong, Please try later!',
          duration: 600,
        });
      }
    );
    this.router.navigate(['/user/checkout']);
  }

  reset() {
    this.submitted = false;
    this.billingForm.reset();
  }
}
