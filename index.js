"use strict";

const property = (...generators) => (prop, iterations = 100) => {
  for (let generator of generators) {
    if (
      typeof generator !== "function" ||
      typeof generator.prototype.next !== "function"
    )
      throw new TypeError(`${generator} is not a GeneratorFunction`);
  }
  if (typeof prop !== "function")
    throw new TypeError(`${prop} must a function`);
  const gens = generators.map(gen => gen());
  for (let i = 0; i < iterations; i++) {
    const next = gens.map(gen => gen.next());
    if (!prop(...next))
      throw new Error(`test failed with ${JSON.stringify(next)}`);
  }
  gens.map(gen => gen.next(true));
};

const sample = generator => {
  const values = generator();
  return new Array(6).fill().map(_ => values.next());
};

function* charGen() {
  while (true) yield String.fromCharCode(Math.round(Math.random() * 65535));
}

function* intGen() {
  while (true) yield Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
}

function* asyncGen() {
  let idx = 1;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(idx++), 500));
  }
}

module.exports = {
  property,
  generators: {
    intGen,
    charGen
  },
  sample
};
