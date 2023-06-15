import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { LoaderComponent } from './components/loader/loader.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SharedComponent,
    ModalComponent,
    LoaderComponent,
    PublicHeaderComponent,
    AdminHeaderComponent,
    
  ],
  imports: [CommonModule, NgbToastModule, FormsModule,],
  exports: [
    ModalComponent,
    AdminHeaderComponent,
    PublicHeaderComponent,
    FormsModule,
    LoaderComponent    
  ],
  providers: [ModalService],
})
export class SharedModule {}
