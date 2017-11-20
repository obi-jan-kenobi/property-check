"use strict";

const assert = require("assert");
const { property, generators: gen, sample } = require(".");

// doesnt throw with proper usage & valid property
assert.doesNotThrow(() => property(gen.intGen)(x => x < x + 1));
assert.doesNotThrow(() =>
  property(gen.intGen, gen.intGen, gen.intGen)(
    (x, y, z) => x + y + z == x + (y + z)
  )
);

// does throw with invalid property
assert.throws(() => property(gen.intGen)(x => x > x + 1));

// does throw with improper usage
assert.throws(() => property(x => x)(x => x == x));
assert.throws(() => property(gen.charGen, "string")(x => x == x));
