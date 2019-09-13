import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

export class ShoppingCartService {
  items: CartItem[] = [];

  clear(): void {
    this.items = [];
  }

  addItem(item: MenuItem): void {
    const foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

    if (foundItem) {
      this.increasequantity(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
  }

  increasequantity(item: CartItem): void {
    item.quantity = item.quantity + 1;
  }

  decreasequantity(item: CartItem): void {
    item.quantity = item.quantity - 1;

    if (item.quantity == 0)
      this.removeItem(item);

  }

  removeItem(item: CartItem): void {
    this.items.splice(this.items.indexOf(item), 1);
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }
}
