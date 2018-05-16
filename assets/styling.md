## Styling
All of the components provided by this module use global styles. This is intentional to allow several strategies for customization of a single component, all components of one type or to harness the power of CSS preprocessors to change how the library behaves.
#### Using css
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
Your styles must be added later so you can use specificity to easily override properties in the component classes.
> When specificity is equal to any of the multiple declarations, the last declaration found in the CSS is applied to the element
#### Styling components
The easiest way to change the appearance of the built-in components is to use global styles. You could write something like this in your `"styles.css"` file
```css
.add-to-cart {
  .add-to-cart-button {
    background-color: red;   
  }
}
```
This will change the background color to `red` in all `<add-to-cart>` components in your app.
To style only one component you just have to wrap the component inside let's say a `span` or a `div` element and add a class to it.
```css
.my-class {
  .add-to-cart {
    .add-to-cart-button {
      background-color: blue;   
    }
  }
}
```
and the corresponding html
```html
<div class="my-class">
  <add-to-cart></add-to-cart>
</div>
```
This will target only cart buttons who are the children of an element with the class `.my-class` to be styled with the color blue.
> Always prefer using global styles to change the appearance of the library components. Other techniques are harder or present inconveniences that makes them less suitable for the task.
#### Component encapsulation
The previous example worked because you added classes using the global styles of your app. The same cannot be said when you try to customize one particular library component inside one of your own components. The culprit is the Angular's view encapsulation. Let's say we added this in the template of your component:
```typescript
// my-component.ts file
<div class="my-class">
  <add-to-cart></add-to-cart>
</div>
```
and instead of using global styles you choose to add this to the component css file
```css
/* my-component.css file */
.my-class {
  .add-to-cart {
    .add-to-cart-button {
      background-color: blue;   
    }
  }
}
```
Checking the results you'll see that the component still have the default color. This is because Angular's default emulated view encapsulation processed and changed your styles to something like this
```css
/* processed result example */
.my-class[_ngcontent-c1] {
  .add-to-cart[_ngcontent-c1] {
    .add-to-cart-button[_ngcontent-c1] {
      background-color: blue;   
    }
  }
}
```
The emulated encapsulation automatically added an attribute to each selector in your component styles and since the `add-to-cart` element is a child but a completely different component it doesn't have the attribute added and the selector doesn't match. 
> The styles specified in @Component metadata apply only within the template of that component. They are not inherited by any components nested within the template nor by any content projected into the component.
There are a couple of techniques to deal with this but we strongly encourage you to use global styles instead. Let's dive in an example to see why. 
The first alternative is to use the special selector *shadow-piercing descendant combinator* or in other words the `/deep/`, `>>>` or `::ng-deep` selectors. Writing this will work:
```css
/* my-component.css file */
.my-class /deep/ .add-to-cart .add-to-cart-button {
    background-color: blue;   
}
```
This will force a style down through the child component tree into all the child component views so the `add-to-cart` also receives the style. The problem with that approach is that this selector only works with emulated view encapsulation, is already deprecated and support is being removed from major browsers so your code could stop working in a future release.
The alternative number two is to set the component's view encapsulation to none.
```typescript
import {Component, ViewEncapsulation} from '@angular/core';selector: 'my-component',
  templateUrl: './my-component.html',
  styleUrls: ['./my-component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyComponent {
}
``` 
Using this technique also works because now Angular doesn't add the attribute to your classes but you'll lose **styling modularity** and every class selector you write will leak to other components.
#### Using css preprocessors
Some popular frameworks use CSS preprocessor variables to perform quick customizations to the whole generated CSS. The `<cart-showcase>` component, for example, uses a grid system to display items of identical sizes in a single row in a responsive manner. You can have a different amount of columns in tablets or desktop screens but it is not possible to cover all scenarios. Preprocessor variables allow you to fill this gap. Check the following example: 
The current grid system uses a 12 column layout, the same as other popular CSS frameworks like Bootstrap or Foundation. If you need, for example, five items arranged in a row, the current grid system would not be able to help you because `12` is not divisible by `5` and you will get a chunk of space at the end that is not filled by any item. You could change the number of columns of the grid but remember this will generate a new file and will affect all components of this type.
First create a `.scss` file and write this
```scss
+ @import "./node_modules/ng-shopping-cart/styles/scss/variables"; // Add the variables first
$columns: 15; // <-- here you change all the variables you need
+ @import "./node_modules/ng-shopping-cart/styles/scss/lib"; // Add the rest of the library styles
```
All you need to do is locate the `variables` and `lib` scss files changing the values after you imported the variables file. The `lib` file will compile to CSS with your values instead of the defaults and now you have a grid with `15` columns which can fit your five items.
Your app still doesn't know how to use that file though so you need to add the created file to your styles array in the `angular-cli.json` if you are using scss in your app or compile the file to css and include the generated file instead. Either way should work.
> So far only the SASS language is supported. Other languages will be included in a future release.
