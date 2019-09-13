import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order-service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Refeição', value: 'REF' }
  ];

  constructor(private orderservice: OrderService,
              private router: Router) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderservice.itemsValue();
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

  checkOrder(order: Order): void {
    order.orderItems = this.cartItems()
      .map((itemCartItem) => new OrderItem(itemCartItem.quantity, itemCartItem.menuItem.id));

    this.orderservice.checkOrder(order)
      .subscribe(
        orderId => {
          this.router.navigate(['/order-summary']);
          this.orderservice.clear();
        },
        err => {
          console.log(err.message);
        }
      );
    
  }
}
