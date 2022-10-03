import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Product from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  // products: Product[] = Products;
  products$!: Observable<Product[]>;
  constructor(private productService: ProductService) {}

  getProducts() {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
