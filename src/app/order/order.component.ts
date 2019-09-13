import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order-service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Refeição', value: 'REF' }
  ];

  constructor(private orderservice: OrderService) { }

  ngOnInit() {
  }

  cartItems(): CartItem[] {
    return this.orderservice.cartItems();
  }

  increaseQuantity(item: CartItem): void {
    this.orderservice.increaseQuantity(item);
  }


  decreaseQuantity(item: CartItem): void {
    this.orderservice.decreaseQuantity(item);
  }

  remove(item: CartItem): void {
    this.orderservice.remove(item);
  }
}
