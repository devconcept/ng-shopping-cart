import { CartItem } from './cart-item';
import { EventEmitter } from '@angular/core';

/**
 * The base class for storing items in your cart
 */
export abstract class CartService<T extends CartItem> {
  /**
   * Emits an event every time an item is added to the cart
   * @type {CartItem}
   */
  public onItemAdded: EventEmitter<T> = new EventEmitter<T>();
  /**
   * Emits an event every time an item is removed from the cart
   * @type {CartItem}
   */
  public onItemRemoved: EventEmitter<T> = new EventEmitter<T>();
  /**
   * Emits an event every time an item is added or removed from the cart
   * @type {number}
   */
  public onItemsChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Finds an item by id
   */
  public abstract getItem(id: any): T;

  /**
   * Gets all the items in the cart
   */
  public abstract getItems(): T[];

  /**
   * Add a new item to the cart
   */
  public abstract addItem(item: T): void;

  /**
   * Remove an item from the cart by id
   */
  public abstract removeItem(id: any): void;

  /**
   * Returns the number of unique items in the cart
   */
  public abstract itemCount(): number;

  /**
   * Returns the number of item including each item's quantity
   */
  public abstract entries(): number;

  /**
   * Returns the total cost of the shopping cart without including shipping and taxes
   */
  public abstract cost(): number;

  /**
   * Removes all items from the cart
   */
  public abstract clear(): void;

  /**
   * Returns if the carts has any items in it
   */
  public abstract isEmpty(): boolean;

  /**
   * Returns the shipping cost of the shopping cart
   */
  public abstract getShipping(): number;

  /**
   * Sets the shipping cost of the shopping cart
   */
  public abstract setShipping(shipping: number): void;

  /**
   * Returns the tax rate of the shopping cart
   */
  public abstract getTaxRate(): number;

  /**
   * Sets the tax rate of the shopping cart
   */
  public abstract setTaxRate(tax: number): void;

  /**
   * Returns the tax computation of the shopping cart
   */
  public getTax(): number {
    return this.cost() / 100 * this.getTaxRate();
  }

  /**
   * Returns the total cost of the shopping cart including shipping and taxes
   */
  public totalCost(): number {
    return this.cost() + this.getTax() + this.getShipping();
  }

  /**
   * Returns an object with all the cart information in it
   * Useful for serialization of the cart
   */
  public toObject() {
    return {
      taxRate: this.getTaxRate(),
      shipping: this.getShipping(),
      items: this.getItems()
    };
  }
}
