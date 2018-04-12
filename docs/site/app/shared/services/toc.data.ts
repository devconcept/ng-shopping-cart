export const contents: any = [
  {
    path: '',
    url: '/',
    title: 'Home'
  },
  {
    path: 'get-started',
    url: '/get-started',
    topics: ['installing', 'configuring'],
    next: {title: 'The cart item', url: '/guide/the-cart-item'}
  },
  {
    path: 'the-cart-item',
    chapter: 'Guide',
    url: '/guide/the-cart-item',
    topics: ['the-cartitem-class', 'default-cartitem', 'using-other-classes', 'persisting-items'],
    next: {title: 'The cart service', url: '/guide/the-cart-service'}
  },
  {
    path: 'the-cart-service',
    url: '/guide/the-cart-service',
    chapter: 'Guide',
    topics: ['default-service', 'other-services', 'custom-cart-service'],
    next: {title: 'Styling', url: '/guide/styling'}
  },
  {
    path: 'styling',
    url: '/guide/styling',
    chapter: 'Guide',
    topics: ['using-css', 'using-css-preprocessors'],
    next: {title: 'Components', url: '/api/components/index'}
  },
  {
    path: 'components',
    url: '/api/components/index',
    chapter: 'API',
    next: {title: 'Classes', url: '/api/classes/index'}
  },
  {
    path: 'add-to-cart',
    url: '/api/components/add-to-cart',
    topics: [
      '[item]', '[custom]', '[buttonText]', '[buttonClass]', '[type]', '[position]', '[dropdown]', '[quantity]', '(change)', '(added)'
    ],
    chapter: false,
    next: {title: '<CartCheckout>', url: '/api/components/cart-checkout'}
  },
  {
    path: 'cart-checkout',
    url: '/api/components/cart-checkout',
    chapter: false,
    next: {title: '<CartSummary>', url: '/api/components/cart-summary'}
  },
  {
    path: 'cart-summary',
    url: '/api/components/cart-summary',
    topics: [
      '[icon]', '[totalPlurals]'
    ],
    chapter: false,
    next: {title: '<CartView>', url: '/api/components/cart-view'}
  },
  {
    path: 'cart-view',
    url: '/api/components/cart-view',
    chapter: false,
    next: {title: '<CartShowcase>', url: '/api/components/cart-showcase'}
  },
  {
    path: 'cart-showcase',
    url: '/api/components/cart-showcase',
    chapter: false,
    next: {title: 'Services', url: '/api/services/index'}
  },
  {
    path: '**',
    title: 'Not found',
    layout: false
  },
];
