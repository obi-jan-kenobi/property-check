const property = (...generators) => (prop, iterations = 100) => {
  const gens = generators.map(gen => gen())
  for (let i = 0; i < iterations; i++) {
    const next = gens.map(gen => gen.next())
    if (!prop(...next)) throw new Error(`test failed with ${JSON.stringify(next)}`)
  }
  gens.map(gen => gen.next(true))
}

function * intGen () {
  while (true) yield Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
}

function * asyncGen () {
  let idx = 1
  while (true) {
    yield new Promise((resolve) => setTimeout(() => resolve(idx++), 500))
  }
}

property(intGen, asyncGen)((x, y) => x < x + y, 25)

module.exports = 
  { property
  , generators:
    { intGen
    }
  }
