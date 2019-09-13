import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-itens',
  templateUrl: './order-itens.component.html'
})
export class OrderItensComponent implements OnInit {

  @Input() items: CartItem[];

  @Output() increaseQuantity = new EventEmitter<CartItem>()
  @Output() decreaseQuantity = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }

  emitIncreaseQuantity(item: CartItem): void {
    console.log(item);
    this.increaseQuantity.emit(item);
  }

  emitDecreaseQuantity(item: CartItem): void {
    console.log(item);
    this.decreaseQuantity.emit(item);
  }

  emitRemove(item: CartItem): void {
    console.log(item);
    this.remove.emit(item);
  }

}
