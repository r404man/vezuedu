import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Product from 'src/app/interfaces/Product';
import User from 'src/app/interfaces/User';
import { CallbackService } from 'src/app/services/callback.service';
import { CartService } from 'src/app/services/cart.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  products$?: Observable<Product[]>;
  products!: Product[];
  priceAmount$?: Observable<number>;
  price!: number;
  user?: User;
  invoice!: any;

  constructor(
    private cartService: CartService,
    private formService: CallbackService,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  getPrice() {
    this.priceAmount$ = this.cartService.getCartPriceAmount();
    this.priceAmount$?.subscribe((price: number) => {
      this.price = price;
    });
  }
  getCart() {
    this.products$ = this.cartService.getCart();
    this.products$.subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getUser() {
    this.user = this.formService.getUser();
    // console.log(this.user);
  }

  changeData() {
    this.router.navigateByUrl('/cart');
  }

  sendInvoice() {
    this.invoice = {
      ...this.user,
      price: this.price,
      cart: this.products,
    };

    this.invoiceService.sendInvoice(this.invoice).subscribe({
      next: ({ status, id }) => {
        this.invoiceService.setInvoiceNumber(id);
        this.cartService.clearCart();
        this.router.navigateByUrl('/success');
      },
      error: (error) => {
        this.router.navigateByUrl('/');
      },
    });
  }

  ngOnInit(): void {
    this.getCart();
    this.getPrice();
    this.getUser();
  }
}
