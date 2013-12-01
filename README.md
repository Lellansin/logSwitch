
Log Switch
------------

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


Disable console.log
---------------------

As you see the info, call the console.log 100,000 times takes `40.6` second. that's so bad. To avoid this situation, you can use LogSwitch to disable it.

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

    var logs = require('log-switch');
    
    logs.setQueueLength(10);
    logs.disable();
    
    for (var i = 0; i < 100000; i++) {
      if (i === 50000) {
        throw new Error('Error string');
      }
      console.log('hello %d', i);
    }

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
    
    E:\node\log-switch\test.js:9
    		throw new Error('Error string');
    		^
    Error: Error string
        at Error (<anonymous>)
        at new Error (E:\node\log-switch\t.js:55:22)
        at Object.<anonymous> (E:\node\log-switch\test.js:9:9)
        at Module._compile (module.js:456:26)
        at Object.Module._extensions..js (module.js:474:10)
        at Module.load (module.js:356:32)
        at Function.Module._load (module.js:312:12)
        at Function.Module.runMain (module.js:497:10)
        at startup (node.js:119:16)
        at node.js:901:3

    [Finished in 0.2s with exit code 8]
    [cmd: node E:\node\log-switch\test.js]


Test computer
--------------------

        OS    :  Microsoft Windows 7 Ultimate (x64)
    Processor :  AMD64 Family 16 Model 6 Stepping 3 AuthenticAMD ~3000 Mhz