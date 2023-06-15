import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/carts/cart.service';
import jspdf, { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthenticationService } from 'src/app/services/Auth-Service/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  public products: any = [];
  public productGST: any = [];
  public grandTotal!: number;
  public temp!: number;
  public grandTotalGst!: number;
  public showgst!: number;
  public companyDetails: any = {};
  public customerDetails: any = {};
  public checkOutFlag: any = {};
  public invoiceDate: any = new Date();
  public invoiceNo: any = Math.floor(Math.random() * 10000);
  public dateTime: any = new Date();
  public fullName !: string;

  public storageName: string = 'cartinfo';

  constructor(
    private router: Router,
    private cartService: CartService,
    public auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getBill();
    this.getBillGSt();
    this.fullName =  localStorage.getItem('fullName')!;
    
  }
  print() {
    let temp = {};
    localStorage.setItem(this.storageName, JSON.stringify(temp));
    window.print();
  }

  getBill() {
    this.products = JSON.parse(localStorage.getItem('checkout')!);
    this.grandTotal = Number(localStorage.getItem('gTotal'));
  }

  getBillGSt() {
    this.grandTotalGst = this.cartService.getTotal();
    var a = localStorage.getItem('token');
    this.showgst = this.cartService.getCat();
  }

  newOrder() {
    this.router.navigate(['/user']);
  }

  makePDF() {
    const doc = new jsPDF();
    let data = document.getElementById('content');
    this.generatePDF(data);
  }

  generatePDF(htmlContent: any) {
    html2canvas(htmlContent).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('l', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Invoice.pdf');
    });
  }
}
