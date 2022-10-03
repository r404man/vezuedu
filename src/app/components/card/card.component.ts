import { Component, Input, OnInit } from '@angular/core';
import Product from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() product?: Product;

  constructor(private CartService: CartService) {}

  addToCart(product: Product) {
    this.CartService.getCartAmount();
    this.CartService.addToCart(product);
  }

  ngOnInit(): void {}
}
