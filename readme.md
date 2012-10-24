node-pagerank
=============

A library for looking up the Google PageRank of any given web page.

Installation
------------

    npm install pagerank

Usage
-----

    var PageRank = require('pagerank');
    
    // It's a ReadibleStream
    new PageRank('http://example.com/').pipe(myCoolWriteableStream);
    
    // It's an event Emitter
    // It will emit one data event with either a number or undefined
    new PageRank('http://example.com/').on('data', console.log).on('error', console.error);
 
    // And it accepts callbacks
    // pageRank will either be a number or undefined
    new PageRank('http://example.com/', function(error, pageRank) {
        console.log(error, pageRank);
    });