import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Product from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products?: Observable<Product[]>;
  priceAmount?: Observable<number>;

  constructor(private cartService: CartService) {}

  getPriceAmount() {
    this.priceAmount = this.cartService.getCartPriceAmount();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  addProductAmount(id: number) {
    this.cartService.addProductAmount(id);
    this.getPriceAmount();
  }

  removeProductAmount(id: number) {
    this.cartService.removeProductAmount(id);
    this.getPriceAmount();
  }

  ngOnInit(): void {
    this.products = this.cartService.getCart();
    this.getPriceAmount();
    this.products.subscribe((data) => {
      // consle.log(data);
    });
  }
}
