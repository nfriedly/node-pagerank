var test = require('tape');
var PageRank = require('../pagerank');

test('strToNum', function(t) {
    var actual, expected;

    actual = PageRank.prototype.strToNum("A", PageRank.HASH_START_1, PageRank.HASH_MULTIPLIER_1);
    expected = 177638;
    t.equal(actual, expected, "A start 1");

    actual = PageRank.prototype.strToNum("A", PageRank.HASH_START_2, PageRank.HASH_MULTIPLIER_2);
    expected = 65;
    t.equal(actual, expected, "A start 2");


    var url = "http://nfriedly.com/";

    actual = PageRank.prototype.strToNum(url, PageRank.HASH_START_1, PageRank.HASH_MULTIPLIER_1);
    expected = 4135649078;
    t.equal(actual, expected, url + " start 1");

    actual = PageRank.prototype.strToNum(url, PageRank.HASH_START_2, PageRank.HASH_MULTIPLIER_2);
    expected = 2922702479;
    t.equal(actual, expected, url + " start 2");

    t.end();
});


