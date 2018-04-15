@next api/index
## Styling

All of the components provided by this module use global styles. This is intentional to allow several strategies for customization of a single component, all components of one type or to harness the power of CSS preprocessors to change how the library behaves.

## Using css

If you plan on using the default styles unchanged or make the modifications on your app stylesheets you must include the base generated css in your `angular-cli.json` file.

```json
  apps: [{
      ...
      "prefix": "app",
      "styles": [
        "../node_modules/ng-shopping-cart/styles/css/ng-shopping-cart.css", <-- Include before your styles
        "styles.css"
      ]
      ... 
  }],
```

Your styles must be added later so you can use specificity to override properties in the component classes.

> When specificity is equal to any of the multiple declarations, the last declaration found in the CSS is applied to the element

Then you could write something like this in your `"styles.css"` file

```css
.add-to-cart {
  .add-to-cart-button {
    background-color: red;   
  }
}
```

This will change the background color to `red` in all `<add-to-cart>` components in your app.

If you need to style a single component all you have to do is wrap that component in a html element, a `<div>` for example, and add a class to it making even more specific than the rest of the components of the same type.

```css
.my-custom-add-to-cart {
  .add-to-cart {
    .add-to-cart-button {
      background-color: blue;   
    }
  }
}
```

the `html` would be

```html
<div class="my-custom-add-to-cart">
  <add-to-cart ...></add-to-cart>
</div>
```

If you follow the example you will see that this particular `add-to-cart` component renders blue while all the others have red backgrounds.

## Using css preprocessors

Some popular frameworks use CSS preprocessor variables to perform quick customizations to the whole generated CSS. The `<cart-showcase>` component, for example, uses a grid system to display items of identical sizes in a single row in a responsive manner. You can have a different amount of columns in tablets or desktop screens but it is not possible to cover all scenarios. Preprocessor variables allow you to fill this gap. Check the following example: 

The current grid system uses a 12 column layout, the same as other popular CSS frameworks like Bootstrap or Foundation. If you need, for example, five items arranged in a row, the current grid system would not be able to help you because `12` is not divisible by `5` and you will get a chunk of space at the end that is not filled by any item. You could change the number of columns of the grid but remember this will generate a new css file and will affect all components of this type.

First create a `.scss` file and write this

```scss
@import "./node_modules/ng-shopping-cart/styles/scss/variables"

$columns: 15; // <-- here you change all the variables you need

@import "./node_modules/ng-shopping-cart/styles/scss/lib"
```

All you need to do is locate the `variables` and `lib` scss files changing the values after you imported the variables file. The `lib` file will compile to CSS with your values instead of the defaults and now you have a grid with `15` columns which can fit your five items.

Your app still doesn't know how to use that file though so you need to add the created file to your styles array in the `angular-cli.json` if you are using scss in your app or compile the file to css and include the generated file instead. Either way should work.

> So far only the SASS language is supported. 
