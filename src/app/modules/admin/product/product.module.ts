import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminHeaderComponent } from '../../shared/components/admin-header/admin-header.component';
import { SharedModule } from '../../shared/shared.module';
AdminHeaderComponent;

@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    UpdateComponent,
    ListComponent,
    ManageOrdersComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SharedModule,
  ],
})
export class ProductModule {}
