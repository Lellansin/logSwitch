function test() {
	console.log('where is this log?');
}

function twiceCall() {
	console.log('second file')
	test();
}

exports.twiceCall = twiceCall;