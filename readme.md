# property-check

property-check is a library for random testing of program properties

## How to use

### Example usage with Mocha/Chai

```js
const { property, generators: gen } = require("property-check")

describe("simple math", () => {
  it("should work for addition", () => {
    expect(property(gen.intGen)(x => x < x + 1)).to.not.throw()
  })
})
```
