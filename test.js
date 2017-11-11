"use strict"

const assert = require("assert")
const {property, generators: gen} = require(".")

assert.doesNotThrow(() => property(gen.intGen)(x => x < x + 1))
assert.throws(() => property(gen.intGen)(x => x > x + 1))
