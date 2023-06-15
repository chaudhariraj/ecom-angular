import { AuthGuard } from './../../services/Guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { PublicComponent } from './public.component';
import { HistoryComponent } from './components/history/history.component';
import { BillingComponent } from './components/billing/billing.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'billing',
        component: BillingComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  // { path: 'register', component: RegisterComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
