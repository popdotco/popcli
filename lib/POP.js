// POP.co API connector library
// (c) Copyright 2015 POP.co LLC

var r = require('request'),
	u = require('./util'),
	pkg = require('../package.json'),
	_ = require('lodash');

POP = {
	// fundamental constants
	baseUrl: function () {
		return 'https://api.pop.co';
	},
	noAuthEndpoints: ['/user/login/'],
	uploadEndpoints: ['/services/starter-page/file/'],

	// the dreaded global state
	authParams: {},

	// set parameters for authentication, or return token
	// authentication actually only happens in call()
	auth: function (params) {
		POP.authParams = params;
	},

	// function cb(err,respobj,body) {..}
	call: function (method, endpoint, args, cb, cmd) {
		var theseArgs;

		// return a callback, which calls another callback,
		// but decodes JSON before doing so
		function unJSON(cb) {
			return function (err, respobj, body) {
				// console.log(body);
				var b = JSON.parse(body);
				// console.log(b);
				if (b) body = b;
				cb(err, respobj, body);
			}
		}

		function login() {
			// just for the record in Q the following blob of garbage would be .z.s'
			var recurse = function (err, respobj, body) {
				u.d('recurse', err, respobj.statusCode, body);
				if (err || respobj.statusCode != 200 || body.code != 200) {
					cb(true, respobj, body);
				} else {
					POP.authParams.token = body.data.token;
					u.d('token', POP.authParams.token);
					POP.call(method, endpoint, args, cb, cmd);
				}
			};
			POP.call('POST', '/user/login/', POP.authParams, recurse, cmd);
		}

		if (!POP.authParams.token && POP.noAuthEndpoints.indexOf(endpoint) == -1) {
			return login();
		}

		if (!Array.isArray(args)) {
			args = [args];
		}
		for (var idx in args) {
			theseArgs = args[idx];
			var url = POP.baseUrl() + endpoint, res, opts, formData;
			formData = {form: theseArgs};
			if (cmd === 'upload' && _.contains(POP.uploadEndpoints, endpoint.substr(0, endpoint.lastIndexOf('/') + 1))) {
				formData = {formData: theseArgs};
			}
			opts = _.extend({
				method: method,
				url: url,
				headers: {
					'Cookie': 'pop_weasel=' + encodeURIComponent(POP.authParams.token),
					'Referer': 'http://pop.co/#' + pkg.name,
					'User-Agent': 'POP.co CLI v' + pkg.version
				}
			}, formData);

			u.d('call', url, method, endpoint, theseArgs);
			res = r(opts, unJSON(cb));
			u.d('call response', res);
		}
	}
};

module.exports = POP;
