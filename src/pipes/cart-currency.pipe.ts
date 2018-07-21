import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {parseLocaleFormat} from '../locales';

/**
 * A pipe that wraps the `CurrencyPipe` to set currency value display using a string rather than several arguments for easy configuration.
 *
 * @summary
 * It takes a string as a single parameter in the format `'currencyCode:symbol:digitsInfo:locale'`. You can also use the special
 * value `'auto'` which will set the default used by Angular in that specific configuration.
 *
 * Every configuration is optional and not using any arguments or an argument of `'auto'`is equivalent to how the `CurrencyPipe` works by
 * default. If no locale is specified uses the current locale to format numbers.
 *
 * @note {info} A value of `'auto:auto:auto:auto'` is equivalent to simply using `'auto'`.
 *
 * @note {danger} In Angular versions lower than 6 the `CurrencyPipe` does not change the currency symbol if you don't specify a different
 * `currencyCode`
 *
 * @howToUse "With a different currency symbol"
 * ```html
 * <span>
 *   {{ value | cartCurrency:format }}
 * </span>
 * ```
 * ```typescript
 * export class MyComponent {
 *   value = 10;
 *   format = 'EUR';
 * }
 * ```
 *
 * @howToUse "With a five digits after the decimal point"
 * ```html
 * <span>
 *   {{ value | cartCurrency:format }}
 * </span>
 * ```
 * ```typescript
 * export class MyComponent {
 *   value = 10.56;
 *   format = 'auto:auto:1.5-5';
 * }
 * ```
 *
 * @howToUse "With a different locale"
 * ```html
 * <span>
 *   {{ value | cartCurrency:format }}
 * </span>
 * ```
 * ```typescript
 * export class MyComponent {
 *   value = 10;
 *   format = 'auto:auto:auto:en-GB';
 * }
 * ```
 */
@Pipe({name: 'cartCurrency'})
export class CartCurrencyPipe implements PipeTransform {
  private currencyFormatter;

  constructor(@Inject(LOCALE_ID) private _locale: string) {
    this.currencyFormatter = new CurrencyPipe(this._locale);
  }

  transform(value: any, format: string = 'auto') {
    if (!value && value !== 0) {
      return null;
    }
    const {currencyCode, display, digitsInfo, locale} = parseLocaleFormat(format);
    return this.currencyFormatter.transform(value, currencyCode, display, digitsInfo, locale);
  }
}
