
var request = require('request')
var fs = require('fs')

var EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

var myEmitter = new MyEmitter();
var inputs = 0
var outputs = 0
var data = []

myEmitter.on('validateLink', validateLink);
myEmitter.on('validateLinkFull', validateLinkFull);
//myEmitter.emit('validateLink', 'http://go.microsoft.com/fwlink/p/?LinkID=525040');

function validateLink(link, file) {
    inputs++
    request.head(link, function (error, response) {
        outputs++
        if (error) {
            inputs--
            outputs--
            console.log('error:', error); // Print the error if one occurred
            //data.push({ code: -1, link: link, file: file })
            myEmitter.emit("validateLinkFull", link, file)
            return
        }
        if (response && response.statusCode != 200) {
            inputs--
            outputs--
            //data.push({ code: -1, link: link, file: file })
            debugger
            myEmitter.emit("validateLinkFull", link, file)
            return
        }
        if (response && response.statusCode) {
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            data.push({ code: response.statusCode, link: link, file: file })
        }
        else {
            data.push({ code: -2, link: link, file: file })
        }

    });
}

function validateLinkFull(link, file) {
    inputs++
    request(link, function (error, response) {
        outputs++
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            data.push({ code: -1, link: link, file: file })
            return
        }
        if (response && response.statusCode) {
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (link == "https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack") {
                console.log(response.statusCode)
                debugger
            }
            data.push({ code: response.statusCode, link: link, file: file })
        }
        else {
            data.push({ code: -2, link: link, file: file })
        }

    });
}

function printer() {
    if (inputs == outputs) {
        console.log("==================================== output is ====================================")
        console.log(inputs)
        console.log(outputs)
        var report = {}
        var reportData = 'file,link,code'
        for (var i = 0; i < data.length; i++) {
            if (report[data[i].code]) {
                report[data[i].code] = report[data[i].code] + 1
            }
            else {
                report[data[i].code] =  1
            }
            if (data[i].code == 404) {
                console.log(data[i].file + '  ' + data[i].link + '  ' + data[i].code )
            }
            reportData = reportData + '\n' + data[i].file + ',' + data[i].link  + ',' + data[i].code 
        }
        console.log(report)
        fs.writeFile('report.csv', reportData, 'utf8', function (err) {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        clearInterval(refreshIntervalId);
    }
}
var refreshIntervalId = setInterval(printer, 5000)
module.exports = myEmitter