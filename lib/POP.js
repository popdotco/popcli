// POP.co API connector library
// (c) Copyright 2015 POP.co LLC

var r=require('request'),
		u=require('./util');
		ver=require('./ver');

POP = {
	baseUrl: function() {
		return 'https://api.pop.co/';
	},
	// function cb(err,respobj,body) {..}
	call: function(method,endpoint,args,cb) {
		var url = this.baseUrl()+endpoint;
		u.d('call',url,method,endpoint,args);
		res = r({
			method: method,
			url: url,
			headers: {
				'Referer': 'http://pop.co/#popjs',
				'User-Agent': 'POP.js v'+ver,
			},
			form: args,
		},cb);
		u.d('call response',res);
	}
}

module.exports = POP;
