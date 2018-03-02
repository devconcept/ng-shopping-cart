export class CartItem {
  public id: any;
  public name: string;
  public price: number;
  public quantity: number;
  public image: string;
  public data: any;

  constructor(id = 0, name = '', price = 0, quantity = 1, image = '', data = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.data = data;
  }

  total() {
    return this.price * this.quantity;
  }

}
