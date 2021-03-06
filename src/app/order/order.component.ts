import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order-service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  orderId: number;
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
    this.orderForm = new FormGroup({
      name: new FormControl('',
        {
          validators: [Validators.required, Validators.minLength(5)]
        }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      adress: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAdress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required]),
    }, { validators: [OrderComponent.equalsTo], updateOn: 'blur' });

    console.log(this.loginService.user)
    console.log(this.loginService.isLoggedIn())

    if (this.loginService.isLoggedIn()) {

      this.orderForm.value.name = this.loginService.user.name;
      this.orderForm.value.email = this.loginService.user.email;
      this.orderForm.value.emailConfirmation = this.loginService.user.name;
    }
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
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
        order => {
          this.orderId = order.id;
          this.router.navigate(['/order-summary']);
          this.orderservice.clear();
        },
        err => {
          console.log(err.message);
        }
      );
  }
}
