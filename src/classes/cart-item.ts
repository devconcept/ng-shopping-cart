export class CartItem {
  constructor(public id = 0,
              public name = '',
              public price = 0,
              public quantity = 1,
              public data = {}) {

  }

  total() {
    return this.price * this.quantity;
  }
}
