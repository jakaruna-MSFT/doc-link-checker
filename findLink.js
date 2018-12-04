

var fs = require('fs')

var marked = require('marked')

var linkValidator = require('./request')

var EventEmitter = require('events');

EventEmitter.defaultMaxListeners = 25;

class MyEmitter extends EventEmitter {}

var myEmitter = new MyEmitter();

myEmitter.on('findLink', findLink);
//myEmitter.emit('findLink');

function findLink(filename) {
	
	var renderer = new marked.Renderer();
	// Override function
	renderer.link = function (href, title, text) {
		//console.log('got a link')
        //console.log(filename, href, title, text)
        if (href.lastIndexOf('http', 0) === 0) {
            //console.log('link is ' + href)
            linkValidator.emit('validateLink', href, filename)
        }
		//debugger
	};
	

	fs.readFile(filename, "utf8", function (err, data) {
		if (err) throw err;
		//console.log('filename is  ========= ==  ' + filename);
		jsonData = marked(data, { renderer: renderer } )
		//console.log(typesInmd)
		//var unique = typesInmd.filter(typesInmd);
		//console.log(unique)
	});
}

module.exports = myEmitter