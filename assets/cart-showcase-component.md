## CartShowcaseComponent
<span class="badge badge-warning">Component</span>

Selector: `<cart-showcase>`

Renders items arranged in columns using a dynamic component for the item useful for getting started with e-commerce applications.



<blockquote class="doc note bg-light">If you change the [columns] input you must also change the SASS variable that controls the component grid. A similar procedure is
required to create aspect ratios with values greater than four eg: '1:5'. Check the styling guide for more information.
</blockquote>

<blockquote class="doc note bg-light">The aspect ratio is the width/height proportion of the items therefore a ratio of "2:2" is equivalent to "1:1". Redundant ratios
like these are removed from the source so don't try to use them.</blockquote>



*@Input()*


#### `xsCols`
Type:`number`

Initial value: `1`

The number of columns to display when the screen size matches phone devices.



#### `sCols`
Type:`number`

Initial value: `2`

The number of columns to display when the screen matches tablet devices.



#### `mCols`
Type:`number`

Initial value: `3`

The number of columns to display when the screen matches desktop devices.



#### `lCols`
Type:`number`

Initial value: `3`

The number of columns to display when the screen matches large desktop devices.



#### `xlCols`
Type:`number`

Initial value: `4`

The number of columns to display when the screen matches extra large desktop devices.



#### `columns`
Type:`number`

Initial value: `12`

The number of columns in the grid



#### `items`
Type:`CartItem[]`

An array of items to display



#### `itemComponent`
Type:`any`

Initial value: `CartShowcaseItemComponent`

The component to use to display the items



#### `aspectRatio`
Type:`string`

Initial value: `'1:1'`

The aspect ratio of the container of the items. A value of `1:1` means square items, `2:1` means two times wider, `1:2` two times
taller and so on.






































### How to use

<div class="how-to-use">Using wider items</div>
```html
<cart-showcase [items]="items" [aspectRatio]="'2:1'">
</cart-showcase>
```


<div class="how-to-use">Using four columns in all screen sizes bigger than 768px</div>
```html
<cart-showcase [items]="items" [mCols]="4" [lCols]="4">
</cart-showcase>
```


<div class="how-to-use">Using a different item component</div>
```html
<cart-showcase [items]="items" [itemComponent]="itemComponent">
</cart-showcase>
```
```typescript
export class MyComponent {
  itemComponent = MyCustomItemComponent;
}

export class MyCustomItemComponent implements ShowcaseItem  {
  item: CartItem;
}

@NgModule({
  // .....
  entryComponents: [MyCustomItemComponent],
})
export class AppModule {
}
```



