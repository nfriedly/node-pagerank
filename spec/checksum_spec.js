var assert = require('assert');
var PageRank = require('../pagerank');

var actual, expected;


actual = PageRank.prototype.checksum("45281");
expected = "77";
assert.equal(actual, expected);


actual = PageRank.prototype.checksum("4270126655");
expected = "76";
assert.equal(actual, expected);


actual = PageRank.prototype.checksum("4070080011");
expected = "76";
assert.equal(actual, expected);


actual = PageRank.prototype.checksum("84096221");
expected = "70";
assert.equal(actual, expected);
