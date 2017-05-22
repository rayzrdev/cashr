const Cashr = require('../lib');

const cache = new Cashr({ timeoutDelay: 250 });

cache.on('valueTimeout', (key, value) => {
    console.log(`TIMEOUT ${key} - ${value}`);
    const diff = process.hrtime(now);
    console.log(diff[0] * 1e3 + diff[1] / 1e6 + 'ms delay');
});

function insert(key, value) {
    console.log(`INSERT ${key} - ${value}`);
    cache.set(key, value);
}

const now = process.hrtime();
insert('hello', 'world');