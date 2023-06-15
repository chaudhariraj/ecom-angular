import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/services/products/product.service';
import { status } from '../../../../../services/Enum/status';
import { colors } from '../../../../../services/Enum/colors';
import { category } from '../../../../../services/Enum/category';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  productsForm: any = FormGroup;
  product_data: any = [];
  status = status;
  colors = colors;
  category = category;
  url_id!: any;
  submitted = false;
  totalQty: any;
  remainingQty: any;
  val1: any;
  val2: any;
  page = 1;
  pagesize = 10;
  productList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private ProductService: ProductService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      productId: [''],
      proudctTitle: ['', [Validators.required]],
      productDesc: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      productImages: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      unitPrice: ['', [Validators.required, Validators.maxLength(6)]],
      color: ['', [Validators.required]],
     // status: ['', [Validators.required]],
      totalQty: ['', [Validators.required,Validators.maxLength(5)]],
      remainingQty: ['', [Validators.required, Validators.maxLength(5)]]
    });

   this.ProductService.getProduct(this.page, this.pagesize).subscribe((get_product_data) => {
    
    this.product_data = get_product_data.count;
    this.productList = get_product_data.items;

      for (let i = 0; i < this.productList.length; i++) {

        if (this.url_id == this.productList[i].productId) {
          this.productsForm.controls['productId'].patchValue(
            this.productList[i].productId
          );

          this.productsForm.controls['proudctTitle'].patchValue(
            this.productList[i].proudctTitle
          );

          this.productsForm.controls['productDesc'].patchValue(
            this.productList[i].productDesc
          );
          this.productsForm.controls['productCategory'].patchValue(
            this.productList[i].productCategory
          );
          this.productsForm.controls['productImages'].patchValue(
            this.productList[i].productImages
          );
          this.productsForm.controls['unitPrice'].patchValue(
            this.productList[i].unitPrice
          );
          this.productsForm.controls['color'].patchValue(
            this.productList[i].color
          );
          // this.productsForm.controls['status'].patchValue(
          //   this.productList[i].status
          // );
          this.productsForm.controls['totalQty'].patchValue(
            this.productList[i].totalQty
          );
          this.productsForm.controls['remainingQty'].patchValue(
            this.productList[i].remainingQty
          );
        }
      }
    });
    this.url_id = this.activatedroute.snapshot.paramMap.get('id');
  }

  get f() {
    return this.productsForm.controls;
  }
  Reset() {
    this.submitted = false;
    this.productsForm.reset();
    this.router.navigate(['/admin/product/list']);
  }

    checkValidBalance(e: any){
      if(this.val2 > this.productsForm.value.totalQty) {
        this.val2 = null
      }
    }


  onSubmit() {
    this.submitted = true;
    if (this.productsForm.invalid) {
      return;
    }
    this.ProductService.updateProduct(this.productsForm.value).subscribe(
      (UpdateProduct) => {
        console.log(UpdateProduct);
        this.toast.success({
          summary: UpdateProduct.message,
          detail: 'Product Updated Successfully',
          duration: 2000,
        });
        this.router.navigate(['/admin/product/list']);
      },
      (err) => {
        this.toast.success({
          summary: 'Error',
          detail: 'Something Went Wrong',
          duration: 2000,
        });
      }
    );
  }
}
