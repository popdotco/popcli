var POP = require('./POP'),
	opt = require('./opt')(),
	services = require('./services'),
	u = require('./util'),
	args = opt.parseSystem(),
	pkg = require('../package.json');
	config = require('rc')(pkg.name, {}, args.options);

function authSupplied() {
	return config.user.replace(/=/g,'') && config.pass.replace(/=/g,'');
}

function dump(err, respobj, body) {
	if (err)
		u.die('error: ' + err);
	if (respobj.statusCode != 200)
		u.die('server declined: ' + body);
	console.log(body);
	//process.exit(0);
}

function init() {
	var a = args.argv, s, c, opts;
	if (a && a[0] in services) {
		s = services[a[0]];
		if (a[1] in s.cmds) {
			c = s.cmds[a[1]];
			opts = {config: config, args: a};
			u.d('calling', c.summary);
			POP.auth({email: config.user.replace(/=/g,''), password: config.pass.replace(/=/g,'')});
			POP.call(c.method, c.endpoint(opts), c.makeArgs(opts), (c.result || dump), a[1]);
		} else {
			u.die('unknown method in ' + a[0] + ': ' + a[1]);
		}
	} else {
		//show help
		opt.showHelp();
	}
}

module.exports = init;
