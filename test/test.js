// usage:  node test.js
// to-do:  add options to specify test parameters on the command line

require('../lib/bufferHelpers.js');

var test = new Buffer('1234jkl2{{#subset-1}}abcdefghi{{#subset-two}}asdfasdf}');

var output1 = test.extractSubsets('{{#', '}}');
var output2 = test.extractSubsetsRecursive('{{#', '}}');

console.log('\n');
console.log('test case is ' + test.toString());
console.log('\nsearching for {{#   }}');
console.log('\nRaw buffer output - iterative\n');
console.log(output1);
console.log('\nString conversion output - iterative\n' + output1.toString());
console.log('\nRaw buffer output - recursive\n');
console.log(output2);
console.log('\nString conversion output - recursive\n' + output2.toString());
console.log('\n');

