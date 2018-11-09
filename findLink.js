

var fs = require('fs')

var marked = require('marked')


var EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

var myEmitter = new MyEmitter();

myEmitter.on('findLink', findLink);
//myEmitter.emit('findLink');

function findLink(filename) {
	
	var renderer = new marked.Renderer();
	// Override function
	renderer.link = function (href, title, text) {
		console.log('got a link')
		console.log(filename, href, title, text)
		debugger
	};
	

	fs.readFile(filename, "utf8", function (err, data) {
		if (err) throw err;
		console.log('filename is  ========= ==  ' + filename);
		jsonData = marked(data, { renderer: renderer } )
		//console.log(typesInmd)
		//var unique = typesInmd.filter(typesInmd);
		//console.log(unique)
	});
}

module.exports = myEmitter