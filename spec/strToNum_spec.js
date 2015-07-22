var test = require('tape');
var pageRank = require('../lib/pagerank');

test('strToNum', function(t) {
    var actual, expected;

    actual = pageRank.strToNum("A", pageRank.HASH_START_1, pageRank.HASH_MULTIPLIER_1);
    expected = 177638;
    t.equal(actual, expected, "A start 1");

    actual = pageRank.strToNum("A", pageRank.HASH_START_2, pageRank.HASH_MULTIPLIER_2);
    expected = 65;
    t.equal(actual, expected, "A start 2");


    var url = "http://nfriedly.com/";

    actual = pageRank.strToNum(url, pageRank.HASH_START_1, pageRank.HASH_MULTIPLIER_1);
    expected = 4135649078;
    t.equal(actual, expected, url + " start 1");

    actual = pageRank.strToNum(url, pageRank.HASH_START_2, pageRank.HASH_MULTIPLIER_2);
    expected = 2922702479;
    t.equal(actual, expected, url + " start 2");

    t.end();
});


