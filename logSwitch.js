var fs = require('fs');
var util = require('util');

module.exports = function() {
  return new LogSwitch();
}();

function LogSwitch() {
  this._queue_max = 10;
  this._Error = Error;
  this._log_list = [];
  this._console_log = console.log;
}

/**
 * disable console.log
 */
LogSwitch.prototype.disable = function() {
  var self = this;
  self.setConsoleLog();
  self.setError();
};

/**
 * restore console.log
 */
LogSwitch.prototype.restore = function() {
  var self = this;
  console.log = self._console_log;
  Error = self._Error;
};

/**
 * record the log
 */
LogSwitch.prototype.record = function() {
  var self = this;
  if (self._log_list.length > self._queue_max) {
    self._log_list.shift();
  }
  self._log_list.push(arguments);
};

/**
 * set console.log
 */
LogSwitch.prototype.setConsoleLog = function() {
  var self = this;
  console.log = function() {
    self.record.apply(self, arguments)
  };
};

/**
 * set Error
 */
LogSwitch.prototype.setError = function() {
  var self = this;
  self._Error.stackTraceLimit = Infinity;
  Error = function() {
    self.historySync();
    return self._Error.apply(undefined, arguments);
  };
};

/**
 * set history queue length
 */
LogSwitch.prototype.setQueueLength = function(len) {
  this._queue_max = len;
};

/**
 * history
 */
LogSwitch.prototype.history = function() {
  var self = this;
  for (var i = 0; i < self._log_list.length; i++) {
    self._console_log.apply(undefined, self._log_list[i]);
  }
};

/**
 * history
 */
LogSwitch.prototype.historySync = function() {
  var self = this;
  for (var i = 0; i < self._log_list.length; i++) {
    self.print.apply(undefined, this._log_list[i]);
  }
};

/**
 * print log sync
 */
LogSwitch.prototype.print = function() {
  var response = fs.writeSync(process.stdout.fd, util.format.apply(this, arguments) + '\n');
}