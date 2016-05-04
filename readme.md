# No longer Functional

Google removed public access to PageRank scores, so this library is no longer functional.




node-pagerank
=============

A library for looking up the Google PageRank of any given web page. Try a live example  at http://pagerank.nfriedly.com/

[![Build Status](https://travis-ci.org/nfriedly/node-pagerank.png?branch=master)](https://travis-ci.org/nfriedly/node-pagerank)

Installation
------------

    npm install --save pagerank

Usage
-----

```js
var getPageRank = require('pagerank');

// pageRank will either be a number or null
getPageRank('http://example.com/', function(error, pageRank) {
    console.log(error, pageRank);
});
```

Breaking changes: 

* Starting with version 1.3, `pagerank` will return/emit an error event when a non-200 status code is received from Google.
(Previously it gave a `null` pagerank, but no error.)
* Starting with version 2.0, `pagerank` is no longer a readable stream / event emitter, it can only be used via callbacks.

Or, install it globally

    npm install -g pagerank

and use it on the commandline:

```bash
    pagerank http://example.com/
```
