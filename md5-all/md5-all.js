#! /usr/bin/env node

var argv = require('optimist')
    .usage("Usage:\n  md5-all.js --dir DIRECTORY [--json FILE.json] [--quiet]")
    .demand(['dir'])
    .default({'quiet':false,
              'json':null})
    .argv;

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var rootLength = argv.dir.length;

var output = { "files": processDir(argv.dir) }
if (argv.json)
    fs.writeFile(argv.json, JSON.stringify(output));

function processDir(root) {
    var files = fs.readdirSync(root);
    var outputFiles = {}
    for (var i=0; i<files.length; i++) {
        var fn = files[i];
        var fullFn = path.join(root, fn);
        var s = fs.statSync(fullFn);

        if (s.isFile()) {
            var md5 = calcHash(fullFn);
            outputFiles[fn] = { md5: md5 };
            if (!argv.quiet)
                console.log(md5 + ' ' + fullFn.substr(rootLength));
        }
        else if (s.isDirectory()) {
            var subdir = { files:processDir(fullFn) };
            outputFiles[fn] = subdir;
        }
    }
    return outputFiles;
}

function calcHash(fn) {
    var sum = crypto.createHash('md5');
    var fd = fs.openSync(fn, 'r');
    var buffer = new Buffer(4096);
    var offset = 0;
    while ((bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null)) > 0) {
        sum.update(buffer.slice(0, bytesRead));
    }
    fs.closeSync(fd);
    return sum.digest('hex');
}
