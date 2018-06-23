import {CartCurrencyPipe} from './cart-currency.pipe';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';

describe('CartCurrencyPipe', () => {
  registerLocaleData(localeFr);

  const pipe = new CartCurrencyPipe('en-US');

  it('should transform a number value with the default currency', () => {
    expect(pipe.transform(10)).toBe('$10.00');
  });

  it('should transform the value 0', () => {
    expect(pipe.transform(0)).toBe('$0.00');
  });

  it('should not transform empty values', () => {
    expect(pipe.transform('')).toBe(null);
  });

  it('should change the default currency symbol', () => {
    expect(pipe.transform(10, '€')).toBe('€10.00');
  });

  it('should change the default symbol display', () => {
    expect(pipe.transform(10, 'CAD:symbol')).toBe('CA$10.00');
    expect(pipe.transform(10, 'CAD:code')).toBe('CAD10.00');
    expect(pipe.transform(10, 'CAD:symbol-narrow')).toBe('$10.00');
  });

  it('should change the digit info display', () => {
    expect(pipe.transform(10.49, 'auto:auto:1.0-0')).toBe('$10');
    expect(pipe.transform(10.49, 'auto:auto:1.0-1')).toBe('$10.5');
    expect(pipe.transform(10.49, 'auto:auto:3.2-5')).toBe('$010.49');
    expect(pipe.transform(10.49, 'auto:auto:2.3-5')).toBe('$10.490');
  });

  it('should change the locale', () => {
    expect(pipe.transform(10.49, '$:auto:auto:fr')).toBe('10,49 $');
  });
});
