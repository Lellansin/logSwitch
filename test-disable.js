var logs = require('log-switch');

logs.setQueueLength(10);
logs.disable();

function test() {
  for (var i = 0; i < 100000; i++) {
    if (i === 50000) {
      throw new Error('Error string');
    }
    console.log('hello %d', i);
  }
}

test();