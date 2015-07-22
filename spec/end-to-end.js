var test = require('tape');
var http = require('http');
var Stream = require('stream');
var PageRank = require('../pagerank');

// SKIPPING these tests until the fix for https://github.com/joyent/node/issues/25751 is merged

test.skip('end-to-end happy case', function(t) {
    t.plan(3);

    var target_url = 'http://example.com/';
    var expected_url = '/tbr?client=navclient-auto&ch=754138293060&features=Rank&q=info:http://example.com/';
    var remote_response = 'Rank_1:1:7';
    var expected_rank = 7;

    function mockGoogle(req, res) {
        t.equal(req.url, expected_url, 'correct url requested');
        res.writeHead(200);
        res.end(remote_response);
    }

    var server = http.createServer(mockGoogle);

    server.listen(function() {
        PageRank.HOST = 'localhost:' + server.address().port;
        new PageRank(target_url, function(err, rank) {
            t.error(err, 'no error expected');
            t.equal(rank, expected_rank, 'Expected pagerank');
            server.close(function() {
                t.end();
            });
        });
    });
});

test.skip('end-to-end error case', function(t) {
    t.plan(3);

    var target_url = 'http://example.com/';
    var expected_url = '/tbr?client=navclient-auto&ch=754138293060&features=Rank&q=info:http://example.com/';
    var remote_response = '404 error';

    function mockGoogle(req, res) {
        t.equal(req.url, expected_url, 'correct url requested');
        res.writeHead(404);
        res.end(remote_response);
    }

    var server = http.createServer(mockGoogle);

    server.listen(function() {
        PageRank.HOST = 'localhost:' + server.address().port;
        new PageRank(target_url, function(err, rank) {
            t.ok(err, 'error expected');
            t.equal(err.message, 'Received 404 status code from Google pagerank request', 'expected error message');
            server.close(function() {
                t.end();
            });
        });
    });
});
