import { CartItem } from '../classes/cart-item';
import { EventEmitter } from '@angular/core';

export abstract class CartService {
  public onItemAdded: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  public onItemRemoved: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  public onItemsChanged: EventEmitter<number> = new EventEmitter<number>();

  public abstract getItem(id: any): CartItem;

  public abstract getItems(): CartItem[];

  public abstract addItem(id: any, name: string, price: number, quantity: number, data: any): CartItem;

  public abstract removeItem(id: any): void;

  public abstract itemCount(): number;

  public abstract cost(): number;

  public abstract clear(): void;

  public abstract getShipping(): number;

  public abstract setShipping(shipping: number): void;

  public abstract getTax(): number;

  public abstract setTax(tax: number): void;

  public abstract isEmpty(): boolean;

  public totalCost(): number {
    return this.cost() + this.getTax() + this.getShipping();
  }
}
