var assert = require('assert');
var PageRank = require('../pagerank');

var actual, expected;


actual = PageRank.prototype.strToNum("A", PageRank.HASH_START_1, PageRank.HASH_MULTIPLIER_1);
expected = 177638;
assert.equal(actual, expected);

actual = PageRank.prototype.strToNum("A", PageRank.HASH_START_2, PageRank.HASH_MULTIPLIER_2);
expected = 65;
assert.equal(actual, expected);



var url = "http://nfriedly.com/";

actual = PageRank.prototype.strToNum(url, PageRank.HASH_START_1, PageRank.HASH_MULTIPLIER_1);
expected = 4135649078;
assert.equal(actual, expected);

actual = PageRank.prototype.strToNum(url, PageRank.HASH_START_2, PageRank.HASH_MULTIPLIER_2);
expected = 2922702479;
assert.equal(actual, expected);

