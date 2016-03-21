#!/usr/bin/env node

var posthtml = require('posthtml');
var fs = require('fs');
var argv = require('yargs')
	.usage('Usage: $0 --output|-o output.html --input|-i input.html [--config|-c config.(js|json)]')
	.example('posthtml -o output.html -i input.html', 'Default example')
    .demand(['o', 'i'])
	.alias('i', 'input')
	.alias('o', 'output')
	.pkgConf('posthtml')
	.config('c')
	.alias('c', 'config')
	.version(function () {
		return require('./package.json').version;
	})
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.argv;

// get htmls
var html = fs.readFileSync(argv.input, 'utf8');

// processing
posthtml(require('posthtml-load-plugins')(argv.config))
	.process(html)
	.then(function (result) {
		fs.writeFileSync(argv.output, result.html);
	});
