var test = require('tape');
var PageRank = require('../pagerank');

test('hash', function(t) {


    var samples = {
        "A": "45281",
        "http://nfriedly.com/": "4270126655",
        "http://nfriedly.com/techblog/2010/12/calling-all-avaiable-web-designers-developers/": "4070080011",
        "https://www.google.com/#hl=en&sugexp=les%3B&gs_nf=3&tok=JKxKhZ9yNHGSEKvdhTDz7w&cp=4&gs_id=4q&xhr=t&q=asdf&pf=p&output=search&sclient=psy-ab&oq=asdf&gs_l=&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.&fp=5fc5e948d96e0b0c&bpcl=35466521&biw=1585&bih=910": "84096221"
    };

    Object.keys(samples).forEach(function(input) {
        var expected = samples[input];
        var actual = PageRank.prototype.hash(input);
        t.equal(actual, expected, "hashing " + input);
    });

    t.end();

});
