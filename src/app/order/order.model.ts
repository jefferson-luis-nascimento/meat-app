class Order {
  constructor(
    public id: number,
    public endereco: string,
    public number: number,
    public optionalAdress: string,
    public orderItems: OrderItem[] = []
  ) { }
}

class OrderItem {
  constructor(public quantity: number, public menuId: string) {}
}

export { Order, OrderItem };
