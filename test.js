"use strict"

const assert = require("assert")
const {property, generators: gen, sample} = require(".")

assert.doesNotThrow(() => property(gen.intGen)(x => x < x + 1))
assert.throws(() => property(gen.intGen)(x => x > x + 1))

assert.doesNotThrow(() =>
  property(gen.intGen, gen.intGen, gen.intGen)((x, y, z) =>
    (x + y) + z == x + (y + z)))
