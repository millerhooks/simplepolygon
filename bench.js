const Benchmark = require('benchmark');
const path = require('path');
const fs = require('fs');
const load = require('load-json-file');
const simplepolygon = require('./');

const directory = path.join(__dirname, 'test', 'in') + path.sep;
const fixtures = fs.readdirSync(directory).map(filename => {
    return {
        filename,
        name: path.parse(filename).name,
        geojson: load.sync(directory + filename)
    };
});

/**
 * Benchmark Results
 *
 * polygons x 3,567 ops/sec ±1.61% (85 runs sampled)
 * simple1 x 9,013 ops/sec ±1.15% (86 runs sampled)
 * simple2 x 10,278 ops/sec ±1.52% (86 runs sampled)
 * simple3 x 13,124 ops/sec ±1.37% (85 runs sampled)
 */
const suite = new Benchmark.Suite('simplepolygon');
for (const {name, geojson} of fixtures) {
    suite.add(name, () => simplepolygon(geojson));
}

suite
    .on('cycle', e => console.log(String(e.target)))
    .on('complete', () => {})
    .run();