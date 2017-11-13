# property-check

property-check is a library for random testing of program properties. it's inspired by haskells quickckeck.

## How to use

The property-function gets called with generators in the order in which they should supply values to the property we're going to check.
These generators are generator-functions which yield the desired values. Here is a basic example which yields random positive Integers.

```js
function * intGen () {
  while (true) yield Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
}
```

Calling the property-function with generators returns the actual checking-function. Here we are going to assert our properties by supplying a function. By default the property gets checked 100 times. There is an optional second argument which lets you change the number of checks.

If the property holds it will not throw. Otherwise it will throw an Error with the values with which it failed.

### Example usage with Mocha/Chai

```js
const { property, generators: gen } = require("property-check")

describe("simple math", () => {
  it("should work for addition", () => {
    expect(property(gen.intGen)(x => x < x + 1)).to.not.throw()
  })
})
```

### Example with three generators and partial application

```js
const { property, generators: gen } = require("property-check")

describe("associativity", () => {
  const threeRandomInts = property(gen.intGen, gen.intGen, gen.intGen)
  it("should work for addition", () => {
    expect(threeRandomInts((x, y, z) => (x + y) + z == x + (y + z)))
  })
  it("should work for multiplication", () => {
    expect(threeRandomInts((x, y, z) => (x * y) * z == x * (y * z)))
  })
})
