#!/usr/bin/env node

var pageRank = require('../lib/pagerank');

if (process.argv.length < 3) {
	console.log("Usage: pagerank http://example.com/\n" + 
		"\n" + 
		"Returns either the PageRank of the site or -1 if there is no PageRank"
	);
	process.exit(0);
} else if (process.argv.length > 3) {
	console.error("Too many arguments! Encode spaces in urls as %20");
	process.exit(1);
}


pageRank(process.argv[2], function(err, pr) {
	if (err) {
		console.error(err);
		process.exit(2);
	}
	console.log(pr === null ? -1 : pr);
	process.exit(0);
});
