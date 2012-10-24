node-pagerank
=============

A library for looking up the Google PageRank of any given web page.

Usage
-----

    npm install pagerank
    

    var PageRank = require('pagerank')
    
    // It's a ReadibleStream
    new PageRank('http://example.com/').pipe(myCoolWriteableStream);
    
    // It's an event Emitter
    // it will emit one data event with either a number or undefined
    new PageRank('http://example.com/').on('data', console.log).on('error', console.error);
 
    // and it accepts callbacks
    // pageRank will either be a number or undefined
    new PageRank('http://example.com/', function(error, pageRank) {
        console.log(error, pageRank);
    });