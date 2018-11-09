
// Import the module
var readdirp = require('readdirp');
var findLink = require('./findLink');

var settings = {
    root: './azure-docs',
    fileFilter: ['*.md'],
    //directoryFilter: ['!.git'],
	directoryFilter: ['articles'],
    depth: 100,
    entryType: 'files'
};

// In this example, this variable will store all the paths of the files and directories inside the providen path
var allFilePaths = [];

// Iterate recursively through a folder
readdirp(settings)
    .on('data', function (entry) {
        // execute everytime a file is found in the providen directory

        // Store the fullPath of the file/directory in our custom array 
        allFilePaths.push(
            entry.fullPath
        );
        console.log('got a file ' + entry.fullPath)
		findLink.emit('findLink', entry.fullPath)
    })
    .on('warn', function (warn) {
        console.log("Warn: ", warn);
    })
    .on('error', function (err) {
        console.log("Error: ", err);
    })
    .on('end', function () {

        console.log(allFilePaths);
        console.log(allFilePaths.length);
		//findLink.emit('findLink', allFilePaths[allFilePaths.length - 1])
        // ["c:/file.txt","c:/other-file.txt" ...]
    })
    ;