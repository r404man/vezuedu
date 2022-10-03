import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Product from '../interfaces/Product';
import { Invoice } from '../interfaces/Invoice';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart?: Product[] = [];
  cartAmount = new BehaviorSubject<number>(0);
  cartProduct = new BehaviorSubject<Product[]>([]);
  cartPriceAmount = new BehaviorSubject<number>(1);
  apiUrl = '/api/orders';
  constructor(private http: HttpClient) {}

  getCartPriceAmount() {
    this.cartProduct.subscribe((data: Product[]) => {
      let sum = 0;
      data.map((item: Product) => {
        sum += Number(item.price);
      });
      this.cartPriceAmount.next(sum);
    });
    return this.cartPriceAmount.asObservable();
  }

  getCartAmount() {
    let cartAmount = JSON.parse(localStorage.getItem('cart')!).length;
    this.cartAmount.next(cartAmount);
    return this.cartAmount.asObservable();
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    this.cartProduct.next(this.cart!);
    return this.cartProduct.asObservable();
  }

  addToCart(product: Product) {
    let cart = localStorage.getItem('cart');
    if (cart !== null) {
      this.cart = JSON.parse(cart);
      this.cart?.push({
        ...product,
        amount: 1,
        startPrice: Number(product.price),
      });
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.cartAmount.next(this.cart?.length!);
    } else {
      this.cart?.push({
        ...product,
        amount: 1,
        startPrice: Number(product.price),
      });
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  removeFromCart(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart')!);
    cart = cart.filter((x: any) => x.id !== id);
    this.cart = cart;
    this.cartProduct.next(cart);
    this.cartAmount.next(this.cart?.length!);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addProductAmount(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart')!);
    cart.map((item: any) => {
      if (item.id === id) {
        item.amount += 1;
        item.price = item.startPrice! * item.amount;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartProduct.subscribe((data) => {
      data.map((prod) => {
        if (prod.id === id) {
          prod.amount += 1;
          prod.price = prod.startPrice! * prod.amount;
        }
      });
    });
  }

  removeProductAmount(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart')!);
    cart.map((item: any) => {
      if (item.id === id && item.amount !== 0) {
        item.amount -= 1;
        item.price = item.price - item.startPrice;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartProduct.subscribe((data) => {
      data.map((prod) => {
        if (prod.id === id && prod.amount !== 0) {
          prod.amount -= 1;
          prod.price = prod.price - prod.startPrice!;
        }
      });
    });
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

    // console.log(this.apiUrl, body);
    // const body = {
    //   order: {
    //     name: 'test-order',
    //     phone: 'test phone',
    //     address: 'some address',
    //     order_contents_attributes: [
    //       {
    //         product_id: 1,
    //         count: 10,
    //       },
    //       {
    //         product_id: 2,
    //         count: 20,
    //       },
    //     ],
    //   },
    // };
    return this.http.post<any>(this.apiUrl, body);
  }
}
