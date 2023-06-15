import { Component, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LoaderComponent } from 'src/app/modules/shared/components/loader/loader.component';
import { OrderService } from 'src/app/services/Orders/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
})
export class ManageOrdersComponent implements OnInit {
  products: any = [{}];
  public Order: any = [{}];
  DeleteProduct: any = [];
  selectedID: any;
  public grandTotal!: number;
  filterTerm!: string;

  constructor(
    private OrderService: OrderService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.managerOrders('Pending');   
  }

  managerOrders(status: any) {
    this.OrderService.getManageOrders(status).subscribe((orders) => {
      this.Order = orders;
      this.Order = this.Order.map((item: any) => ({
        ...item,
        showMore: false,
      }));
    });
  }

  checkOrderStatus(orderStatus:number){
    if(orderStatus=== 1){ return "Pending"}else if (orderStatus=== 2){ return "Rejected"}else{ return "Accepted"}
  }

  orderStatusList(status: any) {
    this.managerOrders(status);
  }
  changeOrderStatus(
    status: any,
    orderId: number,
    quantity: number,
    productId: number
  ) {
    this.OrderService.updateOrderStatus(
      status,
      orderId,
      quantity,
      productId
    ).subscribe((res) => {
      console.log(res);
      
      this.managerOrders(status);
      window.location.reload();
      this.toast.success({
        summary: res.message,
        detail: 'Updated Successfully',
        duration: 2000,
      });
    });
  }
  trimString(text: any, length: any) {
    return text?.length > length ? text?.substring(0, length) + '...' : text;
  }

  
  
}
