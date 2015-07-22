var http = require('http');
var URL = require('url');


/**
 * node-pagerank
 * 
 * Tool for looking up the Google PageRank of a given domain.
 *
 * Returns a ReadableStream that will emit a single data event with the pagerank of the
 * site as a number, or null if the site has no pagerank.
 * 
 *
 * Usage:
 *   new PageRank('http://example.com/')
 *         .on('data', console.log)
 *         .on('error', console.error);
 *
 * Or, callback style:
 *   new PageRank('http://example.com/', function(error, pageRank) {
 *       console.log(error, pageRank);
 *   });
 * 
 * 
 * @author Nathan Friedly - http://nfriedly.com
 * Based on PageRank Lookup v1.1 by HM2K
 */
function pageRank(url, callback) {

	if (typeof url == "string") {
		url = URL.parse(url);
	}
	url = URL.format(url);

	var hash = pageRank.hash(url);
	var checksum = pageRank.checksum(hash);
	var options = {
		host: pageRank.HOST,
		path: "/tbr?client=navclient-auto&ch=" + checksum + hash + "&features=Rank&q=info:" + url,
		headers: {
			"User-Agent": pageRank.USER_AGENT
		}
	};
	var req = http.get(options, function(res) {
		if (res.statusCode != 200) {
			var err = new Error('Received ' + res.statusCode + ' status code from Google pagerank request');
			err.request = options;
			err.response = res;
			return callback(err);
		}
		var data = new Buffer(0);
		res.on('data', function (chunk) {
			data = Buffer.concat([data, chunk]);
		});
		res.on('end', function() {
			var body = data.toString();
			// body looks like Rank_1:1:7 where the 7 is the pagerank
			var pos = body.indexOf("Rank_");
			if (pos != -1) {
				return callback(null, parseInt(body.substr(pos + 9), 10));
			} else {
				return callback(null, null); // page does not currently have a pagerank
			}
		});
	});

	req.on('error', callback);
}

pageRank.HOST = 'toolbarqueries.google.com';
pageRank.USER_AGENT = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.0.6) Gecko/20060728 Firefox/1.5';

pageRank.HASH_START_1 = 0x1505;
pageRank.HASH_MULTIPLIER_1= 0x21;

pageRank.HASH_START_2 = 0;
pageRank.HASH_MULTIPLIER_2 = 0x1003F;

var pr = pageRank;

var INT_32_MAX = 4294967296;  // 2^32
var INT_32_MIN = -2147483648; // -2^31

//converts a string to a 32-bit-compatible Number
pr.strToNum = function (string, start, multiplier) {
	var num = start;
	for (var len = string.length, i = 0; i < len; i++) {
		num = num * multiplier;
		num = pageRank.to32Bit(num);
		num += string.charCodeAt(i); 
	}
	return num;
};

pr.to32Bit = function(num) {
	if (num >= INT_32_MAX) {
		num = (num - INT_32_MAX * parseInt(num / INT_32_MAX));
		num = (num < INT_32_MIN) ? (num + INT_32_MAX) : num;
	}
	return num;
};

// javascript numbers are different from php numbers, and logical OR's behave differently in JS than what I need
// try 4034920448 | 235143168 in php and JS for an example. It returns a negative number in JS.
pr.logicalOr = function (num1, num2) {
	var bits1 = num1.toString(2).split('');
	var bits2 = num2.toString(2).split('');
	var outBits = [];
	var bit1, bit2;
	while (bits1.length || bits2.length) {
		bit1 = parseInt(bits1.pop() || 0, 2);
		bit2 = parseInt(bits2.pop() || 0, 2);
		outBits.push(bit1 || bit2);
	}
	return parseInt(outBits.reverse().join(''), 2);
};

pr.hash = function (url) {
	var check1 = pageRank.strToNum(url, pageRank.HASH_START_1, pageRank.HASH_MULTIPLIER_1);
	var check2 = pageRank.strToNum(url, pageRank.HASH_START_2, pageRank.HASH_MULTIPLIER_2);

	// this was a << 2 in php, but it doesn't have quite the same result in JS for large numbers
	check1 = Math.floor(check1/4);
	check1 = ((check1 >> 4) & 0x3FFFFC0 ) | (check1 & 0x3F);
	check1 = ((check1 >> 4) & 0x3FFC00 ) | (check1 & 0x3FF);
	check1 = ((check1 >> 4) & 0x3C000 ) | (check1 & 0x3FFF);
	
	var t1 = ((((check1 & 0x3C0) << 4) | (check1 & 0x3C)) * 4 ) | (check2 & 0xF0F );
	var t2 = pageRank.logicalOr(((((check1 & 0xFFFFC000) * 16) | (check1 & 0x3C00)) * 1024), (check2 & 0xF0F0000 ));
	
	return Math.abs(pageRank.logicalOr(t1, t2)).toString();
};

pr.checksum = function(hash) {
	checkByte = 0;
	flag = 0;

	var length = hash.length;
	var re;
	
	for (var i = length - 1;  i >= 0;  i--) {
		re = parseInt(hash[i], 10);
		if (1 === (flag % 2)) {              
			re += re;     
			re = Math.floor(re / 10) + (re % 10);
		}
		checkByte += re;
		flag++;
	}

	checkByte = checkByte % 10;
	if (0 !== checkByte) {
		checkByte = 10 - checkByte;
		if (1 === (flag % 2) ) {
			if (1 === (checkByte % 2)) {
				checkByte += 9;
			}
			checkByte = checkByte / 2;
		}
	}

	return '7' + checkByte;
};


module.exports = pageRank;
module.exports.pageRank = pageRank;
