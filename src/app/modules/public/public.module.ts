import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FilterPipe } from 'src/app/services/search/filter.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoryComponent } from './components/history/history.component';
import { BillingComponent } from './components/billing/billing.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../shared/shared.module';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    FilterPipe,
    HistoryComponent,
    BillingComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
    NgbModule,
    NgbToastModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SharedModule,
    NgxStarRatingModule
    
    
  ],
})
export class PublicModule {}
