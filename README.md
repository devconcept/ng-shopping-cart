# NgShoppingCart

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] ![Npm version][version-image] ![Downloads][downloads-image]

An Angular component library to create shopping carts. Based on it's [predecessor][ng-cart] for Angular.js with tons of improvements.

# Features

- All the previous components with more features.
- An extra `CartShowcaseComponent` to help e-commerce applications to quickly build screens to display their available products.
- Generic services to use your own data structures for cart items. Only a few required methods needs to be implemented to interop with the library.
- A default `CartItem` class ready to go, easy to replace.
- Several built-in `CartService` implementations to persist cart information in different ways.
- Easily customizable styles with `Sass` variables

> This library is compatible with Angular version >=5

# Installation

Using `npm`

```bash
npm install ng-shopping-cart --save
```

or `yarn`

```bash
yarn add ng-shopping-cart
```


# Documentation

Documentation is available at http://devconcept.github.io/ng-shopping-cart/

Dgeni is used to automatically generate documentation from the source code. If you spot an error please consider [reporting it](https://github.com/devconcept/ng-shopping-cart/issues).

# Demo

You can find a demo of the library in the url http://devconcept.github.io/ng-shopping-cart/demo/. 

The demo is also available if you:

- Clone the repository
- Install it's dependencies with `npm install`
- Run `npm start` or `ng run demo`

## License

[MIT](https://github.com/devconcept/ng-shopping-cart/blob/master/LICENSE)

[ng-cart]: http://ngcart.snapjay.com/ "ngCart"
[travis-url]: https://travis-ci.org/devconcept/ng-shopping-cart
[travis-image]: https://travis-ci.org/devconcept/ng-shopping-cart.svg?branch=master "Build status"
[coveralls-url]: https://coveralls.io/github/devconcept/ng-shopping-cart?branch=master
[coveralls-image]: https://coveralls.io/repos/github/devconcept/ng-shopping-cart/badge.svg?branch=master "Coverage report"
[version-image]:https://img.shields.io/npm/v/ng-shopping-cart.svg "Npm version"
[downloads-image]: https://img.shields.io/npm/dm/ng-shopping-cart.svg "Monthly downloads"




