@order 5
## Internationalization

There are two steps to internationalize your app. First is currency and number display customization. The second is template translation.

#### Locale formats

This library is locale aware. This means that changing your `LOCALE_ID` will also update all currencies, numbers and percents in all library components.

Updating the display format is easy. All components have a `localeFormat` input that change this behaviour. This input is a `string` in the form `'currencyCode:display:digitsInfo:locale'`, the same as the `CurrencyPipe`. Under the hoods the library converts this format and update the component's template accordingly.

If this input is not specified the component will fallback to the format used by the `CartService`. This means that you can control all components at once by updating the service using the `setLocaleFormat` method.

The library exports a `CartCurrencyPipe` that displays numbers using this format. There is also a `parseLocaleFormat` function that takes a string and returns an object with each of the parts. They are not meant to be a replacement for the `CurrencyPipe`, they are just a convenience wrapper with a different format.

#### Translating text

Every text displayed by the library components can be translated using the same techniques employed in other Angular applications. Each text is customizable using inputs so you can change them to other words or change the initial display language.

Using the familiar `i18n` attribute you can mark those text for translation too. This is how a component is translated from english to any other language of your choice

```html
<add-to-cart buttonText="Add to cart" i18n-buttonText></add-to-cart>
```

This example uses the default text in English and mark the attribute using the i18n translation attributes which are recognized and collected by the `ng xi18n` command.

Running this command would yield a file like this

```html
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="4eaa396a0686e4c364766a65e22dac1e59b9e100" datatype="html">
        <source>Add to cart</source>
        <context-group purpose="location">
          <context context-type="sourcefile">app/app.component.ts</context>
          <context context-type="linenumber">21</context>
        </context-group>
      </trans-unit>
    </body>
  </file>
</xliff>
```

Using different words or a non-English initial language is possible too with this technique. This example uses French as the default language for your translators.

```html
<add-to-cart buttonText="Ajouter au panier" i18n-buttonText></add-to-cart>
```

After you translated all text nodes and merged the translation file following the steps provided in the [internationalization guide](https://angular.io/guide/i18n) your app will display the target language of your choice and all the library components will update too to display text using that language.





