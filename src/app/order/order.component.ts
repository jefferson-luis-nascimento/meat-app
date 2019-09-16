import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order-service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  constructor(private orderservice: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  orderForm: FormGroup;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  delivery = 8;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Refeição', value: 'REF' }
  ];

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      const error = { emailsNotMatch: true };
      emailConfirmation.setErrors(error);
      return error;
    } else {
      emailConfirmation.setErrors(null);
    }
    return undefined;
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      adress: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAdress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required]),
    }, { validator: OrderComponent.equalsTo });
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
