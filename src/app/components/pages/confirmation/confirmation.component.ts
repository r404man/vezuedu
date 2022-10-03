import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/interfaces/Invoice';
import Product from 'src/app/interfaces/Product';
import User from 'src/app/interfaces/User';
import { CallbackService } from 'src/app/services/callback.service';
import { CartService } from 'src/app/services/cart.service';

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
    private router: Router
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
  }

  sendInvoice() {
    let num = Math.round(Math.random() * 1000);
    localStorage.setItem('invoiceNumber', JSON.stringify(num));
    this.invoice = {
      number: num,
      ...this.user,
      price: this.price,
      cart: this.products,
    };
    this.cartService.sendInvoice(this.invoice).subscribe({
      next: (data) => {
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
