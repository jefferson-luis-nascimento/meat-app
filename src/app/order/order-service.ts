import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { MEAT_API } from "../app.api";
import { LoginService } from '../security/login/login.service';

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService,
    private http: HttpClient) {

  }

  itemsValue(): number {
    return this.cartService.total();
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
    return this.http.post<Order>(`${MEAT_API}/orders`, order);
  }

  clear(): void {
    this.cartService.clear();
  }

}
