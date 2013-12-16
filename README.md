
Log Switch
------------

What's the problem?
---------------------

The problem is so many logs in my program.

    for (var i = 0; i < 100000; i++) {
      console.log('hello %d', i);
    }

`Result`

    hello 0
    hello 1
    ...
    hello 99998
    hello 99999
    [Finished in 40.6s]

As you see the info, call the console.log 100,000 times takes `40.6` second. that's so bad.

Disable console.log
---------------------

To avoid this situation, you can use LogSwitch to disable it.

    var logs = require('log-switch');
    
    logs.disable();
    
    for (var i = 0; i < 100000; i++) {
      console.log('hello %d', i);
    }
    
    logs.restore();
    
    console.log('over');

`Result`

    over
    [Finished in 0.2s]


Auto enable logs
---------------------

In case the error thrown, LogsSwitch can auto print the last 10 logs.

    var logs = require('./log-switch');
    
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

`Result`

    hello 49989
    hello 49990
    hello 49991
    hello 49992
    hello 49993
    hello 49994
    hello 49995
    hello 49996
    hello 49997
    hello 49998
    hello 49999
    
    F:\node\log-switch\test.js:9
          throw new Error('Error string');
          ^
    Error: Error string
        at Error (<anonymous>)
        at new Error (F:\node\node_modules\log-switch\logSwitch.js:81:24)
        at test (F:\node\log-switch\test.js:9:13)
        at Object.<anonymous> (F:\node\log-switch\test.js:15:1)
        at Module._compile (module.js:456:26)
        at Object.Module._extensions..js (module.js:474:10)
        at Module.load (module.js:356:32)
        at Function.Module._load (module.js:312:12)
        at Function.Module.runMain (module.js:497:10)
        at startup (node.js:119:16)
        at node.js:901:3
    [Finished in 0.2s with exit code 8]


Track logs
---------------------

track-test.js
     
    function test() {
        console.log('where is this log?');
    }
    
    function twiceCall() {
        console.log('second file')
        test();
    }
    
    exports.twiceCall = twiceCall;

t.js

    var logs = require('log-switch');
    var twiceCall = require('./track-test').twiceCall;
    
    logs.track();
    console.log('first file');
    twiceCall();
    
    logs.restore(); // disable the track

`Result`

    first file
      at  (F:\node\log-switch\t.js:4)
    second file
      at twiceCall (F:\node\log-switch\track-test.js:10)
    where is this log?
      at test (F:\node\log-switch\track-test.js:6)
    [Finished in 0.2s]


Test computer
--------------------

The test data `40.6` second is comes from:

        OS    :  Microsoft Windows 7 Ultimate (x64)
    Processor :  AMD64 Family 16 Model 6 Stepping 3 AuthenticAMD ~3000 Mhz