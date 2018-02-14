var stuff = require('./myModule');
var events = require('events');
var util = require('util');
var fs = require('fs');

// ExAMPLE FOR USING EMITTER
var myEmitter = new events.EventEmitter();


var Person = function(name){
	this.name = name;
};

util.inherits(Person, events.EventEmitter);

var James = new Person('James');
var Ben = new Person('Ben');
var Mary = new Person('Mary');

var people = [James, Ben, Mary];

people.forEach(function(person){
	person.on('speak', function(message){
		console.log(person.name + ' said ' + message);
	})
});

James.emit('speak', 'sup bro');

//example using fs and reading/writing files

//Synchronus version
//var readMe = fs.readFileSync('readme.txt', 'utf8');

// console.log(readMe);
//
// fs.writeFileSync('writeMe.txt', readMe);

//Async version

fs.readFile('readMe.txt', 'utf8', function(err, data){
	fs.writeFile('writeMe.txt', data);
});

//wait for 2 seconds and then delete the new file
setTimeout(function(){
	fs.unlink('writeMe.txt');
}, 2000);

fs.mkdir('stuff', function(){
	fs.readFile('readMe.txt', 'utf8', function(err, data){
		fs.writeFile('./stuff/writeMe.txt', data);
	})
})

setTimeout(function(){
	fs.unlink('./stuff/writeMe.txt', function(){
			fs.rmdir('stuff');
	});
}, 2000);
