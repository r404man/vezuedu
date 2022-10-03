import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartAmount?: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartAmount().subscribe((amount) => {
      console.log(amount);
      this.cartAmount = amount;
    });
  }
}
