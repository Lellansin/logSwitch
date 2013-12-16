var logs = require('log-switch');
var twiceCall = require('./track-test-fun').twiceCall;

logs.track();

console.log('first file');
twiceCall();

logs.restore();