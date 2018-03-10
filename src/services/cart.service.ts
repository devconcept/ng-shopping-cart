import { CartItem } from '../classes/cart-item';
import { EventEmitter } from '@angular/core';

export abstract class CartService<T extends CartItem> {
  public onItemAdded: EventEmitter<T> = new EventEmitter<T>();
  public onItemRemoved: EventEmitter<T> = new EventEmitter<T>();
  public onItemsChanged: EventEmitter<number> = new EventEmitter<number>();

  public abstract getItem(id: any): T;

  public abstract getItems(): T[];

  public abstract addItem(item: T): void;

  public abstract removeItem(id: any): void;

  public abstract itemCount(): number;

  public abstract entries(): number;

  public abstract cost(): number;

  public abstract clear(): void;

  public abstract isEmpty(): boolean;

  public abstract getShipping(): number;

  public abstract setShipping(shipping: number): void;

  public abstract getTaxRate(): number;

  public abstract setTaxRate(tax: number): void;

  getTax(): number {
    return this.cost() / 100 * this.getTaxRate();
  }

  public totalCost(): number {
    return this.cost() + this.getTax() + this.getShipping();
  }
}
