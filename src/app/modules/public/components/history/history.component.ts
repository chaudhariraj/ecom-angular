import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderComponent } from 'src/app/modules/shared/components/loader/loader.component';
import { CartService } from 'src/app/services/carts/cart.service';
import { OrderService } from 'src/app/services/Orders/order.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {


  public productList: any;
  public filterCategory : any;
  searchKey:string ="";
  currentRate= 0;
  public ratingList: any = [];
  public form: FormGroup;

  title = 'Star Rating';  
starList: boolean[] = [true,true,true,true,true]
  constructor(private api: OrderService, private cartService: CartService, private fb: FormBuilder) { this.form = this.fb.group({
    rating1: ['', Validators.required],
   
  }); }

  ngOnInit(): void {
    this.UserHistory();
    this.cartService.search.subscribe(val=>{
      this.searchKey = val;   
    })
   
  }
  checkOrderStatus(orderStatus:number){
    if(orderStatus=== 1){ return "Pending"}else if (orderStatus=== 2){ return "Rejected"}else{ return "Accepted"}
  }
UserHistory(){
  this.api.getOrders().subscribe((history) =>{
    this.productList = history;
    this.productList = this.productList.map((item: any) => ({
      ...item,
      showMore: false,
    }));
    this.filterCategory = this.productList;
  })
}
Rating(rating:any){  
  this.api.addStarRating(rating).subscribe((ratingStar) => {
    this.ratingList = ratingStar;
    console.log(this.ratingList);
  })
}

trimString(text: any, length: any) {
  return text?.length > length ? text?.substring(0, length) + '...' : text;
}
filter() {
  this.filterCategory = this.productList.filter((a: any) => {
      return a;
  });
}

}
