import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { UpdateComponent } from './components/update/update.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'list', component: ListComponent },
      { path: 'update/:id', component: UpdateComponent },
      {path: 'manage-orders', component:ManageOrdersComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
