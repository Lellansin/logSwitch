var logs = require('log-switch');
var twiceCall = require('./test-track-fun').twiceCall;

logs.track();

console.log('first file');
twiceCall();

logs.restore();