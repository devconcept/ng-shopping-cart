import {EventEmitter} from '@angular/core';

import {CartItem} from '../classes/cart-item';
import {CartChangeEvent} from '../interfaces/cart-change-event';
import {parseLocaleFormat} from '../locales';
import {LocaleFormat} from '../interfaces/locale-format';

/**
 * The base class for storing items in your cart
 *
 * @service
 * @note {warning} Do not modify the items `id` after they are added to the cart. Doing so could result in duplicates which can cause
 * undefined behaviour
 * @order 1
 */
export abstract class CartService<T extends CartItem> {
  private localeFormat: LocaleFormat = parseLocaleFormat('auto');
  private format = 'auto';
  /**
   * Emits an event every time items, tax, shipping cost or currency formats are changed in the cart.
   */
  public onChange: EventEmitter<CartChangeEvent> = new EventEmitter<CartChangeEvent>();
  /**
   * Emits an event every time an item is added to the cart.
   */
  public onItemAdded: EventEmitter<T> = new EventEmitter<T>();
  /**
   * Emits an event every time an item is removed from the cart.
   *
   * > This event only fires when a single item is removed by id. If you want to be notified of any removal (eg: clearing the cart) listen
   * to the `onChange` or the `onItemsChanged` event instead.
   */
  public onItemRemoved: EventEmitter<T> = new EventEmitter<T>();
  /**
   * Emits an event every time an item is added or removed from the cart.
   */
  public onItemsChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Emits an event every time taxes for the cart are changed.
   */
  public onTaxChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Emits an event every time shipping costs for the cart are changed.
   */
  public onShippingChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Finds an item by id
   */
  public abstract getItem(id: any): T;

  /**
   * Gets all the items in the cart.
   */
  public abstract getItems(): T[];

  /**
   * Add a new item to the cart.
   */
  public abstract addItem(item: T): void;

  /**
   * Remove an item from the cart by id.
   */
  public abstract removeItem(id: any): void;

  /**
   * Returns the number of unique items in the cart.
   */
  public abstract itemCount(): number;

  /**
   * Returns the number of items including each item's quantity.
   */
  public abstract entries(): number;

  /**
   * Returns the total cost of the shopping cart without shipping and taxes.
   */
  public abstract cost(): number;

  /**
   * Removes all items from the cart.
   */
  public abstract clear(): void;

  /**
   * Returns if the carts has any items in it.
   */
  public abstract isEmpty(): boolean;

  /**
   * Returns the shipping cost of the shopping cart.
   */
  public abstract getShipping(): number;

  /**
   * Sets the shipping cost of the shopping cart.
   */
  public abstract setShipping(shipping: number): void;

  /**
   * Returns the tax rate of the shopping cart.
   */
  public abstract getTaxRate(): number;

  /**
   * Sets the tax rate of the shopping cart.
   */
  public abstract setTaxRate(tax: number): void;

  /**
   * Returns the tax computation of the shopping cart.
   */
  public getTax(): number {
    return this.cost() * (this.getTaxRate() / 100);
  }

  /**
   * Returns the total cost of the shopping cart including shipping and taxes.
   */
  public totalCost(): number {
    return this.cost() + this.getTax() + this.getShipping();
  }

  /**
   * Changes the currency symbol and number format for all components associated to this service instance.
   *
   * Check the Angular `CurrencyPipe` and the Internationalization guide for more info.
   */
  public setLocaleFormat(format: string) {
    this.localeFormat = parseLocaleFormat(format);
    this.format = format;
    this.onChange.emit({change: 'format', value: this.format});
  }

  /**
   * Returns the currency format as set with `setCurrencyFormat` or `'auto'` if no value is set.
   */
  public getLocaleFormat(object: boolean = false): string | LocaleFormat {
    return object ? this.localeFormat : this.format;
  }

  /**
   * Returns an object with all the cart information in it, useful for serialization of the cart.
   */
  public toObject(): any {
    return {
      taxRate: this.getTaxRate(),
      shipping: this.getShipping(),
      items: this.getItems()
    };
  }
}
