import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  invoiceNumber$!: Observable<number>;

  constructor(private invoiceService: InvoiceService) {}

  getInvoiceNumber() {
    this.invoiceNumber$ = this.invoiceService.getInvoiceNumber();
  }

  ngOnInit(): void {
    this.getInvoiceNumber();
  }
}
