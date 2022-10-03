import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Product from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  product?: Observable<Product>;
  prod!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(Number(id));
    this.product.subscribe((data) => {
      this.prod = data;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.prod);
  }

  ngOnInit(): void {
    this.getProduct();
  }
}
