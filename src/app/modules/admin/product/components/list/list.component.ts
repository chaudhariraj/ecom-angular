import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoaderComponent } from 'src/app/modules/shared/components/loader/loader.component';
import { CartService } from 'src/app/services/carts/cart.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  show = false;
  products: any = [{}];
  DeleteProduct: any = [];
  selectedID: any;
  public grandTotal!: number;
  filterTerm!: string;
  public searchText: string = ''; 
  page = 1;
  count: any;
  pagesize = 8;
  productList: any;

  constructor(
    private ProductService: ProductService,
    private cartService: CartService,
    private confirmDialogService: ModalService,
    private router: Router,
    private toast: NgToastService
  ) {
    this.confirmDialogService.getConfirmMessage().subscribe((message) => {
      this.removeProduct(this.selectedID);
    });
  }

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){
    this.ProductService.getProduct(this.page, this.pagesize).subscribe((product) => {
      this.products = product.count;
      this.productList = product.items;
      this.productList = this.productList.map((item: any) => ({
        ...item,
        showMore: false,
      }));
    });
  }

  checkDelete(id: any) {
    this.selectedID = id;
    this.confirmDialogService.confirmThis('Are you sure to delete?');
  }

  removeProduct(ProductId: any) {
    this.ProductService.deleteProduct(ProductId.productId).subscribe(
      (trash) => {
        window.location.reload();
        this.toast.success({
          summary: trash.message,
          detail: 'Product Deleted Successfully',
          duration: 2000,
        });
      }
    );
  }

  editProduct(productId: number) {
    this.router.navigate([`admin/product/update/${productId}`]);
  }

  trimString(text: any, length: any) {
    return text?.length > length ? text?.substring(0, length) + '...' : text;
  }

  Create() {
    this.router.navigate(['/admin/product/create']);
  }
  onPageChange(event: any){
    debugger;
    this.page = event;
  this.getProducts()
  }
  onTableSizeChange(event: any): void {
    this.pagesize = event.target.value;
    this.page = event;
    this.getProducts()
  }
}
