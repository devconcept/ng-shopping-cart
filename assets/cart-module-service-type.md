## CartModuleServiceType

<span class="badge badge-warning">Type</span>

The CartService implementation used to store items

Values: `'memory' ` | ` 'localStorage' ` | ` 'sessionStorage'`

Meaning:


`'memory'`: A service that stores items in memory

`'localStorage'`: A service that persist items indefinitely in localStorage. It also keeps a copy in memory for fast access

`'sessionStorage'`: A service that stores items in sessionStorage until the user closes the page. It also caches items in memory.


