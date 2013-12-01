var logs = require('log-switch');

logs.disable();

for (var i = 0; i < 100000; i++) {
  console.log('hello %d', i);
}

logs.restore();

console.log('over');