import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  message: any;
  constructor(private confirmDialogService : ModalService) { }

  ngOnInit(): void {
    this.confirmDialogService.getMessage().subscribe((message) => {
      this.message = message;
      console.log("dbhbdbhcdhdcdch",this.message);
    });
  }

  confirm(isConfirmed:any) {
    this.message = '';
    if(isConfirmed) {
      this.confirmDialogService.confirmDelete();  
    }
  }
  
}
