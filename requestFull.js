

var request = require('request')

var EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

var myEmitter = new MyEmitter();

myEmitter.on('validateLink', validateLink);
myEmitter.emit('validateLink', 'http://go.microsoft.com/fwlink/?LinkId=252718');

function validateLink(link) {
    request(link, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        }
        //console.log(body)
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        
    });
}

module.exports = myEmitter