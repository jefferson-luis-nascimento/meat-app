import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from "../app.api";

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService,
    private http: HttpClient) {

  }

  itemsValue(): number {
    return this.cartService.total();
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.increasequantity(item);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreasequantity(item);
  }

  remove(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  checkOrder(order: Order): Observable<Order> {
    console.log(JSON.stringify(order));

    return this.http.post<Order>(`${MEAT_API}/orders`, JSON.stringify(order), { headers: this.headers});
  }

  clear(): void {
    this.cartService.clear();
  }

}
