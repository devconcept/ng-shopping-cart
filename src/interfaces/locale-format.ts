/**
 * The format used to display currencies as an object equivalent to the `CurrencyPipe` arguments.
 */
export interface LocaleFormat {
  /**
   * The currency code used to display values.
   */
  currencyCode?: string;
  /**
   * Specifies how to display the currency symbol.
   */
  display?: string;
  /**
   * How to display numbers. Equivalent to the `DecimalPipe`.
   */
  digitsInfo?: string;
  /**
   * The locale to override the global locale of your app.
   */
  locale?: string;
}
