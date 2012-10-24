var assert = require('assert');
var PageRank = require('../pagerank');

var actual, expected;


actual = PageRank.prototype.hash("A");
expected = "45281";
assert.equal(actual, expected);


actual = PageRank.prototype.hash("http://nfriedly.com/");
expected = "4270126655";
assert.equal(actual, expected);


actual = PageRank.prototype.hash("http://nfriedly.com/techblog/2010/12/calling-all-avaiable-web-designers-developers/");
expected = "4070080011";
assert.equal(actual, expected);


actual = PageRank.prototype.hash("https://www.google.com/#hl=en&sugexp=les%3B&gs_nf=3&tok=JKxKhZ9yNHGSEKvdhTDz7w&cp=4&gs_id=4q&xhr=t&q=asdf&pf=p&output=search&sclient=psy-ab&oq=asdf&gs_l=&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.&fp=5fc5e948d96e0b0c&bpcl=35466521&biw=1585&bih=910");
expected = "84096221";
assert.equal(actual, expected);
