import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  invoiceNumber: number = 0;

  constructor() {}

  getInvoiceNumber() {
    this.invoiceNumber = JSON.parse(localStorage.getItem('invoiceNumber')!);
  }

  ngOnInit(): void {
    this.getInvoiceNumber();
  }
}
