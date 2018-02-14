// this file contains examples on how to create moduels and export values and functions
// to different files

module.exports.counter = function(arr){
	return 'there are ' + arr.length + ' elements in the array';
}

module.exports.adder = function(a,b){
	return `The sum of the 2 numbers is ${a+b}`;
}

module.exports.str = "str";

module.exports.pi = 3.142;
