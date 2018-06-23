export function parseCurrencyFormat(format: string): any {
  if (!format) {
    throw new Error('Invalid format for currency. Expected a non empty string');
  }
  const res = {};
  const props = ['currencyCode', 'symbolDisplay', 'digitsInfo', 'locale'];
  const symbols = ['code', 'symbol', 'symbol-narrow', 'auto'];
  const parts = format.split(':');
  const partsLength = parts.length;

  if (partsLength > 4) {
    throw new Error(`Invalid format for currency. Expected a value in the form ${props.join(':')} anf got ${format}`);
  }

  props.forEach((p, idx) => {
    let value = idx > partsLength - 1 ? 'auto' : parts[idx];
    if (value === 'auto') {
      value = idx === 1 ? 'symbol' : undefined;
    }
    if (idx === 1 && symbols.indexOf(value) === -1) {
      throw new Error(`Invalid symbol display found. Expected any of ${symbols.join(',')} and got ${value}`);
    }

    res[p] = value;
  });

  return res;
}

