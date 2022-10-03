import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../interfaces/Invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  invoiceNumber = new BehaviorSubject<number>(1);
  // apiUrl = '/api/orders';
  apiUrl = 'http://vezuedu.dev.writex.ru/api/orders';
  constructor(private http: HttpClient) {}

  setInvoiceNumber(id: number) {
    this.invoiceNumber.next(id);
  }

  getInvoiceNumber() {
    return this.invoiceNumber.asObservable();
  }

  sendInvoice(invoice: Invoice) {
    let product = invoice.cart.map((prod) => ({
      product_id: prod.id,
      count: prod.amount,
    }));

    const body = {
      order: {
        name: invoice.name,
        phone: invoice.phone,
        adress: invoice.adress,
        order_content_attributes: [...product],
      },
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
