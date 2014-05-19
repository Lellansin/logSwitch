var logs = require('../');
var twiceCall = require('./track-fun').twiceCall;

logs.track();

console.log('first file');
twiceCall();

logs.restore();