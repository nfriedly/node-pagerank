var test = require('tape');
var PageRank = require('../pagerank');

test('checksums', function(t) {

    var samples = {
        "45281": "77",
        "4270126655": "76",
        "4070080011": "76",
        "84096221": "70"
    };

    Object.keys(samples).forEach(function(input) {
        var expected = samples[input];
        var actual = PageRank.prototype.checksum(input);
        t.equal(actual, expected, "checksuming " + input);
    });

    t.end();
});
