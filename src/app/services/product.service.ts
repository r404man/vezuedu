import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Product from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = '/api/products/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductById(id: number) {
    return this.http.get<Product>(this.apiUrl + `/${id}`);
  }
}
