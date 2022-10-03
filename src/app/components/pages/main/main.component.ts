import { Component, OnInit } from '@angular/core';
import Product from 'src/app/interfaces/Product';
import Products from 'src/app/mockData/mock';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  products: Product[] = Products;

  constructor() {}

  ngOnInit(): void {}
}
