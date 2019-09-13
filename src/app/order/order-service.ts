import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";

@Injectable()
export class OrderService {
  constructor(private shoppingCartService: ShoppingCartService) {

  }

  cartItems(): CartItem[] {
    return this.shoppingCartService.items;
  }

  increaseQuantity(item: CartItem): void {
    this.shoppingCartService.increasequantity(item);
  }

  decreaseQuantity(item: CartItem): void {
    this.shoppingCartService.decreasequantity(item);
  }

  remove(item: CartItem): void {
    this.shoppingCartService.removeItem(item);
  }

}
