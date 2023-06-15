import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/services/products/product.service';
import { status } from '../../../../../services/Enum/status';
import { colors } from '../../../../../services/Enum/colors';
import { category } from '../../../../../services/Enum/category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  productsForm: any = FormGroup;
  submitted = false;
  status = status;
  colors = colors;
  category = category;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.productsForms();
  }
  productsForms() {
   
    this.productsForm = this.fb.group({
      proudctTitle: ['', [Validators.required, Validators.maxLength(55)]],
      productDesc: ['', [Validators.required, Validators.maxLength(300)]],
      productCategory: ['', [Validators.required]],
      productImages: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      unitPrice: ['', [Validators.required]],
      color: ['', [Validators.required]],
      //status: ['', [Validators.required]],
      totalQty: ['', [Validators.required]],
    });
  }

  get f() {
    return this.productsForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.productsForm.invalid) {
      return;
    }

    this.ProductService.addProduct(this.productsForm.value).subscribe(
      (product) => {
        this.toast.success({
          summary: product.message,
          detail: 'Product Added Successfully',
          duration: 2000,
        });
        this.router.navigate(['/admin/product/list']);
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }
  reset() {
    this.submitted = false;
    this.productsForm.reset();
    this.router.navigate(['/admin/product/list']);
  }
}
